'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { lazy, Suspense } from 'react';
import MobileHomeScreen from './MobileHomeScreen';

const About = lazy(() => import('../apps/About'));
const Projects = lazy(() => import('../apps/Projects'));
const Skills = lazy(() => import('../apps/Skills'));
const Certifications = lazy(() => import('../apps/Certifications'));
const NetworkTopology = lazy(() => import('../apps/NetworkTopology'));
const DeploymentPipeline = lazy(() => import('../apps/DeploymentPipeline'));
const LabNotes = lazy(() => import('../apps/LabNotes'));
const Contact = lazy(() => import('../apps/Contact'));
const Settings = lazy(() => import('../apps/Settings'));
const Camera = lazy(() => import('../apps/Camera'));
const Notes = lazy(() => import('../apps/Notes'));

const renderMobileApp = (appId: string | null) => {
  if (!appId) return <MobileHomeScreen />;

  switch (appId) {
    case 'about':
      return <About />;
    case 'projects':
      return <Projects />;
    case 'skills':
      return <Skills />;
    case 'certs':
      return <Certifications />;
    case 'camera':
      return <Camera />;
    case 'notes':
      return <Notes />;
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
    default:
      return <MobileHomeScreen />;
  }
};

const LoadingFallback = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#00ff9f',
      fontSize: 14,
    }}
  >
    Loading...
  </div>
);

export default function MobileLayout() {
  const { activeAppId } = useWindowStore();

  return (
    <div style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#0a0e14' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAppId || 'home'}
          initial={activeAppId ? { scale: 0.8, opacity: 0 } : { x: -300, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          exit={activeAppId ? { scale: 1.2, opacity: 0 } : { x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
          style={{ height: '100%' }}
        >
          <Suspense fallback={<LoadingFallback />}>{renderMobileApp(activeAppId)}</Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
