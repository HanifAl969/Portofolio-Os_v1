'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

interface OutputLine {
  type: 'command' | 'output' | 'error';
  text: string;
}

const commands: Record<string, () => string> = {
  help: () => `Available commands:
  help        - Show this help message
  whoami      - Display user information
  ls projects - List all projects
  cat about.txt - Display about information
  skills      - Show technical skills
  certs       - List certifications
  contact     - Display contact information
  neofetch    - Show system information
  clear       - Clear terminal output`,

  whoami: () => `Hanif Al
DevOps Engineer & Security Enthusiast
Passionate about cloud infrastructure, automation, and cybersecurity.`,

  'ls projects': () => `total 4
drwxr-xr-x  2 hanif  staff   64 Oct  8 2026 .
drwxr-xr-x  5 hanif  staff  160 Oct  8 2026 ..

Projects:
  1. cloud-infrastructure/    - Multi-tier AWS deployment with Terraform
  2. ci-cd-pipeline/          - Jenkins pipeline with Docker & K8s
  3. security-scanner/        - Automated vulnerability assessment tool
  4. network-monitor/         - Real-time network topology visualizer`,

  'cat about.txt': () => `=== ABOUT ME ===

I'm a DevOps Engineer specializing in:
- Cloud Infrastructure (AWS, Azure, GCP)
- Container Orchestration (Docker, Kubernetes)
- CI/CD Pipeline Implementation
- Network Security & Firewall Configuration
- Infrastructure as Code (Terraform, Ansible)

Currently focused on building secure, scalable, and automated infrastructure solutions.`,

  skills: () => `=== TECHNICAL SKILLS ===

Cloud Platforms:     AWS, Azure, GCP
Containers:          Docker, Kubernetes, Docker Compose
CI/CD:               Jenkins, GitHub Actions, GitLab CI
IaC:                 Terraform, Ansible, CloudFormation
Networking:          TCP/IP, DNS, VPN, Firewall, Load Balancers
Security:            SSL/TLS, Security Headers, WAF, Penetration Testing
Monitoring:          Prometheus, Grafana, ELK Stack
Scripting:           Bash, Python, PowerShell`,

  certs: () => `=== CERTIFICATIONS ===

[Placeholder - Add your certifications]

Example:
  ✓ AWS Certified Solutions Architect
  ✓ Certified Kubernetes Administrator (CKA)
  ✓ CompTIA Security+
  ✓ Cisco CCNA

Use 'contact' command to request verification links.`,

  contact: () => `=== CONTACT INFORMATION ===

Email:       hanif@example.com
GitHub:      github.com/hanif
LinkedIn:    linkedin.com/in/hanif
Portfolio:   yourdomain.com

Available for:
  - DevOps consulting
  - Infrastructure architecture
  - Security audits
  - Contract work`,

  neofetch: () => `                    
    ██╗  ██╗ █████╗ ███╗   ██╗██╗███████╗ ██████╗ ███████╗
    ██║  ██║██╔══██╗████╗  ██║██║██╔════╝██╔═══██╗██╔════╝
    ███████║███████║██╔██╗ ██║██║█████╗  ██║   ██║███████╗
    ██╔══██║██╔══██║██║╚██╗██║██║██╔══╝  ██║   ██║╚════██║
    ██║  ██║██║  ██║██║ ╚████║██║██║     ╚██████╔╝███████║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝      ╚═════╝ ╚══════╝
    
    OS:           HANIFOS v1.0.0
    Kernel:       Linux 5.15.0-devops
    Uptime:       ${Math.floor(Math.random() * 100)} days
    Shell:        bash 5.1.16
    Resolution:   1920x1080
    CPU:          Intel Core i7 (8) @ 3.6GHz
    Memory:       ${Math.floor(Math.random() * 8000 + 8000)}MB / 16384MB`,
};

export default function Terminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    { type: 'output', text: 'Welcome to HANIFOS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { isMobileOrTablet } = useResponsive();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setOutput((prev) => [...prev, { type: 'command', text: `$ ${trimmedCmd}` }]);

    if (trimmedCmd === 'clear') {
      setOutput([]);
      return;
    }

    const result = commands[trimmedCmd];
    if (result) {
      setOutput((prev) => [...prev, { type: 'output', text: result() }]);
    } else {
      setOutput((prev) => [
        ...prev,
        { type: 'error', text: `Command not found: ${trimmedCmd}. Type "help" for available commands.` },
      ]);
    }

    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const terminalUI = (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        height: isMobileOrTablet ? 'calc(100% - 20px)' : '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'text',
      }}
    >
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 0',
          fontFamily: 'monospace',
          fontSize: isMobileOrTablet ? 14 : 13,
          lineHeight: 1.6,
        }}
      >
        {output.map((line, i) => (
          <div
            key={i}
            style={{
              color:
                line.type === 'command'
                  ? '#00ff9f'
                  : line.type === 'error'
                  ? '#ef4444'
                  : '#e6edf3',
              marginBottom: 4,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 0',
          borderTop: '1px solid #2d3748',
          fontFamily: 'monospace',
          fontSize: isMobileOrTablet ? 14 : 13,
        }}
      >
        <span style={{ color: '#00ff9f' }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e6edf3',
            fontFamily: 'monospace',
            fontSize: isMobileOrTablet ? 14 : 13,
          }}
          autoFocus
          spellCheck={false}
          inputMode="text"
        />
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Terminal" showBack={false}>
        {terminalUI}
      </MobileAppView>
    );
  }

  return terminalUI;
}
