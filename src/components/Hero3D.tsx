import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Layers, Compass, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { MataratuLogo } from './MataratuLogo';

interface Hero3DProps {
  onOpenJoinModal: () => void;
}

type MaterialPreset = 'mining-gold' | 'emerald' | 'obsidian';

// Helper to draw curved text along arc on canvas
function drawArcText(
  ctx: CanvasRenderingContext2D,
  str: string,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  isClockwise: boolean = true
) {
  const charCount = str.length;
  const angleStep = (endAngle - startAngle) / (charCount - 1);

  ctx.save();
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 36px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < charCount; i++) {
    const angle = startAngle + i * angleStep;
    ctx.save();
    ctx.translate(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.rotate(angle + (isClockwise ? Math.PI / 2 : -Math.PI / 2));
    ctx.fillText(str[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

// Helper to draw rounded rectangle on canvas
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Generate the 100% authentic MATARATU logo as a high-res 1024x1024 texture for Three.js
function createMataratuCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 512;
  const cy = 512;

  // 1. Draw 8 Curved Yellow Sawtooth Blades
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((i * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, -315);
    ctx.bezierCurveTo(80, -360, 160, -425, 245, -445);
    ctx.bezierCurveTo(175, -310, 100, -250, 0, -225);
    ctx.closePath();
    ctx.fillStyle = '#FDE047';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#CA8A04';
    ctx.stroke();
    ctx.restore();
  }

  // 2. Red Outer Ring
  ctx.beginPath();
  ctx.arc(cx, cy, 335, 0, Math.PI * 2);
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#DC2626';
  ctx.stroke();

  // 3. Blue Ribbon Ring
  ctx.beginPath();
  ctx.arc(cx, cy, 312, 0, Math.PI * 2);
  ctx.fillStyle = '#8BE0E8';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#0284C7';
  ctx.stroke();

  // 4. Arched Text: TEKNIK PERTAMBANGAN BATUBARA (Top)
  drawArcText(
    ctx,
    'TEKNIK PERTAMBANGAN BATUBARA',
    cx,
    cy,
    272,
    -Math.PI * 0.85,
    -Math.PI * 0.15,
    true
  );

  // 4b. Arched Text: MATARATU (Bottom)
  drawArcText(
    ctx,
    'MATARATU',
    cx,
    cy,
    272,
    Math.PI * 0.73,
    Math.PI * 0.27,
    false
  );

  // 5. Inner Green Field
  ctx.beginPath();
  ctx.arc(cx, cy, 230, 0, Math.PI * 2);
  ctx.fillStyle = '#9ADE43';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#15803D';
  ctx.stroke();

  // 6. Masked Coal Bed & Red TPB Machine
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 226, 0, Math.PI * 2);
  ctx.clip();

  // Solid Black Coal Layer at bottom
  ctx.fillStyle = '#111827';
  ctx.fillRect(cx - 240, cy + 92, 480, 150);

  // Red Sled / Machine Base
  ctx.fillStyle = '#DC2626';
  ctx.strokeStyle = '#7F1D1D';
  ctx.lineWidth = 4;
  drawRoundRect(ctx, cx - 110, cy + 62, 220, 32, 16);
  ctx.fill();
  ctx.stroke();

  // Red TPB Shovel Machine Graphic
  ctx.fillStyle = '#E11D48';
  ctx.strokeStyle = '#9F1239';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 175);
  ctx.lineTo(cx + 100, cy - 175);
  ctx.bezierCurveTo(cx + 140, cy - 175, cx + 160, cy - 145, cx + 160, cy - 115);
  ctx.bezierCurveTo(cx + 160, cy - 85, cx + 140, cy - 65, cx + 110, cy - 60);
  ctx.bezierCurveTo(cx + 145, cy - 55, cx + 165, cy - 30, cx + 165, cy + 10);
  ctx.bezierCurveTo(cx + 165, cy + 50, cx + 135, cy + 70, cx + 90, cy + 70);
  ctx.lineTo(cx + 20, cy + 70);
  ctx.lineTo(cx + 20, cy - 60);
  ctx.lineTo(cx - 10, cy - 60);
  ctx.lineTo(cx - 10, cy + 70);
  ctx.lineTo(cx - 50, cy + 70);
  ctx.lineTo(cx - 50, cy - 60);
  ctx.lineTo(cx - 130, cy - 10);
  ctx.lineTo(cx - 160, cy - 40);
  ctx.lineTo(cx - 70, cy - 115);
  ctx.lineTo(cx - 70, cy - 175);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cavities inside P and B
  ctx.fillStyle = '#9ADE43';
  ctx.strokeStyle = '#9F1239';
  ctx.lineWidth = 5;
  drawRoundRect(ctx, cx + 45, cy - 150, 55, 48, 8);
  ctx.fill();
  ctx.stroke();

  drawRoundRect(ctx, cx + 45, cy - 40, 60, 65, 8);
  ctx.fill();
  ctx.stroke();

  // Machine Boom Triangle
  ctx.beginPath();
  ctx.moveTo(cx - 110, cy - 40);
  ctx.lineTo(cx - 70, cy - 95);
  ctx.lineTo(cx - 70, cy - 40);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenJoinModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [materialPreset, setMaterialPreset] = useState<MaterialPreset>('mining-gold');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const emblemGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<{
    coinMesh?: THREE.Mesh;
    bezelRing?: THREE.Mesh;
    gearBladesGroup?: THREE.Group;
    floatingRaysGroup?: THREE.Group;
    particles?: THREE.Points;
  }>({});

  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0.005 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.8);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 2.2, 15);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf59e0b, 3.8, 12);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Main Emblem Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);
    emblemGroupRef.current = emblemGroup;

    // Create Official Texture
    const logoTexture = createMataratuCanvasTexture();

    // 1. Central 3D Medallion Coin (Cylinder) with Front Logo Texture
    const coinGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.22, 64);
    
    // Side edge material (Golden metallic ribbed coin edge)
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.88,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });

    // Front face material (Authentic Mataratu Logo Texture)
    const frontMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      metalness: 0.35,
      roughness: 0.35,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.1,
    });

    // Back face material (Deep embossed brass seal)
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x451a03,
      emissiveIntensity: 0.15,
    });

    // Cylinder materials array: [side, top/front, bottom/back]
    const coinMesh = new THREE.Mesh(coinGeo, [edgeMat, frontMat, backMat]);
    // Orient cylinder face forward
    coinMesh.rotation.x = Math.PI / 2;
    emblemGroup.add(coinMesh);
    layersRef.current.coinMesh = coinMesh;

    // 2. Heavy 3D Extruded Bezel Ring around the coin
    const bezelGeo = new THREE.TorusGeometry(2.38, 0.09, 16, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xb45309,
      emissiveIntensity: 0.25,
    });
    const bezelRing = new THREE.Mesh(bezelGeo, bezelMat);
    emblemGroup.add(bezelRing);
    layersRef.current.bezelRing = bezelRing;

    // 3. Eight Real 3D Extruded Curved Bucket-Wheel Turbine Blades
    const gearBladesGroup = new THREE.Group();
    
    // Create accurate curved sickle blade geometry
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.quadraticCurveTo(0.4, 0.5, 0.85, 1.3);
    bladeShape.quadraticCurveTo(0.15, 0.9, -0.15, 0.4);
    bladeShape.closePath();

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);

    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x854d0e,
      emissiveIntensity: 0.25,
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
      bladeMesh.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, -0.09);
      bladeMesh.rotation.z = angle - Math.PI / 2;
      gearBladesGroup.add(bladeMesh);
    }
    emblemGroup.add(gearBladesGroup);
    layersRef.current.gearBladesGroup = gearBladesGroup;

    // 4. Subtle Outer Radiating Rays for depth
    const raysGroup = new THREE.Group();
    const rayRingGeo = new THREE.TorusGeometry(2.85, 0.03, 12, 64);
    const rayRingMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.35,
    });
    const rayRing = new THREE.Mesh(rayRingGeo, rayRingMat);
    raysGroup.add(rayRing);
    emblemGroup.add(raysGroup);
    layersRef.current.floatingRaysGroup = raysGroup;

    // 5. Golden Coal Dust Particles Swirling
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 1.8 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      posArray[i] = r * Math.cos(theta) * Math.cos(phi);
      posArray[i + 1] = r * Math.sin(theta) * Math.cos(phi);
      posArray[i + 2] = r * Math.sin(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xfacc15,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    layersRef.current.particles = particles;

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (emblemGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          emblemGroupRef.current.rotation.y += rotVelocity.current.y;
          emblemGroupRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.12;
        }

        // Rotate blades slightly
        if (layersRef.current.gearBladesGroup) {
          layersRef.current.gearBladesGroup.rotation.z = elapsed * 0.08;
        }
        if (layersRef.current.floatingRaysGroup) {
          layersRef.current.floatingRaysGroup.rotation.z = -elapsed * 0.05;
        }
      }

      // Swirling coal dust particles
      if (layersRef.current.particles) {
        layersRef.current.particles.rotation.y = elapsed * 0.05;
        layersRef.current.particles.rotation.x = elapsed * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      bladeGeo.dispose();
      coinGeo.dispose();
    };
  }, []);

  // Handle Explode / Disperse Layers
  useEffect(() => {
    const { coinMesh, bezelRing, gearBladesGroup, floatingRaysGroup } = layersRef.current;
    if (isExploded) {
      if (gearBladesGroup) gearBladesGroup.position.z = -1.1;
      if (floatingRaysGroup) floatingRaysGroup.position.z = -0.6;
      if (bezelRing) bezelRing.position.z = 0.4;
      if (coinMesh) coinMesh.position.z = 1.0;
    } else {
      if (gearBladesGroup) gearBladesGroup.position.z = 0;
      if (floatingRaysGroup) floatingRaysGroup.position.z = 0;
      if (bezelRing) bezelRing.position.z = 0;
      if (coinMesh) coinMesh.position.z = 0;
    }
  }, [isExploded]);

  // Mouse & Touch Drag Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
    setIsInteracting(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !emblemGroupRef.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    emblemGroupRef.current.rotation.y += deltaX * 0.008;
    emblemGroupRef.current.rotation.x += deltaY * 0.008;

    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsInteracting(false), 500);
  };

  return (
    <section id="beranda" className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-amber-900/20 bg-radial from-slate-900 via-slate-950 to-black">
      {/* Background Ambience & Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Mahasiswa Tambang Batubara Bersatu</span>
            <span aria-hidden="true">·</span>
            <span>Est. 9 Jan 2009</span>
            <span aria-hidden="true">·</span>
            <span>Akamigas Palembang</span>
          </div>

          <div className="flex items-center gap-4">
            <MataratuLogo className="w-16 h-16 shrink-0 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Himpunan Mahasiswa <br />
              <span className="gold-gradient-text">MATARATU</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            Wadah resmi mahasiswa <strong className="text-amber-300">Teknik Pertambangan Batubara (TPB) Politeknik Akamigas Palembang</strong>. 
            Organisasi mandiri, bermartabat, dan berkualitas dalam membentuk karakter diri, menjunjung etika profesi tambang ramah lingkungan, 
            serta mempererat silaturahmi mahasiswa, dosen, dan alumni.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundManager.playChime();
                onOpenJoinModal();
              }}
              className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-[0_0_25px_rgba(245,197,66,0.35)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Bergabung Bersama Kami</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#struktur"
              onClick={() => soundManager.playClick()}
              className="px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Jelajahi Struktur Organisasi</span>
            </a>

          </div>

          {/* Adjacency Proof Strip (Key Metrics from Mataratu) */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6">
            <div>
              <div className="font-cinzel text-2xl font-bold text-amber-300 tabular-nums">2009</div>
              <div className="text-xs text-slate-400 mt-1">Tahun Berdiri Himpunan</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl font-bold text-amber-300 tabular-nums">75 Kader</div>
              <div className="text-xs text-slate-400 mt-1">Pengurus Periode 2026-2027</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl font-bold text-amber-300 tabular-nums">8 Bidang</div>
              <div className="text-xs text-slate-400 mt-1">BPH & 7 Departemen Resmi</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Emblem Viewport */}
        <div id="lambang-resmi" className="lg:col-span-6 flex flex-col items-center">
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`relative w-full h-[440px] sm:h-[500px] rounded-2xl border border-amber-900/40 bg-gradient-to-b from-slate-900/50 to-slate-950/80 backdrop-blur-md overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none shadow-[0_0_50px_rgba(0,0,0,0.8)] ${
              isInteracting ? 'ring-1 ring-amber-400/40' : ''
            }`}
          >
            {/* The Canvas */}
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Subtle Viewport HUD Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-amber-300 flex items-center gap-1.5 pointer-events-auto">
                <Eye className="w-3.5 h-3.5" />
                <span>Simulasi Lambang Interaktif</span>
              </div>

              {/* View Status */}
              <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-slate-300 pointer-events-auto">
                Model Presisi MATARATU
              </div>
            </div>

            {/* Bottom HUD controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
              <span className="text-slate-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 hidden sm:inline-block">
                Tahan & seret untuk rotasi 360°
              </span>

              <div className="flex items-center gap-2 pointer-events-auto ml-auto">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setAutoRotate(!autoRotate);
                  }}
                  className={`p-2 rounded-lg border backdrop-blur-md transition-all ${
                    autoRotate 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                      : 'bg-black/60 text-slate-400 border-white/10 hover:text-white'
                  }`}
                  title="Toggle Rotasi Otomatis"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setIsExploded(!isExploded);
                  }}
                  className={`px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                    isExploded 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                      : 'bg-black/60 text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isExploded ? 'Satukan Struktur' : 'Pisahkan Lapisan Komponen'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-2">
            <span>Lambang Resmi MATARATU: Roda Gerigi Mesin Tambang & Simbol TPB Batubara</span>
          </div>
        </div>

      </div>
    </section>
  );
};
