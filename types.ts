export type View = 'dashboard' | 'security' | 'finops' | 'compliance';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type VulnerabilityStatus = 'New' | 'Investigating' | 'Resolved';

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  resource: string;
  status: VulnerabilityStatus;
  detectedAt: string;
}

export type OptimizationCategory = 'Rightsizing' | 'Idle Resource' | 'Storage Tiering' | 'Reserved Instances';

export interface OptimizationOpportunity {
    id: string;
    title: string;
    description: string;
    resource: string;
    category: OptimizationCategory;
    potentialSavings: number;
}

// Compliance Types
export type ComplianceFramework = 'SOC 2' | 'ISO 27001' | 'GDPR';
export type CheckStatus = 'Passed' | 'Failed' | 'In Progress';

export interface ComplianceCheck {
    id: string;
    framework: ComplianceFramework;
    controlId: string;
    description: string;
    status: CheckStatus;
    severity: Severity;
    resource: string;
}
