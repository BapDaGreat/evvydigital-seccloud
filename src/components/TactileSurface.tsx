import React, { useRef, useCallback } from 'react';
import { useTactile3D, Tactile3DOptions } from '../hooks/useTactile3D';

interface TactileSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, Tactile3DOptions {
  /** Optional subtle accent color for the specular sheen ('titanium' | 'blue') */
  sheenTone?: 'titanium' | 'blue';
  /** Enable 3D perspective tilt on hover (default false to keep strict architectural grid lines) */
  enableTilt?: boolean;
}

/**
 * Modular Tactile Surface component.
 * Provides:
 * - Crisp hairline border & multi-layered inner box shadows
 * - Dynamic radial gradient specular sheen tracking pointer coordinates
 * - Optional subtle 3D perspective tilt when enableTilt is true
 */
export const TactileSurface: React.FC<TactileSurfaceProps> = ({
  children,
  className = '',
  maxTilt = 2,
  scale = 1.002,
  damping = 0.14,
  sheenTone = 'titanium',
  enableTilt = false,
  style,
  ...rest
}) => {
  const tilt = useTactile3D<HTMLDivElement>({ maxTilt, scale, damping });
  const staticRef = useRef<HTMLDivElement | null>(null);

  const handleStaticPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = staticRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
    el.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
    el.style.setProperty('--sheen-opacity', '1');
  }, []);

  const handleStaticPointerLeave = useCallback(() => {
    const el = staticRef.current;
    if (el) {
      el.style.setProperty('--sheen-opacity', '0');
    }
  }, []);

  const sheenGradient =
    sheenTone === 'blue'
      ? 'radial-gradient(560px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(105, 224, 250, 0.1), rgba(255, 255, 255, 0.025) 38%, transparent 72%)'
      : 'radial-gradient(540px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.075), rgba(212, 212, 216, 0.02) 40%, transparent 72%)';

  return (
    <div
      ref={enableTilt ? tilt.ref : staticRef}
      onPointerMove={enableTilt ? tilt.handlers.onPointerMove : handleStaticPointerMove}
      onPointerLeave={enableTilt ? tilt.handlers.onPointerLeave : handleStaticPointerLeave}
      style={style}
      className={`relative tactile-panel transition-colors duration-300 ${className}`}
      {...rest}
    >
      {/* Dynamic Specular Sheen (simulates light catching glass / brushed metal) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--sheen-opacity, 0)',
          background: sheenGradient,
        }}
      />

      {/* Top edge brushed-metal rim highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] z-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--sheen-opacity, 0)',
          background:
            'radial-gradient(260px circle at var(--mouse-x, 50%) 0px, rgba(255, 255, 255, 0.35), transparent 100%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface TactileButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'alabaster' | 'charcoal';
}

/**
 * Tactile CTA link with subtle perspective response and dynamic specular edge catch.
 */
export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  className = '',
  variant = 'alabaster',
  ...rest
}) => {
  const { ref, handlers } = useTactile3D<HTMLAnchorElement>({
    maxTilt: 4,
    scale: 1.01,
    damping: 0.15,
  });

  const baseStyles =
    variant === 'alabaster'
      ? 'bg-[#f4f4f5] text-[#0c0d0e] hover:bg-[#008BCE] hover:text-[#ffffff] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_30px_-10px_rgba(0,0,0,0.75)]'
      : 'bg-[#141619] text-[#f4f4f5] hover:bg-[#008BCE] hover:border-[#008BCE] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_30px_-10px_rgba(0,0,0,0.8)]';

  return (
    <a
      ref={ref}
      {...handlers}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative inline-flex items-center justify-center px-9 py-4 text-xs font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${baseStyles} ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: 'var(--sheen-opacity, 0)',
          background:
            'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.22), transparent 75%)',
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </a>
  );
};

/**
 * Subtle Analog SVG Grain Overlay (mix-blend-mode: overlay)
 */
export const AnalogNoiseOverlay: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-40 opacity-[0.032]"
    style={{ mixBlendMode: 'overlay' }}
  >
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="topform-analog-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#topform-analog-grain)" />
    </svg>
  </div>
);
