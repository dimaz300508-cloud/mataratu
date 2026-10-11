import React, { useEffect, useState } from 'react';
import { PollOption } from '../types';
import { soundManager } from '../utils/audio';
import { Vote, Send, MessageSquare, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_POLL_OPTIONS: PollOption[] = [
  { id: '1', label: 'Penguatan Riset, Publikasi Ilmiah & Akses Beasiswa', votes: 342 },
  { id: '2', label: 'Aksi Nyata Bakti Sosial & Pelestarian Desa Adat Nusantara', votes: 418 },
  { id: '3', label: 'Pelatihan Kepemimpinan, Diplomasi & Soft Skills Industri', votes: 289 },
  { id: '4', label: 'Inkubasi Bisnis Mahasiswa & Inkubator Startup Mandiri', votes: 215 },
];

const DEFAULT_ASPIRATIONS = [
  {
    name: 'Rian Hendrawan (Angkatan 2024)',
    category: 'Akademik',
    text: 'Mohon diadakan sesi bimbingan proposal PKM dan mentoring beasiswa luar negeri secara intensif per departemen.',
    date: 'Kemarin, 14:20',
  },
  {
    name: 'Nabila Syahrani (Angkatan 2025)',
    category: 'Sosial',
    text: 'Usul kolaborasi pengabdian dengan paguyuban kedaerahan lain agar gaung Mataratu semakin meluas di tingkat nasional.',
    date: '2 hari lalu',
  },
];

const getStoredValue = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const AspirationPoll: React.FC = () => {
  const [options, setOptions] = useState<PollOption[]>(() => getStoredValue('mataratu_poll_options', INITIAL_POLL_OPTIONS));
  const [hasVoted, setHasVoted] = useState<boolean>(() => getStoredValue('mataratu_poll_has_voted', false));
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(() => getStoredValue('mataratu_poll_selected_option', null));

  // Aspiration Form State
  const [aspirantName, setAspirantName] = useState('');
  const [aspirantEmail, setAspirantEmail] = useState('');
  const [aspirationCategory, setAspirationCategory] = useState('Kaderisasi');
  const [aspirationText, setAspirationText] = useState('');
  const [aspirationsList, setAspirationsList] = useState<Array<{ name: string; category: string; text: string; date: string }>>(() =>
    getStoredValue('mataratu_aspirations', DEFAULT_ASPIRATIONS)
  );
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('mataratu_poll_options', JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    window.localStorage.setItem('mataratu_poll_has_voted', JSON.stringify(hasVoted));
  }, [hasVoted]);

  useEffect(() => {
    window.localStorage.setItem('mataratu_poll_selected_option', JSON.stringify(selectedOptionId));
  }, [selectedOptionId]);

  useEffect(() => {
    window.localStorage.setItem('mataratu_aspirations', JSON.stringify(aspirationsList));
  }, [aspirationsList]);

  useEffect(() => {
    const handleReset = () => {
      setOptions(INITIAL_POLL_OPTIONS);
      setHasVoted(false);
      setSelectedOptionId(null);
      setAspirationsList(DEFAULT_ASPIRATIONS);
      setAspirationText('');
      setAspirantName('');
      setAspirantEmail('');
      setSubmittedFeedback(false);
    };

    window.addEventListener('mataratu-data-reset', handleReset);
    return () => window.removeEventListener('mataratu-data-reset', handleReset);
  }, []);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id: string) => {
    if (hasVoted) return;
    soundManager.playClick();
    setSelectedOptionId(id);
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setHasVoted(true);
  };

  const handleAspirationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aspirationText.trim()) return;

    soundManager.playSuccess();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#F5C542', '#38BDF8'],
    });

    const newEntry = {
      name: aspirantName.trim() || 'Ksatria Anonim',
      category: aspirationCategory,
      text: aspirationText,
      date: 'Baru saja',
    };

    setAspirationsList([newEntry, ...aspirationsList]);
    setSubmittedFeedback(true);
    setAspirationText('');
    setAspirantName('');
    setAspirantEmail('');
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  return (
    <section id="aspirasi" className="py-20 bg-slate-950 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
            <span>Demokrasi Mahasiswa & Suara Kolektif</span>
            <span aria-hidden="true">·</span>
            <span>Pojok Aspirasi</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Jajak Pendapat & Kotak Saran Mataratu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Setiap suara Anda adalah kompas bagi arah perjuangan organisasi. Ikuti jajak pendapat langsung 
            dan sampaikan aspirasi konstruktif kepada Dewan Presidium.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Live Poll */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Vote className="w-4 h-4" />
                <span>Polling Berjalan</span>
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                Total Partisipan: <strong className="text-white">{totalVotes}</strong> Suara
              </span>
            </div>

            <h3 className="font-cinzel text-lg font-bold text-white mb-6">
              "Apa Prioritas Program Mataratu yang Paling Mendesak Periode Ini?"
            </h3>

            <div className="space-y-4">
              {options.map((option) => {
                const percentage = Math.round((option.votes / totalVotes) * 100);
                const isSelected = selectedOptionId === option.id;

                return (
                  <div
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Fill background bar based on percentage */}
                    <div
                      className="absolute inset-y-0 left-0 bg-amber-500/15 pointer-events-none transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm font-medium text-slate-200">
                        {option.label}
                      </span>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                          {percentage}%
                        </span>
                        <div className="text-[10px] text-slate-400 tabular-nums">
                          {option.votes} suara
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>{hasVoted ? '✓ Suara Anda telah tercatat secara anonim' : 'Klik salah satu opsi untuk memberikan suara'}</span>
              <span className="text-[10px] text-slate-500">Diverifikasi Sistem</span>
            </div>
          </div>

          {/* Right Column: Feedback Box / Kotak Aspirasi */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Sampaikan Kritik, Saran & Ide Gagasan
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Aspirasi Anda akan langsung diteruskan pada agenda rapat evaluasi Dewan Presidium.
            </p>

            <form onSubmit={handleAspirationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nama (Opsional / Anonim)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Anda atau kosongkan"
                    value={aspirantName}
                    onChange={(e) => setAspirantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Kategori Aspirasi
                  </label>
                  <select
                    value={aspirationCategory}
                    onChange={(e) => setAspirationCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Kaderisasi">Kaderisasi & Kepengurusan</option>
                    <option value="Akademik">Akademik & Riset</option>
                    <option value="Sosial">Pengabdian & Sosial</option>
                    <option value="Fasilitas">Sekretariat & Fasilitas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Isi Pesan / Ide Gagasan *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tuliskan aspirasi, kritik membangun, atau gagasan inovatif Anda..."
                  value={aspirationText}
                  onChange={(e) => setAspirationText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {submittedFeedback ? (
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4" />
                    <span>Aspirasi Anda berhasil dikirim!</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Kerahasiaan identitas terjamin
                  </span>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirimkan Aspirasi</span>
                </button>
              </div>
            </form>

            {/* Recent Aspirations Feed */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Aspirasi Terkini</span>
              </h4>
              <div className="space-y-3">
                {aspirationsList.slice(0, 2).map((asp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-semibold text-amber-300/90">{asp.name}</span>
                      <span className="text-[10px]">{asp.date}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{asp.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
