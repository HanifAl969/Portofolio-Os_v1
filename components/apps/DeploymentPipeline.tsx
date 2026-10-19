'use client';

import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

const stages = [
  { name: 'Commit', icon: '📝', status: 'success', color: '#10b981' },
  { name: 'Build', icon: '🔨', status: 'success', color: '#10b981' },
  { name: 'Test', icon: '✓', status: 'success', color: '#10b981' },
  { name: 'Scan', icon: '🔍', status: 'success', color: '#10b981' },
  { name: 'Deploy', icon: '🚀', status: 'running', color: '#f59e0b' },
];

export default function DeploymentPipeline() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Deployment Pipeline
        </h2>
      )}

      <div
        style={{
          padding: isMobileOrTablet ? 16 : 24,
          backgroundColor: '#0f1419',
          border: '1px solid #2d3748',
          borderRadius: 8,
          marginBottom: 24,
          overflowX: isMobileOrTablet ? 'auto' : 'visible',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobileOrTablet ? 'flex-start' : 'space-between',
            position: 'relative',
            gap: isMobileOrTablet ? 40 : 0,
            minWidth: isMobileOrTablet ? 500 : 'auto',
          }}
        >
          {stages.map((stage, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: isMobileOrTablet ? 50 : 60,
                    height: isMobileOrTablet ? 50 : 60,
                    borderRadius: '50%',
                    backgroundColor: stage.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobileOrTablet ? 24 : 28,
                    border: '3px solid #0f1419',
                  }}
                >
                  {stage.icon}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', marginBottom: 2 }}>
                    {stage.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: stage.status === 'running' ? '#f59e0b' : '#10b981',
                      fontWeight: 600,
                    }}
                  >
                    {stage.status === 'running' ? 'IN PROGRESS' : 'PASSED'}
                  </div>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: isMobileOrTablet ? 25 : 30,
                    left: '100%',
                    width: isMobileOrTablet ? 40 : 60,
                    height: 3,
                    backgroundColor: '#2d3748',
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: isMobileOrTablet ? 18 : 16, fontWeight: 600, color: '#00ff9f', marginBottom: 12 }}>
          Pipeline Stages
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              stage: 'Commit',
              desc: 'Developer pushes code to Git repository',
              tools: 'GitHub, GitLab, Bitbucket',
            },
            {
              stage: 'Build',
              desc: 'Code compilation and Docker image creation',
              tools: 'Docker, Maven, npm',
            },
            {
              stage: 'Test',
              desc: 'Automated unit, integration, and e2e tests',
              tools: 'Jest, Pytest, Selenium',
            },
            {
              stage: 'Scan',
              desc: 'Security scanning and vulnerability assessment',
              tools: 'Trivy, SonarQube, OWASP ZAP',
            },
            {
              stage: 'Deploy',
              desc: 'Container deployment to Kubernetes cluster',
              tools: 'Kubernetes, Helm, ArgoCD',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 6,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexDirection: isMobileOrTablet ? 'column' : 'row', gap: isMobileOrTablet ? 4 : 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3' }}>
                  {item.stage}
                </span>
                <span style={{ fontSize: 12, color: '#bd93f9' }}>
                  {item.tools}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: 14,
          backgroundColor: '#0f1419',
          border: '1px solid #00ff9f',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 20 }}>⚡</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#00ff9f', marginBottom: 2 }}>
            Average Pipeline Duration
          </div>
          <div style={{ fontSize: 12, color: '#e6edf3' }}>
            8 minutes 32 seconds
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Pipeline" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
