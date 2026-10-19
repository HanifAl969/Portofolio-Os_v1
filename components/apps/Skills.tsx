'use client';

import { skills } from '@/data/skills';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Skills() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Technical Skills
        </h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobileOrTablet ? 24 : 20 }}>
        {skills.map((skill, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ fontSize: isMobileOrTablet ? 16 : 15, fontWeight: 600, color: '#e6edf3' }}>
                {skill.category}
              </h3>
              <span style={{ fontSize: 13, color: '#00ff9f', fontWeight: 600 }}>
                {skill.level}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: isMobileOrTablet ? 10 : 8,
                backgroundColor: '#2d3748',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  backgroundColor: '#00ff9f',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skill.items.map((item, j) => (
                <span
                  key={j}
                  style={{
                    padding: isMobileOrTablet ? '6px 12px' : '4px 10px',
                    backgroundColor: '#0f1419',
                    border: '1px solid #2d3748',
                    borderRadius: 4,
                    fontSize: isMobileOrTablet ? 13 : 12,
                    color: '#e6edf3',
                  }}
                >
                  {item}
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
      <MobileAppView title="Skills" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
