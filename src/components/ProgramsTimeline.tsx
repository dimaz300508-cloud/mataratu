import React, { useState } from 'react';
import { ProgramItem } from '../types';
import { soundManager } from '../utils/audio';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

import summitImg from '../assets/images/mataratu_activity_summit_1791553719793.jpeg';
import socialImg from '../assets/images/mataratu_social_cultural_1791553732138.jpeg';
import sambutanMabaImg from '../assets/images/sambutan_maba_mataratu_1791559256979.jpeg';

const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'summit-2026',
    title: 'Finalis Bujang Gadis Mataratu 2025',
    category: 'Akademik',
    date: '14 November 2025',
    location: 'Politeknik Akamigas Palembang',
    status: 'Akan Datang',
    summary: 'Kegiatan FINALIS BUJANG GADIS MATARATU 2025. Yang di adakan setiap 1 tahun sekali oleh HMPS MATARATU Politeknik Akamigas Palembang. Kegiatan ini bertujuan untuk mencari mahasiswa/i terbaik yang memiliki bakat, prestasi, dan kepribadian yang baik untuk menjadi duta Teknik Pertambangan Batubara.',
    image: summitImg,
    instagramUrl: 'https://www.instagram.com/hmpsmataratu/p/DRJvS1KEthT/',
    targetParticipants: 0,
    registeredCount: 0,
  },
  {
    id: 'bakti-desa-2026',
    title: 'Serah Terima Jabatan',
    category: 'Akademik',
    date: '14 Mei 2026',
    location: 'Politeknik Akamigas Palembang',
    status: 'Akan Datang',
    summary:'Selamat atas pelantikan Pengurus Baru HMPS Mataratu Politeknik Akamigas Palembang. ​Kami ucapkan terima kasih yang sebesar-besarnya kepada pengurus demisioner atas dedikasi dan kontribusinya. Kepada pengurus baru, selamat bertugas! Sambut tantangan baru dengan semangat juang yang tinggi. Kepalan tangan di foto ini adalah janji kami untuk terus maju bersama. ​Mari kita buat sejarah baru!',
    image: socialImg,
    instagramUrl: 'https://www.instagram.com/hmpsmataratu/p/DYUe7_mIKYj/',
    targetParticipants: 0,
    registeredCount: 0,
  },
  {
    id: 'sambutan-mahasiswa-baru',
    title: 'Sambutan Mahasiswa Baru',
    category: 'Sambutan Mahasiswa Baru',
    date: '3 Oktober 2025',
    location: 'Lapangan Politeknik Akamigas Palembang',
    status: 'Selesai',
    summary: 'Tradisi penyambutan dan kebersamaan mahasiswa baru Teknik Pertambangan Batubara di Lapangan Politeknik Akamigas Palembang, mempererat persaudaraan, solidaritas angkatan, dan penanaman jiwa korsa MATARATU.',
    image: sambutanMabaImg,
    instagramUrl: 'https://www.instagram.com/hmpsmataratu/p/DPXem4rj9lP/',
    targetParticipants: 0,
    registeredCount: 0,
  },
];

export const ProgramsTimeline: React.FC = () => {
  const [filter, setFilter] = useState<string>('Semua');

  const filteredPrograms = filter === 'Semua' 
    ? PROGRAMS_DATA 
    : PROGRAMS_DATA.filter((p) => p.category === filter);

  return (
    <section id="program-kerja" className="py-20 bg-slate-950 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
              <span>Dokumentasi Resmi & Agenda Kegiatan</span>
              <span aria-hidden="true">·</span>
              <span>HMPS MATARATU</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Program Kerja & Dokumentasi Lapangan
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Dokumentasi dan rencana agenda strategis keilmuan, kepemimpinan, dan kepedulian lingkungan hidup mahasiswa Teknik Pertambangan Batubara.
            </p>
          </div>

          {/* Social Instagram Channel & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/hmpsmataratu?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-pink-500/50 text-xs font-medium text-pink-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@hmpsmataratu</span>
            </a>

            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto">
              {['Semua', 'Akademik', 'Sosial', 'Sambutan Mahasiswa Baru'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playClick();
                    setFilter(cat);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    filter === cat
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Program Cards Grid (Clean: Foto, Keterangan & Link Instagram) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group shadow-lg"
            >
              <div>
                {/* Foto Kegiatan */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Kategori Badge Unboxed */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs font-semibold text-amber-300">
                    {program.category}
                  </div>
                </div>

                {/* Keterangan & Detail */}
                <div className="p-6">
                  {/* Waktu & Lokasi */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1 text-amber-300/90 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{program.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{program.location}</span>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {program.summary}
                  </p>
                </div>
              </div>

              {/* Link ke Postingan Instagram Resmi */}
              {program.instagramUrl && (
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-2">
                  <a
                    href={program.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:border-slate-700"
                  >
                    <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Buka Dokumentasi di Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
