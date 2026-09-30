import React, { useRef, useCallback } from 'react';
import { useTactile3D, Tactile3DOptions } from '../hooks/useTactile3D';

interface TactileSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, Tactile3DOptions {
  /** Optional subtle accent color for the specular sheen ('titanium' | 'blue' | 'red' | 'green') */
  sheenTone?: 'titanium' | 'blue' | 'red' | 'green';
  /** Enable 3D perspective tilt on hover (default false to keep strict architectural grid lines) */
  enableTilt?: boolean;
}

/**
 * Floodlit Architectural Plate component.
 * Built to Impeccable craft-floor + Emil Kowalski design engineering standards:
 * - Single-elevation hairline border + top-edge specular rim
 * - Fine-pointer gated radial floodlight sheen
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
    if (e.pointerType === 'touch') return;
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

  const sheenMap: Record<NonNullable<TactileSurfaceProps['sheenTone']>, string> = {
    blue: 'radial-gradient(560px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 198, 244, 0.12), rgba(0, 139, 206, 0.035) 42%, transparent 72%)',
    red: 'radial-gradient(520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(244, 63, 94, 0.1), rgba(255, 255, 255, 0.02) 42%, transparent 72%)',
    green:
      'radial-gradient(520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0.02) 42%, transparent 72%)',
    titanium:
      'radial-gradient(540px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 198, 244, 0.075), rgba(255, 255, 255, 0.02) 42%, transparent 72%)',
  };

  return (
    <div
      ref={enableTilt ? tilt.ref : staticRef}
      onPointerMove={enableTilt ? tilt.handlers.onPointerMove : handleStaticPointerMove}
      onPointerLeave={enableTilt ? tilt.handlers.onPointerLeave : handleStaticPointerLeave}
      style={style}
      className={`relative overflow-hidden rounded-[12px] tf-surface-plate ${className}`}
      {...rest}
    >
      {/* Dynamic Specular Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          opacity: 'var(--sheen-opacity, 0)',
          background: sheenMap[sheenTone],
          transition: 'opacity 240ms var(--ease-out)',
        }}
      />

      {/* Top edge rim highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] z-[2]"
        style={{
          opacity: 'var(--sheen-opacity, 0)',
          background:
            'radial-gradient(280px circle at var(--mouse-x, 50%) 0px, rgba(56, 198, 244, 0.55), transparent 100%)',
          transition: 'opacity 240ms var(--ease-out)',
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

interface TactileButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'blue' | 'charcoal';
}

/**
 * Solid TOPFORM Blue Primary CTA button matching Mark's reference app style:
 * - Solid #29B6F6 fill, crisp dark #05080D typography, right arrow (→)
 * - Physical :active scale(0.97) press feedback over 150ms var(--ease-out)
 * - Touch-safe hover elevation via .tf-btn-primary / .tf-btn-ghost
 */
export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  className = '',
  variant = 'blue',
  ...rest
}) => {
  const baseStyles =
    variant === 'blue'
      ? 'bg-[#29B6F6] text-[#05080d] border border-[#69E0FA]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_24px_-8px_rgba(0,139,206,0.45)] tf-btn-primary'
      : 'bg-[#0b121d] text-[#ffffff] border border-white/15 tf-btn-ghost';

  return (
    <a
      className={`tf-control relative inline-flex items-center justify-center rounded-[8px] px-7 py-4 text-[13px] font-bold tracking-[0.09em] uppercase ${baseStyles} ${className}`}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-3">
        <span>{children}</span>
        <span aria-hidden="true" className="text-base leading-none">
          &rarr;
        </span>
      </span>
    </a>
  );
};

/**
 * Kept as a no-op export for backward compatibility with other components;
 * Impeccable craft-floor forbids synthetic feTurbulence SVG grain overlays.
 */
export const AnalogNoiseOverlay: React.FC = () => null;
