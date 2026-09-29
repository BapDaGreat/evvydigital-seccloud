import { useEffect, RefObject } from 'react';
import * as THREE from 'three';

/**
 * Dedicated hook for the TOPFORM 3D Hero Background (Three.js).
 *
 * Features:
 * - Slowly undulating brushed-titanium & refractive sculptural Torus Knot
 *   rendered with MeshPhysicalMaterial (roughness ~0.15, metalness ~0.9,
 *   clearcoat 1.0, subtle iridescence & studio PMREM reflections).
 * - Smooth lerp/spring cursor tracking with inertia (no snappy movement).
 * - IntersectionObserver lifecycle management to pause rendering when scrolled
 *   out of view, plus pixelRatio capped at 2 for mobile battery preservation.
 */
export function useHeroThreeScene(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // WebGL Renderer with pixel ratio capped at 2
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback gracefully if WebGL is disabled
      return;
    }

    const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(getPixelRatio());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();

    // Camera positioned to frame the sculptural form in the right/center hero space
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    // Build a lightweight procedural studio environment for authentic metallic specular highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0c0d0e);

    // Warm tungsten key strip
    const stripGeo = new THREE.PlaneGeometry(10, 2.2);
    const warmStripMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf4f1ea).multiplyScalar(3.2),
      side: THREE.DoubleSide,
    });
    const warmStrip = new THREE.Mesh(stripGeo, warmStripMat);
    warmStrip.position.set(4, 5, 4);
    warmStrip.lookAt(0, 0, 0);
    envScene.add(warmStrip);

    // Cool titanium rim strip
    const coolStripMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xa1a1aa).multiplyScalar(2.4),
      side: THREE.DoubleSide,
    });
    const coolStrip = new THREE.Mesh(stripGeo, coolStripMat);
    coolStrip.position.set(-5, -3, 3);
    coolStrip.lookAt(0, 0, 0);
    envScene.add(coolStrip);

    // Subtle TOPFORM Blue (#008BCE) grazing rim strip
    const blueStripMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x008bce).multiplyScalar(1.8),
      side: THREE.DoubleSide,
    });
    const blueStrip = new THREE.Mesh(stripGeo, blueStripMat);
    blueStrip.position.set(2, -5, -3);
    blueStrip.lookAt(0, 0, 0);
    envScene.add(blueStrip);

    const envRenderTarget = pmremGenerator.fromScene(envScene, 0.04);
    scene.environment = envRenderTarget.texture;

    // Dispose temporary env scene geometries/materials
    stripGeo.dispose();
    warmStripMat.dispose();
    coolStripMat.dispose();
    blueStripMat.dispose();
    pmremGenerator.dispose();

    // Group holding our sculptural form
    const rigGroup = new THREE.Group();
    // Subtle asymmetric offset toward the right side on desktop
    rigGroup.position.set(1.45, 0.15, 0);
    scene.add(rigGroup);

    // High-resolution Torus Knot (Mobius-like 2,3 harmonic knot)
    const geometry = new THREE.TorusKnotGeometry(2.15, 0.46, 220, 48, 2, 3);

    // Store base vertex positions & normals for organic slow undulation
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const normAttr = geometry.attributes.normal as THREE.BufferAttribute;
    const basePositions = new Float32Array(posAttr.array.length);
    basePositions.set(posAttr.array);

    // Primary Brushed Dark Titanium Physical Material (roughness ~0.15, metalness ~0.9)
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1b1d21),
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.09,
      reflectivity: 1.0,
      iridescence: 0.22,
      iridescenceIOR: 1.35,
      envMapIntensity: 1.35,
    });

    const coreMesh = new THREE.Mesh(geometry, titaniumMaterial);
    rigGroup.add(coreMesh);

    // Subtle secondary refractive/wireframe glass-like halo mesh for depth dispersion
    const cageGeometry = new THREE.TorusKnotGeometry(2.19, 0.475, 140, 24, 2, 3);
    const refractiveRimMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xd4d4d8),
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.85,
      transparent: true,
      opacity: 0.16,
      ior: 1.45,
      thickness: 0.9,
      iridescence: 0.45,
      iridescenceIOR: 1.5,
      wireframe: false,
    });
    const haloMesh = new THREE.Mesh(cageGeometry, refractiveRimMaterial);
    rigGroup.add(haloMesh);

    // Direct studio lights for dynamic shadow/highlight interplay
    const keyLight = new THREE.DirectionalLight(0xfafaf9, 2.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x008bce, 3.5, 22, Math.PI / 3, 0.75, 1.5);
    rimLight.position.set(-4, -5, 4);
    scene.add(rimLight);

    const warmFillLight = new THREE.PointLight(0xe4e4e7, 1.4, 18);
    warmFillLight.position.set(3, -3, 5);
    scene.add(warmFillLight);

    // Cursor tracking state with smooth lerp inertia
    const pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Normalized -1 to +1 coordinates
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.targetX = Math.max(-1, Math.min(1, nx));
      pointer.targetY = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Responsive sizing
    const updateSize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Center slightly more on narrow screens so the sculpture stays framed behind headline
      rigGroup.position.x = width < 900 ? 0.35 : 1.45;
      rigGroup.scale.setScalar(width < 640 ? 0.78 : 1.0);
      camera.updateProjectionMatrix();
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Lifecycle & IntersectionObserver to pause RAF when out of view
    let isInView = true;
    let isTabVisible = !document.hidden;
    let rafId: number | null = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clock = new THREE.Clock();

    const renderFrame = () => {
      rafId = null;
      if (!isInView || !isTabVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth spring/lerp interpolation toward cursor
      const lerpFactor = 0.035;
      pointer.currentX += (pointer.targetX - pointer.currentX) * lerpFactor;
      pointer.currentY += (pointer.targetY - pointer.currentY) * lerpFactor;

      // Subtle organic vertex undulation along vertex normals
      if (!prefersReducedMotion) {
        const positions = posAttr.array as Float32Array;
        const normals = normAttr.array as Float32Array;
        const vertexCount = posAttr.count;

        for (let i = 0; i < vertexCount; i++) {
          const idx = i * 3;
          const bx = basePositions[idx];
          const by = basePositions[idx + 1];
          const bz = basePositions[idx + 2];

          const wave =
            Math.sin(bx * 1.35 + elapsed * 0.85) *
            Math.cos(by * 1.35 + elapsed * 0.65) *
            0.045;

          positions[idx] = bx + normals[idx] * wave;
          positions[idx + 1] = by + normals[idx + 1] * wave;
          positions[idx + 2] = bz + normals[idx + 2] * wave;
        }
        posAttr.needsUpdate = true;
      }

      // Slow autonomous rotation + lerped cursor tilt
      coreMesh.rotation.x = elapsed * 0.09 + pointer.currentY * 0.32;
      coreMesh.rotation.y = elapsed * 0.13 + pointer.currentX * 0.42;
      coreMesh.rotation.z = Math.sin(elapsed * 0.2) * 0.08;

      haloMesh.rotation.copy(coreMesh.rotation);
      rigGroup.position.y = 0.15 + pointer.currentY * 0.18;

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const startLoop = () => {
      if (rafId === null && isInView && isTabVisible) {
        clock.getDelta(); // prevent large time jump after pause
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInView = Boolean(entry?.isIntersecting);
        if (isInView) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Kick off initial render
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      geometry.dispose();
      cageGeometry.dispose();
      titaniumMaterial.dispose();
      refractiveRimMaterial.dispose();
      envRenderTarget.dispose();
      renderer.dispose();
    };
  }, [canvasRef, containerRef]);
}
