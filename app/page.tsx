'use client';

import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <BootScreen onBootComplete={() => setBootComplete(true)} />;
  }

  return <Desktop />;
}
