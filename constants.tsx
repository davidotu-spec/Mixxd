import { Vulnerability, OptimizationOpportunity, ComplianceCheck } from './types';

// For SecurityPostureChart & SecurityCenter
export const securityPostureData = [
  { name: 'Critical', value: 3, fill: '#ef4444' },
  { name: 'High', value: 15, fill: '#f97316' },
  { name: 'Medium', value: 25, fill: '#eab308' },
  { name: 'Low', value: 42, fill: '#3b82f6' },
];

export const vulnerabilitiesData: Vulnerability[] = [
  { id: 'vuln-001', title: 'Unrestricted S3 Bucket Access', description: 'The S3 bucket "prod-customer-uploads" has a public read policy, potentially exposing sensitive customer data.', severity: 'Critical', resource: 'arn:aws:s3:::prod-customer-uploads', status: 'New', detectedAt: '2023-10-26T10:00:00Z' },
  { id: 'vuln-002', title: 'Exposed RDP Port on EC2 Instance', description: 'EC2 instance i-0123456789abcdef0 has RDP (port 3389) open to the internet (0.0.0.0/0), increasing risk of brute-force attacks.', severity: 'Critical', resource: 'i-0123456789abcdef0', status: 'Investigating', detectedAt: '2023-10-25T14:30:00Z' },
  { id: 'vuln-003', title: 'Outdated Nginx Version Detected', description: 'The load balancer "prod-lb" is running Nginx 1.18.0 which has multiple known vulnerabilities (CVE-2021-23017).', severity: 'High', resource: 'prod-lb', status: 'New', detectedAt: '2023-10-26T11:00:00Z' },
  { id: 'vuln-004', title: 'RDS Instance is Not Encrypted', description: 'The RDS database instance "user-db-prod" does not have storage encryption enabled.', severity: 'High', resource: 'user-db-prod', status: 'Resolved', detectedAt: '2023-10-20T09:00:00Z' },
  { id: 'vuln-005', title: 'IAM User with Administrative Privileges', description: 'The IAM user "dev-admin" has the AdministratorAccess policy attached directly, which is not a best practice.', severity: 'Medium', resource: 'iam:user/dev-admin', status: 'New', detectedAt: '2023-10-24T18:00:00Z' },
  { id: 'vuln-006', title: 'Missing MFA on Root Account', description: 'The AWS root account does not have Multi-Factor Authentication (MFA) enabled.', severity: 'Critical', resource: 'AWS Account Root User', status: 'New', detectedAt: '2023-10-01T08:00:00Z' },
  { id: 'vuln-007', title: 'Lambda Function with Overly Permissive Role', description: 'The Lambda function "process-orders" has a role with "iam:*" permissions.', severity: 'High', resource: 'arn:aws:lambda:us-east-1:12345:function:process-orders', status: 'Investigating', detectedAt: '2023-10-25T16:45:00Z' },
  { id: 'vuln-008', title: 'Security Group Allows All Inbound Traffic', description: 'Security group sg-0abcdef1234567890 allows inbound traffic from all sources on all ports.', severity: 'High', resource: 'sg-0abcdef1234567890', status: 'New', detectedAt: '2023-10-26T09:15:00Z' },
  { id: 'vuln-009', title: 'CloudTrail Logging Disabled', description: 'CloudTrail is not enabled for the us-west-2 region, hindering audit and investigation capabilities.', severity: 'Medium', resource: 'CloudTrail:us-west-2', status: 'New', detectedAt: '2023-10-22T12:00:00Z' },
];

// For ComplianceChart
export const complianceData = [
  { name: 'Compliant', value: 85, fill: '#10b981' },
  { name: 'Non-Compliant', value: 15, fill: '#ef4444' },
];

// For CostSavingsChart
export const costData = [
  { name: 'May', savings: 1200 },
  { name: 'Jun', savings: 1500 },
  { name: 'Jul', savings: 1300 },
  { name: 'Aug', savings: 1800 },
  { name: 'Sep', savings: 1600 },
  { name: 'Oct', savings: 2150 },
];

// For ThreatsChart
export const threatsData = [
  { name: 'Week 1', threats: 12 },
  { name: 'Week 2', threats: 15 },
  { name: 'Week 3', threats: 11 },
  { name: 'Week 4', threats: 17 },
  { name: 'Week 5', threats: 14 },
  { name: 'Week 6', threats: 18 },
];

// For CostBreakdownChart
export const costBreakdownData = [
    { name: 'EC2', value: 5420, fill: '#3b82f6' },
    { name: 'RDS', value: 2130, fill: '#10b981' },
    { name: 'S3', value: 1580, fill: '#f97316' },
    { name: 'Data Transfer', value: 1230, fill: '#eab308' },
    { name: 'Other', value: 2090, fill: '#6b7280' },
];

// For CostTrendChart
export const costTrendData = [
    { name: 'May', spend: 11800, forecast: 12000 },
    { name: 'Jun', spend: 12100, forecast: 12200 },
    { name: 'Jul', spend: 11950, forecast: 12100 },
    { name: 'Aug', spend: 12800, forecast: 12500 },
    { name: 'Sep', spend: 12650, forecast: 12600 },
    { name: 'Oct', spend: 12450, forecast: 12400 },
];

// For FinOpsHub
export const optimizationOpportunitiesData: OptimizationOpportunity[] = [
    { id: 'opt-001', title: 'Rightsize Overprovisioned EC2 Instance', description: 'Instance i-0a1b2c3d4e5f6g7h8 (t3.xlarge) has an average CPU utilization of 15%. Consider changing to t3.large.', resource: 'i-0a1b2c3d4e5f6g7h8', category: 'Rightsizing', potentialSavings: 120.50 },
    { id: 'opt-002', title: 'Delete Idle RDS Instance', description: 'RDS instance "dev-db-stale" has had no connections in the past 30 days. Consider taking a final snapshot and deleting it.', resource: 'dev-db-stale', category: 'Idle Resource', potentialSavings: 255.00 },
    { id: 'opt-003', title: 'Transition S3 Objects to Glacier', description: 'Bucket "archive-logs" contains 5TB of data that has not been accessed in 90 days. Apply a lifecycle policy to move it to Glacier Deep Archive.', resource: 'arn:aws:s3:::archive-logs', category: 'Storage Tiering', potentialSavings: 85.75 },
    { id: 'opt-004', title: 'Purchase Reserved Instances for EC2', description: 'You have a stable usage of 5 m5.large instances. Purchasing a 1-year Reserved Instance can save up to 40%.', resource: 'EC2 Compute (m5.large)', category: 'Reserved Instances', potentialSavings: 1250.00 },
    { id: 'opt-005', title: 'Terminate Unattached EBS Volume', description: 'EBS volume vol-0123456789abcdef0 (100 GB, gp3) is in an "available" state and not attached to any EC2 instance.', resource: 'vol-0123456789abcdef0', category: 'Idle Resource', potentialSavings: 10.00 },
];

// For ComplianceDashboard
export const complianceChecksData: ComplianceCheck[] = [
    // SOC 2
    { id: 'soc-001', framework: 'SOC 2', controlId: 'CC6.1', description: 'Logical access security measures are in place to protect against unauthorized access.', status: 'Passed', severity: 'Low', resource: 'IAM Policies' },
    { id: 'soc-002', framework: 'SOC 2', controlId: 'CC6.6', description: 'Encryption is enabled for data at rest.', status: 'Failed', severity: 'High', resource: 'RDS: user-db-prod' },
    { id: 'soc-003', framework: 'SOC 2', controlId: 'CC7.1', description: 'Monitoring of infrastructure and systems is in place to detect anomalies.', status: 'Passed', severity: 'Low', resource: 'CloudWatch Alarms' },
    { id: 'soc-004', framework: 'SOC 2', controlId: 'CC7.2', description: 'A vulnerability management program is in place.', status: 'In Progress', severity: 'Medium', resource: 'Security Hub' },
    { id: 'soc-005', framework: 'SOC 2', controlId: 'CC3.2', description: 'Multi-factor authentication is required for all administrative access.', status: 'Failed', severity: 'Critical', resource: 'AWS Root Account' },

    // ISO 27001
    { id: 'iso-001', framework: 'ISO 27001', controlId: 'A.12.1.2', description: 'Protection against malware is implemented.', status: 'Passed', severity: 'Low', resource: 'EC2 Instances' },
    { id: 'iso-002', framework: 'ISO 27001', controlId: 'A.14.1.1', description: 'Information security requirements analysis and specification.', status: 'In Progress', severity: 'Medium', resource: 'Development Lifecycle' },
    { id: 'iso-003', framework: 'ISO 27001', controlId: 'A.9.4.1', description: 'Limitation of access to information.', status: 'Passed', severity: 'Low', resource: 'IAM Roles' },
    { id: 'iso-004', framework: 'ISO 27001', controlId: 'A.10.1.2', description: 'Key management.', status: 'Failed', severity: 'High', resource: 'KMS Policies' },

    // GDPR
    { id: 'gdpr-001', framework: 'GDPR', controlId: 'Art. 32', description: 'Security of processing (encryption of personal data).', status: 'Failed', severity: 'High', resource: 'RDS: user-db-prod' },
    { id: 'gdpr-002', framework: 'GDPR', controlId: 'Art. 25', description: 'Data protection by design and by default.', status: 'In Progress', severity: 'Medium', resource: 'System Architecture' },
    { id: 'gdpr-003', framework: 'GDPR', controlId: 'Art. 30', description: 'Records of processing activities.', status: 'Passed', severity: 'Low', resource: 'Data Processing Agreements' },
];
