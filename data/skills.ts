export interface Skill {
  category: string;
  level: number;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: 'Cloud Platforms',
    level: 85,
    items: ['AWS', 'Azure', 'GCP'],
  },
  {
    category: 'Containers & Orchestration',
    level: 90,
    items: ['Docker', 'Kubernetes', 'Docker Compose'],
  },
  {
    category: 'CI/CD',
    level: 88,
    items: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD'],
  },
  {
    category: 'Infrastructure as Code',
    level: 82,
    items: ['Terraform', 'Ansible', 'CloudFormation'],
  },
  {
    category: 'Networking',
    level: 78,
    items: ['TCP/IP', 'DNS', 'Load Balancers', 'VPN', 'Firewall'],
  },
  {
    category: 'Security',
    level: 75,
    items: ['SSL/TLS', 'WAF', 'Security Headers', 'Penetration Testing'],
  },
  {
    category: 'Monitoring & Logging',
    level: 80,
    items: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog'],
  },
  {
    category: 'Scripting',
    level: 85,
    items: ['Bash', 'Python', 'PowerShell'],
  },
];
