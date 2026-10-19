'use client';

import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { lazy, Suspense, useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import Window from './Window';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';
import MacOSDock from './desktop/MacOSDock';
import MobileLayout from './mobile/MobileLayout';
import { getGradient, cycleGradient } from '@/utils/wallpaper';

const About = lazy(() => import('./apps/About'));
const Projects = lazy(() => import('./apps/Projects'));
const Skills = lazy(() => import('./apps/Skills'));
const Certifications = lazy(() => import('./apps/Certifications'));
const NetworkTopology = lazy(() => import('./apps/NetworkTopology'));
const DeploymentPipeline = lazy(() => import('./apps/DeploymentPipeline'));
const LabNotes = lazy(() => import('./apps/LabNotes'));
const Contact = lazy(() => import('./apps/Contact'));
const Settings = lazy(() => import('./apps/Settings'));
const Camera = lazy(() => import('./apps/Camera'));
const Notes = lazy(() => import('./apps/Notes'));

const apps = [
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'certs', label: 'Certificates', icon: '🎓' },
  { id: 'camera', label: 'Camera', icon: '📷' },
  { id: 'notes', label: 'Notes', icon: '🗒️' },
  { id: 'network', label: 'Network', icon: '🌐' },
  { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
  { id: 'labs', label: 'Lab Notes', icon: '📝' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
    <div style={{ color: '#00ff9f', fontSize: 14 }}>Loading...</div>
  </div>
);

const renderAppContent = (appId: string) => {
  const content = (() => {
    switch (appId) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'certs':
        return <Certifications />;
      case 'network':
        return <NetworkTopology />;
      case 'pipeline':
        return <DeploymentPipeline />;
      case 'labs':
        return <LabNotes />;
      case 'contact':
        return <Contact />;
      case 'settings':
        return <Settings />;
      case 'camera':
        return <Camera />;
      case 'notes':
        return <Notes />;
      default:
        return (
          <div>
            <p style={{ color: '#e6edf3', marginBottom: 12 }}>
              Application: <span style={{ color: '#00ff9f' }}>{appId}</span>
            </p>
            <p style={{ color: '#6b7280', fontSize: 14 }}>
              Content not found.
            </p>
          </div>
        );
    }
  })();

  return <Suspense fallback={<LoadingFallback />}>{content}</Suspense>;
};

export default function Desktop() {
  const { windows, openWindow } = useWindowStore();
  const { isMobileOrTablet } = useResponsive();
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    setGradient(getGradient());
  }, []);

  const handleCycleWallpaper = () => {
    const next = cycleGradient();
    setGradient(next);
  };

  if (isMobileOrTablet) {
    return <MobileLayout />;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s var(--ease-out)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          pointerEvents: 'none',
        }}
      />
      
      <MenuBar onCycleWallpaper={handleCycleWallpaper} />

      <div
        style={{
          position: 'absolute',
          top: 40,
          bottom: 90,
          left: 0,
          right: 0,
          padding: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gridAutoRows: 'min-content',
          gap: 16,
          alignContent: 'start',
          overflowY: 'auto',
        }}
        className="desktop-icons"
      >
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            onClick={() => openWindow(app.id, app.label)}
          />
        ))}
      </div>

      <AnimatePresence>
        {windows
          .filter((w) => w.isOpen)
          .map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              zIndex={window.zIndex}
              position={window.position}
              size={window.size}
              isMinimized={window.isMinimized}
              isMaximized={window.isMaximized}
            >
              {renderAppContent(window.app)}
            </Window>
          ))}
      </AnimatePresence>

      <MacOSDock />
    </div>
  );
}
