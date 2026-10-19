export interface Certification {
  name: string;
  issuer: string;
  year: string;
  status: 'Active' | 'Planned' | 'Expired';
  description: string;
  verificationUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2025',
    status: 'Active',
    description: 'Professional-level certification for designing distributed systems on AWS',
    verificationUrl: 'https://aws.amazon.com/verification',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    year: '2024',
    status: 'Active',
    description: 'Validates skills in Kubernetes cluster administration and troubleshooting',
    verificationUrl: 'https://cncf.io/certification/verify',
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    year: '2024',
    status: 'Active',
    description: 'Infrastructure automation and provisioning with Terraform',
    verificationUrl: 'https://hashicorp.com/certification/verify',
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: '2023',
    status: 'Active',
    description: 'Foundation-level cybersecurity certification covering threats, attacks, and vulnerabilities',
    verificationUrl: 'https://comptia.org/verify',
  },
  {
    name: 'Cisco CCNA',
    issuer: 'Cisco',
    year: '2023',
    status: 'Planned',
    description: 'Network fundamentals, IP connectivity, and security fundamentals',
  },
];
