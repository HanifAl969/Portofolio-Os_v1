'use client';

import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { ReactNode, useState, useRef, useEffect } from 'react';

interface WindowProps {
  id: string;
  title: string;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  children: ReactNode;
}

export default function Window({ id, title, zIndex, position, size, isMinimized, isMaximized, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      const newWidth = Math.max(400, resizeStartRef.current.width + deltaX);
      const newHeight = Math.max(300, resizeStartRef.current.height + deltaY);
      updateSize(id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, id, updateSize]);

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        position: 'absolute' as const,
        left: 0,
        top: 40,
        width: '100vw',
        height: 'calc(100vh - 100px)',
        zIndex,
      }
    : {
        position: 'absolute' as const,
        left: position.x,
        top: position.y,
        width: Math.min(size.width, window.innerWidth * 0.9),
        height: Math.min(size.height, window.innerHeight * 0.8),
        zIndex,
      };

  return (
    <motion.div
      drag={!isMaximized && !isResizing}
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ 
        power: 0.2,
        timeConstant: 150
      }}
      dragConstraints={{ 
        top: 40, 
        left: 0, 
        right: window.innerWidth - size.width, 
        bottom: window.innerHeight - 160 - size.height 
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
      whileDrag={{ cursor: 'grabbing', scale: 1 }}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
      onDragStart={(e, info) => {
        setIsDragging(true);
        dragStartRef.current = {
          x: info.point.x,
          y: info.point.y,
          time: Date.now(),
        };
        if (e.target && 'setPointerCapture' in e.target && typeof (e.target as any).setPointerCapture === 'function') {
          const pointerId = (e as any).pointerId || 1;
          (e.target as any).setPointerCapture(pointerId);
        }
      }}

      onDragEnd={(_, info) => {
        setIsDragging(false);
        if (!isMaximized) {
          updatePosition(id, {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
        }
      }}
      style={{
        ...windowStyle,
        backgroundColor: '#1a1f2e',
        border: '1px solid #2d3748',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        willChange: isDragging ? 'transform' : 'auto',
        transform: 'translate3d(0, 0, 0)',
      }}
      className="font-mono"
    >
      <div
        style={{
          backgroundColor: '#0f1419',
          borderBottom: '1px solid #2d3748',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'grab',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{ color: '#e6edf3', fontSize: 14, fontWeight: 500 }}>
          {title}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => minimizeWindow(id)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#e6edf3',
              fontSize: 18,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color var(--duration-fast), color var(--duration-fast), transform var(--duration-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#00ff9f';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#e6edf3';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Minimize"
          >
            −
          </button>
          
          <button
            onClick={() => closeWindow(id)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#e6edf3',
              fontSize: 18,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color var(--duration-fast), color var(--duration-fast), transform var(--duration-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#ef4444';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#e6edf3';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
      <div
        style={{
          padding: 16,
          flex: 1,
          overflowY: 'auto',
          color: '#e6edf3',
        }}
      >
        {children}
      </div>
      {!isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 20,
            height: 20,
            cursor: 'nwse-resize',
            background: 'linear-gradient(135deg, transparent 50%, #00ff9f 50%)',
            borderBottomRightRadius: 8,
          }}
          aria-label="Resize"
        />
      )}
    </motion.div>
  );
}
