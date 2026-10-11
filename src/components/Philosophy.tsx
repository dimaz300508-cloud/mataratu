import React from 'react';
import { Compass, BookOpen, Users, ExternalLink, HardHat, Pickaxe, Flame, CheckCircle2 } from 'lucide-react';
import { MataratuLogo } from './MataratuLogo';

export const Philosophy: React.FC = () => {
  return (
    <section id="filosofi" className="py-20 bg-slate-950 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
            <span>Landasan Konstitusi & Identitas Himpunan</span>
            <span aria-hidden="true">·</span>
            <span>Teknik Pertambangan Batubara</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Visi, Misi & Makna Lambang MATARATU
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Didirikan pada 9 Januari 2009 di Politeknik Akamigas Palembang, MATARATU (Mahasiswa Tambang Batubara Bersatu) 
            berdiri sebagai rumah pergerakan, intelektualitas, dan persaudaraan mahasiswa tambang batubara.
          </p>
        </div>

        {/* 2-Column Split: The Official Clean Logo Breakdown & Vision/Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left: The Official Logo Showcase (No White BG) */}
          <div className="lg:col-span-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[0_0_35px_rgba(245,158,11,0.12)]">
            
            <div className="text-center py-4">
              <div className="relative inline-block my-2">
                {/* Glowing aura background */}
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
                {/* Clean Transparent Logo Vector */}
                <MataratuLogo className="w-56 h-56 sm:w-64 sm:h-64 mx-auto relative z-10 drop-shadow-[0_0_25px_rgba(250,204,21,0.5)] transform hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-amber-300 mt-2">
                Lambang Resmi MATARATU
              </div>
              <div className="text-xs text-slate-400">
                Teknik Pertambangan Batubara · Akamigas Palembang
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                Identitas Mahasiswa Tambang Batubara Bersatu
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Lambang resmi MATARATU mencerminkan sinergi antara sains pertambangan modern, 
                keberanian di medan lapangan, kepedulian lingkungan hidup, dan persaudaraan tanpa batas.
              </p>
              
              {/* Links to Official Linktree & Instagram */}
              <div className="space-y-2.5">
                <a
                  href="https://linktr.ee/Mataratu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 hover:from-amber-500/30 hover:to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                >
                  <span>Buka Linktree Resmi MATARATU</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.instagram.com/hmpsmataratu?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-pink-500/50 text-slate-200 hover:text-pink-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram Resmi @hmpsmataratu</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: Visi, 3 Misi Utama, & Tujuan */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Visi Callout from Scribd */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900/70 to-slate-900/50 p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-amber-200">
                  Visi MATARATU
                </h4>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-amber-500/60 pl-4 py-1">
                "Menjadi organisasi himpunan mahasiswa jurusan yang mandiri, bermartabat, dan berkualitas bagi mahasiswa/i Teknik Pertambangan Batubara Politeknik Akamigas Palembang dalam membentuk karakter diri, serta menjadi wadah komunikasi dan silaturahmi antara dosen, mahasiswa/i, dan alumni prodi Teknik Pertambangan Batubara Politeknik Akamigas Palembang."
              </p>
            </div>

            {/* Misi Cards (3 Official Missions from Scribd Presentation) */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <HardHat className="w-4 h-4" />
                <span>Tiga Misi Utama MATARATU</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-all flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Pengembangan & Peningkatan Potensi Diri</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mengembangkan dan meningkatkan potensi diri serta keahlian setiap anggota MATARATU di bidang keilmuan pertambangan, kepemimpinan, dan etika profesi.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-all flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Realisasi Ide & Aspirasi Anggota</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mewujudkan ide-ide, gagasan inovatif, dan aspirasi anggota MATARATU ke dalam karya nyata dan program kerja yang berdampak langsung.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-all flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Silaturahmi Mahasiswa, Dosen & Alumni</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Menjalin komunikasi dan silaturahmi yang kuat dan harmonis antara dosen, mahasiswa/i, serta alumni prodi Teknik Pertambangan Batubara Politeknik Akamigas Palembang.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Breakdown: Makna Tiap Elemen Lambang MATARATU */}
        <div className="mt-12 p-8 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2 mb-6">
            <Pickaxe className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-xl font-bold text-white">
              Makna & Filosofi Elemen Lambang MATARATU
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-amber-300 mb-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                <span>8 Bilah Gerigi Mesin Tambang</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Melambangkan roda putar bucket-wheel mesin industri tambang modern, etos kerja pantang menyerah, dan energi surya yang senantiasa menerangi gerak langkah mahasiswa.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-rose-400 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
                <span>Warna Merah & Lingkaran Pelindung</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Melambangkan keberanian, keteguhan hati di medan lapangan tambang yang keras, serta komitmen ketat pada Keselamatan dan Kesehatan Kerja (K3 Pertambangan).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-sky-300 mb-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
                <span>Pita Melingkar Biru Muda</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Membawa teks "TEKNIK PERTAMBANGAN BATUBARA - MATARATU", melambangkan kedamaian, kejernihan berpikir ilmiah, dan kekeluargaan yang sejuk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-2">
                <span className="w-3 h-3 rounded-full bg-lime-500 inline-block" />
                <span>Lingkaran Dalam Warna Hijau</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Melambangkan komitmen reklamasi pascatambang, pelestarian lingkungan hidup hayati, serta penerapan prinsip <em>Good Mining Practice</em> dan <em>Green Mining</em>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-rose-400 mb-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span>Huruf Stylized 'TPB' Shovel Tambang</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Singkatan Teknik Pertambangan Batubara yang dirancang menyerupai alat berat shovel/excavator, merepresentasikan kesiapan teknis mengolah sumber daya bumi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-slate-200 mb-2">
                <span className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700 inline-block" />
                <span>Lapisan Hitam Batubara</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Representasi dari "Emas Hitam" (batubara) sebagai energi strategis nusantara yang menjadi fokus keilmuan, riset eksplorasi, dan eksploitasi mineral.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
