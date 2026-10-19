'use client';

import { useState, useRef, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Camera() {
  const { isMobileOrTablet } = useResponsive();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied or not available.');
      console.error(err);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `captured-photo-${Date.now()}.jpg`;
      link.click();
      setCapturedImage(null);
    }
  };

  const discardPhoto = () => {
    setCapturedImage(null);
  };

  const content = (
    <div style={{ fontFamily: 'sans-serif', height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Camera
        </h2>
      )}

      {!stream && !error ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={startCamera}
            style={{
              padding: '16px 32px',
              borderRadius: 30,
              backgroundColor: '#00ff9f',
              color: '#0a0e14',
              border: 'none',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,255,159,0.3)',
            }}
          >
            Open Camera
          </button>
        </div>
      ) : error ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
          <div style={{ color: '#ef4444' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: '#000' }}>
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}
              >
                <button
                  onClick={takePhoto}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '5px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                  }}
                />
              </div>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <img
                src={capturedImage}
                alt="Captured"
                style={{ width: '100%', flex: 1, objectFit: 'contain', backgroundColor: '#000' }}
              />
              <div
                style={{
                  padding: 24,
                  display: 'flex',
                  justifyContent: 'space-around',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <button
                  onClick={discardPhoto}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 30,
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Discard
                </button>
                <button
                  onClick={savePhoto}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 30,
                    backgroundColor: '#00ff9f',
                    color: '#0a0e14',
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save to Local
                </button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Camera" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
