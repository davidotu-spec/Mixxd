# Mixxd

> **Solution:** A smart cloud security & FinOps automation platform.

Mixxd combines cloud security posture management with automated financial operations (FinOps) workflows, powered by the Google Gemini API. Originally scaffolded from the [Google AI Studio Repository Template](https://github.com/google-gemini/aistudio-repository-template) and featuring the AuraSecure Cloud Platform frontend, this project integrates a React/TypeScript web application with AI agent memory workflows.

---

## Tech Stack

* **Frontend:** React, TypeScript (`App.tsx`, `index.tsx`, `components/`, `services/`), Vite (`vite.config.ts`)
* **AI & Agent Workflows:** Google Gemini API, Jupyter Notebook (`day-3b-agent-memory.ipynb`)
* **Markup & Configuration:** HTML5 (`index.html`), JSON (`metadata.json`, `package.json`, `tsconfig.json`)

---

## Project Structure

```text
Mixxd/
├── components/                 # Reusable UI components for the AuraSecure frontend
├── services/                   # API clients and Gemini integration services
├── App.tsx                     # Main application component
├── constants.tsx               # App-wide constants and configuration values
├── day-3b-agent-memory.ipynb   # Kaggle notebook exploring AI agent memory workflows
├── index.html                  # HTML entry point
├── index.tsx                   # React DOM mounting entry point
├── metadata.json               # AI Studio project metadata
├── package.json                # Node.js dependencies and scripts
├── tsconfig.json               # TypeScript compiler configuration
├── types.ts                    # Shared TypeScript interfaces and types
└── vite.config.ts              # Vite bundler configuration
Getting Started
Prerequisites
Node.js (v18 or higher recommended)

A valid Gemini API Key from Google AI Studio

Installation & Local Development
Clone the repository:

Bash
git clone [https://github.com/davidotu-spec/Mixxd.git](https://github.com/davidotu-spec/Mixxd.git)
cd Mixxd
Install dependencies:

Bash
npm install
Configure environment variables:
Create a .env.local file in the root directory and add your Gemini API key:

Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
Start the development server:

Bash
npm run dev

