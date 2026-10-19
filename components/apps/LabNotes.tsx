'use client';

import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

interface Note {
  title: string;
  date: string;
  category: string;
  content: string;
  tags: string[];
}

const notes: Note[] = [
  {
    title: 'Kubernetes Service Mesh with Istio',
    date: '2026-09-15',
    category: 'Kubernetes',
    content: 'Implemented Istio service mesh for microservices communication. Explored traffic management, security policies, and observability features.',
    tags: ['Kubernetes', 'Istio', 'Service Mesh'],
  },
  {
    title: 'Zero Trust Network Architecture',
    date: '2026-08-22',
    category: 'Security',
    content: 'Researched zero trust security model implementation. Key principles: verify explicitly, least privilege access, assume breach.',
    tags: ['Security', 'Zero Trust', 'Architecture'],
  },
  {
    title: 'GitOps with ArgoCD',
    date: '2026-07-10',
    category: 'CI/CD',
    content: 'Set up GitOps workflow using ArgoCD for Kubernetes deployments. Declarative configs in Git as single source of truth.',
    tags: ['GitOps', 'ArgoCD', 'Kubernetes'],
  },
  {
    title: 'Terraform State Management',
    date: '2026-06-05',
    category: 'IaC',
    content: 'Best practices for Terraform remote state: S3 backend with DynamoDB locking, state encryption, and workspace isolation.',
    tags: ['Terraform', 'IaC', 'State Management'],
  },
  {
    title: 'Prometheus & Grafana Monitoring Stack',
    date: '2026-05-18',
    category: 'Monitoring',
    content: 'Deployed complete monitoring solution with Prometheus for metrics collection and Grafana for visualization. Custom dashboards and alerts.',
    tags: ['Prometheus', 'Grafana', 'Monitoring'],
  },
];

export default function LabNotes() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Lab Notes & Learning
        </h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {notes.map((note: Note, i: number) => (
          <div
            key={i}
            style={{
              padding: isMobileOrTablet ? 20 : 16,
              backgroundColor: '#0f1419',
              border: '1px solid #2d3748',
              borderRadius: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8, flexDirection: isMobileOrTablet ? 'column' : 'row', gap: isMobileOrTablet ? 8 : 0 }}>
              <h3 style={{ fontSize: isMobileOrTablet ? 17 : 16, fontWeight: 600, color: '#e6edf3', flex: 1 }}>
                {note.title}
              </h3>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#2d3748',
                  color: '#bd93f9',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                  marginLeft: isMobileOrTablet ? 0 : 12,
                }}
              >
                {note.category}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
              {note.date}
            </div>
            <p style={{ color: '#e6edf3', fontSize: isMobileOrTablet ? 15 : 14, lineHeight: 1.5, marginBottom: 16 }}>
              {note.content}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {note.tags.map((tag: string, j: number) => (
                <span
                  key={j}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #2d3748',
                    borderRadius: 4,
                    fontSize: 11,
                    color: '#00ff9f',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Lab Notes" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
