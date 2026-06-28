// CS Construction Portal - GlassCard Component
import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accent?: boolean;
  accentColor?: string; // e.g. border-amber-500
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  accent = false,
  accentColor = 'border-l-amber-500 dark:border-l-amber-400',
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`glass-panel rounded-xl p-6 transition-all duration-300 relative overflow-hidden
        ${accent ? `border-l-4 ${accentColor}` : ''}
        ${hoverable ? 'hover:translate-y-[-2px] hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-amber-500/20' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none rounded-xl"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
