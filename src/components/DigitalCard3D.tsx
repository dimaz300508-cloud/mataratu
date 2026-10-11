import React, { useState, useRef, useEffect } from 'react';
import { MemberCardData, RegisteredMember } from '../types';
import { soundManager } from '../utils/audio';
import { Sparkles, RefreshCw, Download, QrCode, Shield, Check, Lock, ShieldAlert, UserCheck, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MataratuLogo } from './MataratuLogo';
import { getEffectiveMembers } from '../data/membersData';

interface DigitalCard3DProps {
  verifiedMember?: RegisteredMember | null;
  onOpenJoinModal: () => void;
  onMemberVerified?: (member: RegisteredMember) => void;
}

export const DigitalCard3D: React.FC<DigitalCard3DProps> = ({
  verifiedMember: propMember,
  onOpenJoinModal,
  onMemberVerified,
}) => {
  // Stored active member state
  const [activeMember, setActiveMember] = useState<RegisteredMember | null>(() => {
    if (propMember) return propMember;
    try {
      const saved = localStorage.getItem('mataratu_registered_member');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Verification Form Inputs for unauthenticated members
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Sync prop changes
  useEffect(() => {
    if (propMember) {
      setActiveMember(propMember);
    }
  }, [propMember]);

  // Card Form State
  const [cardData, setCardData] = useState<MemberCardData>({
    fullName: activeMember ? activeMember.fullName : 'Mahasiswa Terdaftar',
    memberId: activeMember ? (activeMember.regCode || activeMember.nim) : 'MTR-2026-XXXX',
    faculty: 'Teknik Pertambangan Batubara',
    generation: 'Angkatan 2026 (Akamigas)',
    role: 'Kader Tambang',
    division: activeMember ? activeMember.division : 'Divisi Humas',
    joinedDate: 'Januari 2026',
  });

  // Update card data when active member changes
  useEffect(() => {
    if (activeMember) {
      setCardData((prev) => ({
        ...prev,
        fullName: activeMember.fullName,
        memberId: activeMember.regCode || activeMember.nim,
        division: activeMember.division || prev.division,
      }));
    }
  }, [activeMember]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipped(!isFlipped);
  };

  // Manual verification handler
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = verifyInput.trim().toUpperCase();
    if (!query) return;

    // Check against local stored registration or demo database
    try {
      const storedStr = localStorage.getItem('mataratu_registered_member');
      if (storedStr) {
        const stored = JSON.parse(storedStr) as RegisteredMember;
        if (
          stored.nim.toUpperCase().includes(query) ||
          stored.regCode.toUpperCase().includes(query) ||
          stored.fullName.toUpperCase().includes(query)
        ) {
          authenticateMember(stored);
          return;
        }
      }
    } catch {
      // Ignore
    }

    const memberList = getEffectiveMembers();

    // Check against official 75 HMPS MATARATU members
    const matchedOfficial = memberList.find(
      (m) =>
        m.npm === query ||
        m.name.toUpperCase().includes(query) ||
        query.includes(m.npm)
    );

    if (matchedOfficial) {
      const verifiedMemberData: RegisteredMember = {
        fullName: matchedOfficial.name,
        nim: matchedOfficial.npm,
        email: `${matchedOfficial.npm}@akamigaspalembang.ac.id`,
        phone: '0812XXXXXXXX',
        university: 'Politeknik Akamigas Palembang',
        major: `Teknik Pertambangan Batubara (${matchedOfficial.kelas})`,
        division: matchedOfficial.departemen,
        regCode: `MTR-2026-${matchedOfficial.npm.slice(-4)}`,
        registeredAt: 'SK Pengurus Periode 2026-2027',
      };
      authenticateMember(verifiedMemberData);
      return;
    }

    // Pre-registered official demo database for testing
    if (
      query.includes('24/519800/TPB') ||
      query.includes('24/519800') ||
      query.includes('MTR-REG') ||
      query.includes('AKAMIGAS') ||
      query.includes('DIMAS')
    ) {
      const demoMember: RegisteredMember = {
        fullName: 'Dimas Arya Pratama',
        nim: '24/519800/TPB',
        email: 'dimas.pratama@akamigaspalembang.ac.id',
        phone: '081234567890',
        university: 'Politeknik Akamigas Palembang',
        major: 'Teknik Pertambangan Batubara',
        division: 'Divisi Humas',
        regCode: 'MTR-REG-749102',
        registeredAt: new Date().toISOString(),
      };
      authenticateMember(demoMember);
    } else {
      setVerifyError('NIM atau Kode Registrasi tidak ditemukan. Pastikan Anda sudah mengisi formulir pendaftaran anggota terlebih dahulu.');
    }
  };

  const authenticateMember = (member: RegisteredMember) => {
    soundManager.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FACC15', '#38BDF8', '#10B981'],
    });

    setActiveMember(member);
    setVerifyError(null);
    setVerifyInput('');
    try {
      localStorage.setItem('mataratu_registered_member', JSON.stringify(member));
    } catch {
      // Ignore
    }
    if (onMemberVerified) {
      onMemberVerified(member);
    }
  };

  const handleLogout = () => {
    soundManager.playClick();
    setActiveMember(null);
    try {
      localStorage.removeItem('mataratu_registered_member');
    } catch {
      // Ignore
    }
  };

  const handleDownloadCard = async () => {
    if (!activeMember || isDownloading) return;
    const cardElement = cardRef.current;
    if (!cardElement) {
      setDownloadError('Kartu KTA belum siap. Silakan coba lagi.');
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);
    const renderStage = document.createElement('div');
    renderStage.id = 'kta-pdf-render-stage';
    renderStage.style.cssText = 'position:fixed;inset:0;z-index:-1;opacity:0;pointer-events:none;';

    try {
      await document.fonts.ready;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ]);
      const cardClone = cardElement.cloneNode(true) as HTMLDivElement;
      cardClone.style.width = `${cardElement.offsetWidth}px`;
      cardClone.style.height = `${cardElement.offsetHeight}px`;
      cardClone.style.transform = 'none';
      cardClone.style.transition = 'none';
      cardClone.style.margin = '0';

      const [frontFace, backFace] = cardClone.querySelectorAll<HTMLElement>(':scope > .backface-hidden');
      if (!frontFace || !backFace) {
        throw new Error('Permukaan depan dan belakang kartu tidak ditemukan.');
      }
      frontFace.style.opacity = '1';
      frontFace.style.filter = 'none';
      frontFace.style.backfaceVisibility = 'visible';
      backFace.style.display = 'none';

      renderStage.appendChild(cardClone);
      document.body.appendChild(renderStage);

      const canvas = await html2canvas(cardClone, {
        backgroundColor: null,
        scale: 3,
        width: cardElement.offsetWidth,
        height: cardElement.offsetHeight,
        onclone: (clonedDocument) => {
          const stage = clonedDocument.getElementById('kta-pdf-render-stage');
          if (stage) {
            stage.style.opacity = '1';
            stage.style.zIndex = 'auto';
          }
        },
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 54],
        compress: true,
      });
      pdf.setFillColor(2, 6, 23);
      pdf.rect(0, 0, 85.6, 54, 'F');
      pdf.addImage(canvas, 'PNG', 0, 0, 85.6, 54);

      const safeMemberId = (cardData.memberId || activeMember.nim).replace(/[^a-z0-9_-]/gi, '-');
      pdf.save(`KTA-RESMI-MATARATU-${safeMemberId}.pdf`);
      soundManager.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#38BDF8', '#DC2626', '#84CC16'],
      });
    } catch (error) {
      console.error('Gagal membuat PDF KTA:', error);
      const reason = error instanceof Error ? ` (${error.message})` : '';
      setDownloadError(`PDF KTA gagal dibuat. Silakan coba lagi${reason}`);
    } finally {
      renderStage.remove();
      setIsDownloading(false);
    }
  };

  return (
    <section id="kta-generator" className="py-20 bg-slate-950 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
            <span>Sistem Otentikasi Keanggotaan</span>
            <span aria-hidden="true">·</span>
            <span>KTA Holografik Digital</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Kartu Tanda Anggota (KTA) Digital
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Sistem penerbitan identitas resmi terenkripsi untuk seluruh kader dan pengurus Himpunan Mahasiswa MATARATU.
            Untuk menjaga keabsahan identitas kader, pembuatan KTA resmi hanya dapat diakses oleh anggota yang telah terdaftar.
          </p>
        </div>

        {/* Verification Status Banner if logged in */}
        {activeMember && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                  Keanggotaan Terverifikasi Resmi
                </div>
                <div className="text-sm font-bold text-white">
                  {activeMember.fullName} ({activeMember.nim}) · {activeMember.division}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              title="Keluar dari akun KTA ini untuk verifikasi anggota lain"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Ganti / Kunci Akun</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Holographic Card Viewport (with Lock overlay if not verified) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div 
              className="perspective-1000 w-full max-w-[480px] h-[300px] sm:h-[310px] select-none cursor-pointer relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={activeMember ? handleFlip : undefined}
            >
              <div 
                ref={cardRef}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className={`transform-style-3d relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border ${
                  activeMember ? 'border-amber-500/40' : 'border-slate-800'
                }`}
              >
                
                {/* FRONT FACE */}
                <div 
                  className={`backface-hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 p-6 flex flex-col justify-between overflow-hidden ${
                    !activeMember ? 'opacity-40 grayscale-[40%]' : ''
                  }`}
                >
                  {/* Holographic Sheen Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/10 to-transparent pointer-events-none opacity-70"
                    style={{
                      transform: `translate(${rotateY * 2}px, ${rotateX * 2}px)`,
                    }}
                  />

                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <MataratuLogo className="w-10 h-10 shrink-0 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                      <div>
                        <div className="font-cinzel text-xs font-bold text-amber-300 tracking-wider uppercase">
                          Himpunan MATARATU
                        </div>
                        <div className="text-[10px] text-slate-300">Teknik Pertambangan Batubara</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-amber-400/90 uppercase tracking-wider">STATUS RESMI</div>
                      <div className={`text-xs font-semibold ${activeMember ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {activeMember ? 'TERVERIFIKASI' : 'BELUM AKTIF'}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Member Name & Division */}
                  <div className="my-auto relative z-10">
                    <div className="text-[11px] text-amber-400 font-medium tracking-wide">
                      {cardData.role} · {cardData.division}
                    </div>
                    <div className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide truncate mt-0.5">
                      {cardData.fullName || 'Nama Lengkap Anggota'}
                    </div>
                    <div className="text-xs text-slate-300 truncate mt-1">
                      Teknik Pertambangan Batubara · Politeknik Akamigas Palembang
                    </div>
                  </div>

                  {/* Bottom: ID, Generation & Micro QR */}
                  <div className="flex items-end justify-between pt-3 border-t border-amber-900/40 relative z-10">
                    <div>
                      <div className="text-[10px] text-slate-400">ID ANGGOTA / NIM</div>
                      <div className="font-mono text-sm font-bold text-amber-300 tracking-wider">
                        {cardData.memberId}
                      </div>
                    </div>

                    <div className="text-center hidden sm:block">
                      <div className="text-[10px] text-slate-400">ANGKATAN</div>
                      <div className="text-xs font-medium text-slate-200">
                        {cardData.generation}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white">
                        <QrCode className="w-5 h-5 text-amber-300" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* BACK FACE (Rotated 180deg) */}
                <div 
                  style={{ transform: 'rotateY(180deg)' }}
                  className="backface-hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 flex flex-col justify-between border border-amber-500/30 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-cinzel text-xs font-bold text-amber-300">PAKTA INTEGRITAS KSATRIA TAMBANG</span>
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed italic text-center px-2">
                    "Setiap anggota MATARATU berkomitmen menjaga muruah almamater Teknik Pertambangan Batubara, 
                    menjunjung tinggi keselamatan kerja (K3), solidaritas kekeluargaan, dan kebermanfaatan bagi masyarakat."
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <div className="text-slate-400">Sekretariat Jenderal:</div>
                      <div className="text-slate-200 font-medium">mataratu@akamigaspalembang.ac.id</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400">Masa Berlaku:</div>
                      <div className="text-amber-300 font-semibold">Aktif Seumur Hidup</div>
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-500 text-center">
                    Klik kartu lagi untuk membalik ke tampilan depan
                  </div>
                </div>

              </div>

              {/* Locked Glass Shield when not registered/logged in */}
              {!activeMember && (
                <div className="absolute inset-0 rounded-2xl bg-slate-950/75 backdrop-blur-sm border border-amber-500/30 flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="p-3.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 mb-3 shadow-[0_0_20px_rgba(245,197,66,0.3)]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-white mb-1">
                    Akses KTA Terkunci
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-4">
                    KTA resmi hanya dapat diterbitkan bagi anggota yang sudah mendaftar dalam basis data resmi MATARATU.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playChime();
                      onOpenJoinModal();
                    }}
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all shadow-[0_0_15px_rgba(245,197,66,0.3)] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Daftar Jadi Anggota Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Helper Bar */}
            {activeMember && (
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-400">
                <button
                  onClick={handleFlip}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Balik Kartu Identitas</span>
                </button>

                <button
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                  className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isDownloading ? (
                    <span>Membuat PDF...</span>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh KTA PDF</span>
                    </>
                  )}
                </button>
                {downloadError && (
                  <p role="alert" className="text-xs text-red-400">
                    {downloadError}
                  </p>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Verification Box (if locked) OR Card Customizer (if verified) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            
            {!activeMember ? (
              /* SECURE VERIFICATION PORTAL GATE */
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white">
                      Verifikasi Keanggotaan MATARATU
                    </h3>
                    <p className="text-xs text-slate-400">
                      Otentikasi khusus kader Teknik Pertambangan Batubara
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Agar tidak sembarang orang dapat mencetak KTA palsu, masukkan <strong>NIM</strong> atau <strong>Kode Registrasi</strong> yang Anda peroleh saat pendaftaran.
                </p>

                {/* Form Verifikasi */}
                <form onSubmit={handleVerifySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      NIM Mahasiswa atau Kode Registrasi
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 24/519800/TPB atau MTR-REG-XXXXXX"
                      value={verifyInput}
                      onChange={(e) => {
                        setVerifyInput(e.target.value);
                        setVerifyError(null);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {verifyError && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-300 leading-relaxed">
                      {verifyError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,197,66,0.25)]"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Verifikasi & Buka KTA Saya</span>
                  </button>
                </form>

                {/* Quick Demo Test Button */}
                <div className="pt-4 border-t border-slate-800 text-center space-y-2">
                  <div className="text-[11px] text-slate-400">Ingin mencoba pengujian verifikasi instan?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const memberList = getEffectiveMembers();
                        setVerifyInput('2404057');
                        const m = memberList.find((x) => x.npm === '2404057');
                        if (m) {
                          authenticateMember({
                            fullName: m.name,
                            nim: m.npm,
                            email: `${m.npm}@akamigaspalembang.ac.id`,
                            phone: '0812XXXXXXXX',
                            university: 'Politeknik Akamigas Palembang',
                            major: `Teknik Pertambangan Batubara (${m.kelas})`,
                            division: m.departemen,
                            regCode: `MTR-2026-${m.npm.slice(-4)}`,
                            registeredAt: 'SK Periode 2026-2027',
                          });
                        }
                      }}
                      className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[10px] text-amber-300 font-medium transition-colors cursor-pointer truncate"
                    >
                      ⚡ Uji NPM: 2404057 (Ketua)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const memberList = getEffectiveMembers();
                        setVerifyInput('2404085');
                        const m = memberList.find((x) => x.npm === '2404085');
                        if (m) {
                          authenticateMember({
                            fullName: m.name,
                            nim: m.npm,
                            email: `${m.npm}@akamigaspalembang.ac.id`,
                            phone: '0812XXXXXXXX',
                            university: 'Politeknik Akamigas Palembang',
                            major: `Teknik Pertambangan Batubara (${m.kelas})`,
                            division: m.departemen,
                            regCode: `MTR-2026-${m.npm.slice(-4)}`,
                            registeredAt: 'SK Periode 2026-2027',
                          });
                        }
                      }}
                      className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[10px] text-sky-300 font-medium transition-colors cursor-pointer truncate"
                    >
                      ⚡ Uji NPM: 2404085 (Wakil)
                    </button>
                  </div>
                </div>

                {/* Belum terdaftar prompt */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-slate-300 font-medium mb-1.5">
                    Belum Terdaftar sebagai Anggota?
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Isi formulir penerimaan kader MATARATU untuk memperoleh hak akses KTA resmi.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playChime();
                      onOpenJoinModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-600 transition-colors cursor-pointer"
                  >
                    Buka Formulir Pendaftaran Anggota
                  </button>
                </div>

              </div>
            ) : (
              /* CUSTOMIZER FOR AUTHENTICATED MEMBER */
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Kustomisasi KTA Terverifikasi</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Identitas resmi Anda telah terverifikasi. Anda dapat menyesuaikan tampilan peran atau mengunduh sertifikat KTA.
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Nama Lengkap (Terkunci)</label>
                    <input
                      type="text"
                      disabled
                      value={cardData.fullName}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1">ID / NIM Terdaftar</label>
                      <input
                        type="text"
                        disabled
                        value={cardData.memberId}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono text-xs cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-300 mb-1">Angkatan / Tahun</label>
                      <input
                        type="text"
                        value={cardData.generation}
                        onChange={(e) => setCardData({ ...cardData, generation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Program Studi & Perguruan Tinggi</label>
                    <input
                      type="text"
                      disabled
                      value={`${cardData.faculty} (Akamigas)`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-300 mb-1">Peran / Jabatan</label>
                      <select
                        value={cardData.role}
                        onChange={(e) => setCardData({ ...cardData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
                      >
                        <option value="Kader Tambang">Kader Tambang</option>
                        <option value="Anggota Aktif">Anggota Aktif</option>
                        <option value="Pengurus Harian">Pengurus Harian</option>
                        <option value="Ketua / Wakil">Ketua / Wakil Ketua</option>
                        <option value="Alumni Batubara">Alumni Batubara</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-300 mb-1">Divisi Terdaftar</label>
                      <select
                        value={cardData.division}
                        onChange={(e) => setCardData({ ...cardData, division: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
                      >
                        <option value="Divisi Humas">Divisi Humas</option>
                        <option value="Divisi Infokom">Divisi Infokom</option>
                        <option value="Divisi Kewirausahaan (KWU)">Divisi Kewirausahaan (KWU)</option>
                        <option value="Divisi Olahraga">Divisi Olahraga</option>
                        <option value="Divisi Seni & Kerohanian">Divisi Seni & Kerohanian</option>
                        <option value="BPH Presidium">BPH Presidium</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Terhubung ke Basis Data MATARATU</span>
                  </span>

                  <button
                    onClick={handleDownloadCard}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh KTA</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
