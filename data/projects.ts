export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  deployment: string;
  security: string;
  status: 'Production' | 'Beta' | 'Active Development' | 'Planned';
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure Platform',
    description: 'Multi-tier AWS deployment with auto-scaling, load balancing, and RDS',
    tech: ['AWS', 'Terraform', 'Docker', 'Nginx'],
    deployment: 'EC2, ALB, RDS PostgreSQL, S3',
    security: 'WAF, Security Groups, SSL/TLS',
    status: 'Production',
    github: 'https://github.com/hanif/cloud-infra',
    demo: 'https://demo.example.com',
  },
  {
    id: 'ci-cd-pipeline',
    name: 'CI/CD Pipeline Automation',
    description: 'End-to-end pipeline with automated testing, security scanning, and deployment',
    tech: ['Jenkins', 'Docker', 'Kubernetes', 'ArgoCD'],
    deployment: 'GKE, Docker Registry, Helm',
    security: 'SAST, Container scanning, Secret management',
    status: 'Production',
    github: 'https://github.com/hanif/cicd-pipeline',
  },
  {
    id: 'network-monitoring',
    name: 'Network Monitoring System',
    description: 'Real-time network topology visualizer with alerting and metrics',
    tech: ['Python', 'Prometheus', 'Grafana', 'Telegraf'],
    deployment: 'Kubernetes, Persistent Volumes',
    security: 'mTLS, RBAC, Network policies',
    status: 'Beta',
    github: 'https://github.com/hanif/network-monitor',
  },
  {
    id: 'security-automation',
    name: 'Security Automation Tool',
    description: 'Automated vulnerability scanning and compliance checking pipeline',
    tech: ['Python', 'Trivy', 'OWASP ZAP', 'GitHub Actions'],
    deployment: 'GitHub Actions, Docker containers',
    security: 'Scheduled scans, Report generation',
    status: 'Active Development',
    github: 'https://github.com/hanif/sec-automation',
  },
];
