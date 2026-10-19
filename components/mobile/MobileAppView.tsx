'use client';

import { useWindowStore } from '@/store/windowStore';

interface MobileAppViewProps {
  title: string;
  showBack: boolean;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function MobileAppView({ title, children }: MobileAppViewProps) {
  const { setActiveApp, toggleTheme, theme } = useWindowStore();

  const getWallpaper = () => {
    switch (theme) {
      case 'dark':
        return 'https://wallpapers.com/images/featured/dark-iphone-8r25i7k7x7j7k0u8.jpg';
      case 'glass':
        return 'https://wallpapers.com/images/featured/iphone-glass-background-8r25i7k7x7j7k0u8.jpg';
      case 'classic':
      default:
        return 'https://wallpapers.com/images/featured/ios-16-4k-q7rzkf37y0j7k0u8.jpg';
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url("${getWallpaper()}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: 'env(safe-area-inset-top)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Heavy Blur Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(60px) saturate(150%)',
          zIndex: 1,
        }}
      />

      {/* Floating Header Actions */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setActiveApp(null)}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Back to Home"
        >
          ←
        </button>

        <button
          onClick={toggleTheme}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle Theme"
        >
          🎨
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '80px 20px 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
}
