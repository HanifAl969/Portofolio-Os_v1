'use client';

import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';
import { projectImages } from '@/data/projectImages';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { isMobileOrTablet } = useResponsive();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProjectId) {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId]);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  const selectedImages = selectedProjectId ? projectImages[selectedProjectId] || [] : [];

  if (isMobileOrTablet) {
    if (selectedProject) {
      return (
        <MobileAppView
          title="Project Details"
          showBack={true}
          onBack={() => setSelectedProjectId(null)}
        >
          <div style={{ fontFamily: 'sans-serif' }}>
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 8,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>🖼️</div>
                <div style={{ fontSize: 13 }}>Project preview</div>
              </div>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#00ff9f', marginBottom: 12 }}>
              {selectedProject.name}
            </h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  padding: '6px 12px',
                  backgroundColor: selectedProject.status === 'Production' ? '#10b981' : '#f59e0b',
                  color: '#0a0e14',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 4,
                }}
              >
                {selectedProject.status}
              </span>
            </div>

            <p style={{ color: '#e6edf3', fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>
              {selectedProject.description}
            </p>

            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#bd93f9', fontSize: 15, fontWeight: 600 }}>Tech Stack: </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#0f1419',
                      border: '1px solid #2d3748',
                      borderRadius: 4,
                      fontSize: 14,
                      color: '#e6edf3',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#bd93f9', fontSize: 15, fontWeight: 600 }}>Deployment: </span>
              <span style={{ color: '#e6edf3', fontSize: 15 }}>{selectedProject.deployment}</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <span style={{ color: '#bd93f9', fontSize: 15, fontWeight: 600 }}>Security: </span>
              <span style={{ color: '#e6edf3', fontSize: 15 }}>{selectedProject.security}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '14px 20px',
                    backgroundColor: '#00ff9f',
                    color: '#0a0e14',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  GitHub →
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '14px 20px',
                    backgroundColor: 'transparent',
                    border: '2px solid #00ff9f',
                    color: '#00ff9f',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </MobileAppView>
      );
    }

    return (
      <MobileAppView title="Projects" showBack={false}>
        <div style={{ fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => setSelectedProjectId(project.id)}
                style={{
                  padding: 16,
                  backgroundColor: '#0f1419',
                  border: '1px solid #2d3748',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e6edf3' }}>
                    {project.name}
                  </h3>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: project.status === 'Production' ? '#10b981' : '#f59e0b',
                      color: '#0a0e14',
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 4,
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <p style={{ color: '#e6edf3', fontSize: 15, marginBottom: 12, lineHeight: 1.5 }}>
                  {project.description}
                </p>
                <div style={{ fontSize: 14, color: '#00ff9f', fontWeight: 600 }}>
                  Tap to view details →
                </div>
              </div>
            ))}
          </div>
        </div>
      </MobileAppView>
    );
  }

  if (selectedProject) {
    return (
      <div style={{ fontFamily: 'sans-serif', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={() => setSelectedProjectId(null)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid #2d3748',
            color: '#00ff9f',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 13,
            marginBottom: 16,
            alignSelf: 'flex-start',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1f2e'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ← Back to Projects
        </button>

        <div style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>
          <div
            style={{
              width: '25%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {selectedImages.map((img, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: 120,
                  backgroundColor: '#0f1419',
                  border: '2px solid #2d3748',
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff9f';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2d3748';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{ fontSize: 32 }}>🖼️</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div
              style={{
                width: '100%',
                height: 300,
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 8,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>🖼️</div>
                <div style={{ fontSize: 13 }}>Project preview image</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>(Replace with actual image)</div>
              </div>
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 12 }}>
              {selectedProject.name}
            </h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  padding: '4px 12px',
                  backgroundColor: selectedProject.status === 'Production' ? '#10b981' : '#f59e0b',
                  color: '#0a0e14',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 4,
                }}
              >
                {selectedProject.status}
              </span>
            </div>

            <p style={{ color: '#e6edf3', fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
              {selectedProject.description}
            </p>

            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#bd93f9', fontSize: 14, fontWeight: 600 }}>Tech Stack: </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#0f1419',
                      border: '1px solid #2d3748',
                      borderRadius: 4,
                      fontSize: 13,
                      color: '#e6edf3',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#bd93f9', fontSize: 14, fontWeight: 600 }}>Deployment: </span>
              <span style={{ color: '#e6edf3', fontSize: 14 }}>{selectedProject.deployment}</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <span style={{ color: '#bd93f9', fontSize: 14, fontWeight: 600 }}>Security: </span>
              <span style={{ color: '#e6edf3', fontSize: 14 }}>{selectedProject.security}</span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#00ff9f',
                    color: '#0a0e14',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00d880'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00ff9f'}
                >
                  GitHub →
                </a>
              )}
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #00ff9f',
                    color: '#00ff9f',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00ff9f';
                    e.currentTarget.style.color = '#0a0e14';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#00ff9f';
                  }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
        Projects
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {projects.map((project, i) => (
          <div
            key={i}
            onClick={() => setSelectedProjectId(project.id)}
            style={{
              padding: 16,
              backgroundColor: '#0f1419',
              border: '1px solid #2d3748',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00ff9f';
              e.currentTarget.style.backgroundColor = '#1a1f2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2d3748';
              e.currentTarget.style.backgroundColor = '#0f1419';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e6edf3' }}>
                {project.name}
              </h3>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: project.status === 'Production' ? '#10b981' : '#f59e0b',
                  color: '#0a0e14',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                }}
              >
                {project.status}
              </span>
            </div>
            <p style={{ color: '#e6edf3', fontSize: 14, marginBottom: 12, lineHeight: 1.5 }}>
              {project.description}
            </p>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#bd93f9', fontSize: 12, fontWeight: 600 }}>Tech Stack: </span>
              <span style={{ color: '#e6edf3', fontSize: 12 }}>{project.tech.join(', ')}</span>
            </div>
            <div style={{ fontSize: 12, color: '#00ff9f', fontWeight: 600, marginTop: 12 }}>
              Click to view details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
