
import React, { useState, useRef, useEffect } from 'react';
import { getAIAssistantResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

const PaperAirplaneIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

const XMarkIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIAssistantResponse(inputValue);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: 'An error occurred. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 z-50"
        aria-label="Toggle AI Assistant"
      >
        <SparklesIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col h-[600px] z-40">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-primary-400 mr-2" />
                <h2 className="text-lg font-semibold text-white">Aura AI Assistant</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <XMarkIcon className="w-6 h-6"/>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
                    <p>Welcome!</p>
                    <p className="text-sm">Ask me about your security, costs, or compliance.</p>
                    <p className="text-xs mt-4 p-2 bg-gray-700 rounded-lg">e.g., "What are my most critical vulnerabilities?"</p>
                </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1"><SparklesIcon className="w-5 h-5 text-white"/></div>}
                <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 text-white ${msg.sender === 'user' ? 'bg-primary-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1"><SparklesIcon className="w-5 h-5 text-white"/></div>
                <div className="max-w-xs md:max-w-sm rounded-2xl px-4 py-2 text-white bg-gray-700 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Aura anything..."
                className="w-full bg-gray-700 border border-gray-600 rounded-full py-3 pl-5 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={isLoading || inputValue.trim() === ''}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
