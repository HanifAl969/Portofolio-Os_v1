'use client';

import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function NetworkTopology() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Network Topology
        </h2>
      )}
      <div
        style={{
          width: '100%',
          height: isMobileOrTablet ? 300 : 400,
          backgroundColor: '#0f1419',
          border: '1px solid #2d3748',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          <line x1="300" y1="50" x2="150" y2="150" stroke="#2d3748" strokeWidth="2" />
          <line x1="300" y1="50" x2="300" y2="150" stroke="#2d3748" strokeWidth="2" />
          <line x1="300" y1="50" x2="450" y2="150" stroke="#2d3748" strokeWidth="2" />
          <line x1="150" y1="150" x2="100" y2="250" stroke="#2d3748" strokeWidth="2" />
          <line x1="150" y1="150" x2="200" y2="250" stroke="#2d3748" strokeWidth="2" />
          <line x1="300" y1="150" x2="300" y2="250" stroke="#2d3748" strokeWidth="2" />
          <line x1="450" y1="150" x2="400" y2="250" stroke="#2d3748" strokeWidth="2" />
          <line x1="450" y1="150" x2="500" y2="250" stroke="#2d3748" strokeWidth="2" />

          <g>
            <circle cx="300" cy="50" r="30" fill="#00ff9f" />
            <text x="300" y="55" textAnchor="middle" fill="#0a0e14" fontSize="12" fontWeight="600">
              Router
            </text>
          </g>

          <g>
            <rect x="120" y="135" width="60" height="30" fill="#bd93f9" rx="4" />
            <text x="150" y="155" textAnchor="middle" fill="#0a0e14" fontSize="11" fontWeight="600">
              Switch 1
            </text>
          </g>

          <g>
            <rect x="270" y="135" width="60" height="30" fill="#bd93f9" rx="4" />
            <text x="300" y="155" textAnchor="middle" fill="#0a0e14" fontSize="11" fontWeight="600">
              Firewall
            </text>
          </g>

          <g>
            <rect x="420" y="135" width="60" height="30" fill="#bd93f9" rx="4" />
            <text x="450" y="155" textAnchor="middle" fill="#0a0e14" fontSize="11" fontWeight="600">
              Switch 2
            </text>
          </g>

          <g>
            <rect x="70" y="235" width="60" height="30" fill="#1a1f2e" stroke="#00ff9f" strokeWidth="2" rx="4" />
            <text x="100" y="255" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="600">
              Server 1
            </text>
          </g>

          <g>
            <rect x="170" y="235" width="60" height="30" fill="#1a1f2e" stroke="#00ff9f" strokeWidth="2" rx="4" />
            <text x="200" y="255" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="600">
              Server 2
            </text>
          </g>

          <g>
            <rect x="270" y="235" width="60" height="30" fill="#1a1f2e" stroke="#00ff9f" strokeWidth="2" rx="4" />
            <text x="300" y="255" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="600">
              Database
            </text>
          </g>

          <g>
            <rect x="370" y="235" width="60" height="30" fill="#1a1f2e" stroke="#00ff9f" strokeWidth="2" rx="4" />
            <text x="400" y="255" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="600">
              Client 1
            </text>
          </g>

          <g>
            <rect x="470" y="235" width="60" height="30" fill="#1a1f2e" stroke="#00ff9f" strokeWidth="2" rx="4" />
            <text x="500" y="255" textAnchor="middle" fill="#e6edf3" fontSize="10" fontWeight="600">
              Client 2
            </text>
          </g>
        </svg>
      </div>

      <div>
        <h3 style={{ fontSize: isMobileOrTablet ? 18 : 16, fontWeight: 600, color: '#00ff9f', marginBottom: 12 }}>
          Infrastructure Components
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
          {[
            { name: 'Edge Router', desc: 'Gateway with NAT & routing' },
            { name: 'Core Switches', desc: 'VLAN segmentation' },
            { name: 'Firewall', desc: 'Security policies & filtering' },
            { name: 'Web Servers', desc: 'Load-balanced applications' },
            { name: 'Database Server', desc: 'Primary DB with replication' },
            { name: 'Client Workstations', desc: 'End-user devices' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 6,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', marginBottom: 4 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Network" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
