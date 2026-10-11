import React from 'react';
import { MataratuLogo } from './MataratuLogo';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminPanel }) => {
  return (
    <footer className="w-full border-t border-amber-900/30 bg-black text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Identity */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <MataratuLogo className="w-10 h-10 shrink-0 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            <div>
              <div className="font-cinzel text-xl font-bold tracking-wider text-amber-300">
                Himpunan MATARATU
              </div>
              <div className="text-xs text-slate-300">
                Mahasiswa Tambang Batubara Bersatu (Est. 2009)
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Himpunan Mahasiswa Program Studi Teknik Pertambangan Batubara Politeknik Akamigas Palembang. 
            Membentuk insan tambang yang mandiri, bermartabat, berkualitas, dan berwawasan lingkungan hidup.
          </p>

          <div className="pt-1 flex flex-col gap-2">
            <a 
              href="https://linktr.ee/Mataratu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Portal Linktree Resmi MATARATU</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.instagram.com/hmpsmataratu?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span>Instagram: @hmpsmataratu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Links (NO '3D' in titles) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Navigasi Portal
          </div>
          <ul className="space-y-2 text-xs">
            <li><a href="#filosofi" className="hover:text-amber-300 transition-colors">Visi & Tiga Misi Utama</a></li>
            <li><a href="#lambang-resmi" className="hover:text-amber-300 transition-colors">Makna Lambang Resmi</a></li>
            <li><a href="#struktur" className="hover:text-amber-300 transition-colors">Struktur Kepengurusan</a></li>
            <li><a href="#program-kerja" className="hover:text-amber-300 transition-colors">Program & Ekskursi Tambang</a></li>
            <li><a href="#aspirasi" className="hover:text-amber-300 transition-colors">Kotak Suara Aspirasi</a></li>
          </ul>
        </div>

        {/* Contact & Secretariat */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Sekretariat Himpunan
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Program Studi Teknik Pertambangan Batubara<br />
            Politeknik Akamigas Palembang<br />
            Komplek Pertamina Plaju, Jl. Kebon Jahe, Palembang, Sumatera Selatan
          </p>
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
            Wadah Silaturahmi: Mahasiswa Aktif · Dosen Pembina · Ikatan Alumni Batubara
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          © 2009–{new Date().getFullYear()} MATARATU - Teknik Pertambangan Batubara Politeknik Akamigas Palembang.
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <span>Solidaritas Tambang Batubara</span>
          <span aria-hidden="true">·</span>
          <span>Good Mining Practice</span>
          {onOpenAdminPanel && (
            <button
              type="button"
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-amber-200 hover:bg-amber-500/20 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Login Admin
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
