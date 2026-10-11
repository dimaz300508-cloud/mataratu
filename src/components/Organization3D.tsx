import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../utils/audio';
import { Users, Award, HardHat, Search, ChevronRight } from 'lucide-react';
import { DEPARTMENTS_DATA, getEffectiveMembers, DepartmentData } from '../data/membersData';

export const Organization3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeDepartment, setActiveDepartment] = useState<DepartmentData>(DEPARTMENTS_DATA[0]);
  const [memberRoster, setMemberRoster] = useState(() => getEffectiveMembers());
  const [viewMode, setViewMode] = useState<'interactive' | 'roster'>('interactive');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('Semua');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const nodeMeshesRef = useRef<{ id: string; mesh: THREE.Mesh }[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfef08a, 2.5);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    // Create Nodes
    const nodeMeshes: { id: string; mesh: THREE.Mesh }[] = [];
    const centerCoord = new THREE.Vector3(...DEPARTMENTS_DATA[0].coordinate);

    DEPARTMENTS_DATA.forEach((dept) => {
      const isCenter = dept.id === 'bph';
      const geo = isCenter ? new THREE.IcosahedronGeometry(0.58, 1) : new THREE.SphereGeometry(0.36, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(dept.color),
        metalness: 0.8,
        roughness: 0.25,
        emissive: new THREE.Color(dept.color),
        emissiveIntensity: isCenter ? 0.45 : 0.25,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...dept.coordinate);
      group.add(mesh);
      nodeMeshes.push({ id: dept.id, mesh });

      if (!isCenter) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          centerCoord,
          new THREE.Vector3(...dept.coordinate),
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(dept.color),
          transparent: true,
          opacity: 0.35,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      }
    });

    nodeMeshesRef.current = nodeMeshes;

    // Outer subtle orbit rings
    const ringGeo = new THREE.RingGeometry(2.8, 2.85, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    group.add(orbitRing);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle group swaying
      group.rotation.y = Math.sin(elapsed * 0.25) * 0.3;
      group.rotation.x = Math.cos(elapsed * 0.2) * 0.15;

      // Pulse nodes
      nodeMeshes.forEach((n, idx) => {
        const scale = 1 + Math.sin(elapsed * 2 + idx) * 0.08;
        n.mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const syncMembers = () => setMemberRoster(getEffectiveMembers());
    syncMembers();
    window.addEventListener('mataratu-members-updated', syncMembers);
    return () => window.removeEventListener('mataratu-members-updated', syncMembers);
  }, []);

  const matchesDepartment = (memberDepartment: string, dept: DepartmentData) => {
    const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedMember = normalize(memberDepartment);
    return [dept.name, dept.shortName].some((value) => normalize(value) === normalizedMember);
  };

  const selectDepartment = (dept: DepartmentData) => {
    soundManager.playClick();
    setActiveDepartment(dept);
  };

  const dynamicDepartmentData = DEPARTMENTS_DATA.map((dept) => {
    const members = memberRoster.filter((m) => matchesDepartment(m.departemen, dept));
    return {
      ...dept,
      members,
      membersCount: members.length,
    };
  });

  const rosterDepartment = dynamicDepartmentData.find((dept) => dept.id === activeDepartment.id) ?? dynamicDepartmentData[0];
  const departmentDetails = rosterDepartment ?? activeDepartment;

  // Filter members in full roster view
  const filteredRoster = memberRoster.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.npm.includes(searchQuery) ||
      m.departemen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'Semua' || m.kelas === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <section id="struktur" className="py-20 bg-slate-950 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <span>Kepengurusan HMPS MATARATU Periode 2026-2027</span>
              <span aria-hidden="true">·</span>
            <span>{memberRoster.length} Anggota Resmi</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Struktur Organisasi & Daftar Pengurus
            </h2>
            <p className="mt-2 text-xs font-semibold text-amber-300/90 tracking-widest uppercase">
              ” Inklusif – Kolaboratif – Progresif ”
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Daftar resmi seluruh jajaran struktural dan bidang HMPS MATARATU
              Program Studi Teknik Pertambangan Batubara Politeknik Akamigas Palembang.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode('interactive');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'interactive' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bagan Interaktif
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode('roster');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'roster' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Daftar Lengkap {memberRoster.length} Pengurus
            </button>
          </div>
        </div>

        {/* Department Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {dynamicDepartmentData.map((dept) => (
            <button
              key={dept.id}
              onClick={() => selectDepartment(dept)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 cursor-pointer flex items-center gap-2 ${
                activeDepartment.id === dept.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
              <span>{dept.shortName}</span>
              <span className="text-[10px] text-slate-500 tabular-nums font-bold">({dept.membersCount})</span>
            </button>
          ))}
        </div>

        {viewMode === 'interactive' ? (
          /* INTERACTIVE SPLIT: 3D NODE CANVAS + ACTIVE DEPT INSPECTOR WITH COMPLETE MEMBER LIST */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 3D Canvas */}
            <div 
              ref={containerRef}
              className="lg:col-span-6 h-[440px] sm:h-[520px] rounded-2xl border border-amber-900/40 bg-radial from-slate-900/70 to-slate-950/95 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.7)]"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-amber-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: departmentDetails.color }} />
              <span>Departemen: {departmentDetails.shortName}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  Himpunan & 7 Departemen
                </span>
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-medium text-amber-300">
                  Total {memberRoster.length} Kader Aktif
                </span>
              </div>
            </div>

            {/* Department Inspector Details */}
            <div className="lg:col-span-6 rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <HardHat className="w-3.5 h-3.5" />
                    <span>Detail Kepengurusan</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span className="tabular-nums font-bold text-amber-300">{departmentDetails.membersCount}</span> Anggota
                  </div>
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
                  {departmentDetails.name}
                </h3>

                {/* Leaders Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 my-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-400">Ketua:</span>
                    <strong className="text-amber-200">{departmentDetails.head}</strong>
                  </div>
                  {departmentDetails.viceHead && (
                    <div className="flex items-center gap-2 text-xs pl-6">
                      <span className="text-slate-400">Wakil Ketua:</span>
                      <strong className="text-slate-200">{departmentDetails.viceHead}</strong>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {departmentDetails.description}
                </p>

                {/* Table of Members in this Department */}
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Daftar Anggota Departemen ({departmentDetails.members.length})</span>
                    <span className="text-[10px] text-slate-500">NPM & Kelas Resmi</span>
                  </div>

                  <div className="max-h-[220px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/70 divide-y divide-slate-800/80 text-xs">
                    {departmentDetails.members.map((m) => (
                      <div key={m.no} className="px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-900/50 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span className="w-5 text-[10px] text-slate-500 font-mono text-right shrink-0">{m.no}.</span>
                          <div className="truncate">
                            <div className="font-semibold text-slate-100 truncate">{m.name}</div>
                            <div className="text-[10px] text-amber-400/90 font-mono">NPM: {m.npm}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 font-medium">
                            {m.kelas}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>SK Kepengurusan: Periode 2026-2027</span>
                <button
                  onClick={() => setViewMode('roster')}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <span>Lihat Seluruh {memberRoster.length} Pengurus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* FULL ROSTER TABLE (ALL 75 MEMBERS) */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama, NPM, atau departemen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-slate-400 whitespace-nowrap">Filter Kelas:</span>
                {['Semua', 'TPB 5A', 'TPB 5B', 'TPB 5C', 'TPB 3A', 'TPB 3B', 'TPB 3C'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setFilterClass(cls)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                      filterClass === cls
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Lengkap</th>
                    <th className="py-3 px-4">NPM</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4">Departemen</th>
                    <th className="py-3 px-4">Jabatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/30">
                  {filteredRoster.length > 0 ? (
                    filteredRoster.map((m) => (
                      <tr key={m.no} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-center text-slate-500">{m.no}</td>
                        <td className="py-3 px-4 font-semibold text-slate-100">{m.name}</td>
                        <td className="py-3 px-4 font-mono text-amber-300/90 font-medium">{m.npm}</td>
                        <td className="py-3 px-4 font-mono text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                            {m.kelas}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{m.departemen}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            m.role === 'Ketua' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : m.role === 'Wakil'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                              : m.role === 'Sekretaris' || m.role === 'Bendahara'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : m.role === 'PJ'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {m.role === 'Ketua' ? 'Ketua' : m.role === 'Wakil' ? 'Wakil Ketua' : m.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        Tidak ada pengurus yang cocok dengan kata kunci pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Menampilkan {filteredRoster.length} dari 75 pengurus resmi</span>
              <button
                onClick={() => setViewMode('interactive')}
                className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Kembali ke Bagan Interaktif
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
