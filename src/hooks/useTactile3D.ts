import { useRef, useCallback, useEffect } from 'react';

export interface Tactile3DOptions {
  /** Maximum tilt angle in degrees (default: 5.5 for subtle luxury feel) */
  maxTilt?: number;
  /** Slight scale lift on hover (default: 1.008) */
  scale?: number;
  /** Lerp smoothing factor (0.05 - 0.2, default: 0.12) */
  damping?: number;
}

/**
 * Dedicated hook for tactile 3D perspective tilt and dynamic specular sheen.
 * Tracks pointer coordinates across a surface, smoothly lerps rotateX/rotateY
 * in 3D space (perspective: 1000px; transform-style: preserve-3d), and updates
 * --mouse-x / --mouse-y CSS custom properties for radial specular edge lighting.
 */
export function useTactile3D<T extends HTMLElement = HTMLDivElement>(
  options: Tactile3DOptions = {}
) {
  const { maxTilt = 5.5, scale = 1.008, damping = 0.12 } = options;
  const elementRef = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef({
    targetRotateX: 0,
    targetRotateY: 0,
    currentRotateX: 0,
    currentRotateY: 0,
    targetScale: 1,
    currentScale: 1,
    isHovered: false,
  });

  const animate = useCallback(() => {
    const el = elementRef.current;
    if (!el) {
      rafRef.current = null;
      return;
    }

    const s = stateRef.current;
    s.currentRotateX += (s.targetRotateX - s.currentRotateX) * damping;
    s.currentRotateY += (s.targetRotateY - s.currentRotateY) * damping;
    s.currentScale += (s.targetScale - s.currentScale) * damping;

    el.style.transform = `perspective(1000px) rotateX(${s.currentRotateX.toFixed(
      3
    )}deg) rotateY(${s.currentRotateY.toFixed(3)}deg) scale3d(${s.currentScale.toFixed(
      4
    )}, ${s.currentScale.toFixed(4)}, 1)`;

    const stillMoving =
      Math.abs(s.targetRotateX - s.currentRotateX) > 0.01 ||
      Math.abs(s.targetRotateY - s.currentRotateY) > 0.01 ||
      Math.abs(s.targetScale - s.currentScale) > 0.0005;

    if (s.isHovered || stillMoving) {
      rafRef.current = window.requestAnimationFrame(animate);
    } else {
      el.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      rafRef.current = null;
    }
  }, [damping]);

  const startAnimation = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(animate);
    }
  }, [animate]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for the radial specular sheen
      el.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
      el.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
      el.style.setProperty('--sheen-opacity', '1');

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      if (halfW === 0 || halfH === 0) return;

      const normX = (x - halfW) / halfW; // -1 to +1
      const normY = (y - halfH) / halfH; // -1 to +1

      stateRef.current.isHovered = true;
      stateRef.current.targetRotateX = -normY * maxTilt;
      stateRef.current.targetRotateY = normX * maxTilt;
      stateRef.current.targetScale = scale;

      startAnimation();
    },
    [maxTilt, scale, startAnimation]
  );

  const onPointerLeave = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.style.setProperty('--sheen-opacity', '0');
    }
    stateRef.current.isHovered = false;
    stateRef.current.targetRotateX = 0;
    stateRef.current.targetRotateY = 0;
    stateRef.current.targetScale = 1;
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    ref: elementRef,
    handlers: {
      onPointerMove,
      onPointerLeave,
    },
  };
}
