import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { X, CheckCircle, ShieldCheck, Download, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MataratuLogo } from './MataratuLogo';
import { RegisteredMember } from '../types';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess?: (member: RegisteredMember) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    nim: '',
    email: '',
    phone: '',
    university: 'Politeknik Akamigas Palembang',
    major: 'Teknik Pertambangan Batubara',
    division1: 'Divisi Humas',
    division2: 'Divisi Infokom',
    motivation: '',
  });

  const [submittedData, setSubmittedData] = useState<{ regCode: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FACC15', '#38BDF8', '#DC2626', '#84CC16'],
    });

    const regCode = `MTR-REG-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedData({ regCode });

    const newMember: RegisteredMember = {
      fullName: formData.fullName,
      nim: formData.nim,
      email: formData.email,
      phone: formData.phone,
      university: formData.university,
      major: formData.major,
      division: formData.division1,
      regCode: regCode,
      registeredAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('mataratu_registered_member', JSON.stringify(newMember));
    } catch {
      // Ignore storage error
    }

    if (onRegisterSuccess) {
      onRegisterSuccess(newMember);
    }
  };

  const handleDownloadSlip = () => {
    soundManager.playClick();
    const receipt = {
      title: "BUKTI PENDAFTARAN ANGGOTA HIMPUNAN MATARATU",
      organization: "Mahasiswa Tambang Batubara Bersatu (MATARATU)",
      institution: "Politeknik Akamigas Palembang",
      registrationCode: submittedData?.regCode,
      name: formData.fullName,
      nim: formData.nim,
      university: formData.university,
      major: formData.major,
      primaryDivision: formData.division1,
      submissionTimestamp: new Date().toISOString(),
      instructions: "Harap simpan bukti pendaftaran ini untuk sesi verifikasi dan orientasi pengurus MATARATU."
    };
    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bukti-Pendaftaran-MATARATU-${submittedData?.regCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 my-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedData ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-4">
              <MataratuLogo className="w-10 h-10 shrink-0 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kaderisasi Mahasiswa Tambang Batubara</span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Formulir Pendaftaran MATARATU
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Lengkapi data diri Anda di bawah ini secara seksama. Menjadi bagian dari MATARATU adalah langkah nyata membina jiwa kepemimpinan, etika tambang berwawasan lingkungan, dan solidaritas mahasiswa Teknik Pertambangan Batubara Politeknik Akamigas Palembang.
            </p>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama sesuai KTM"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Nomor Induk Mahasiswa (NIM) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 24/519800/TPB"
                    value={formData.nim}
                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Email Aktif *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Perguruan Tinggi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Politeknik Akamigas Palembang"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Program Studi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Teknik Pertambangan Batubara"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Pilihan Divisi Utama *</label>
                  <select
                    value={formData.division1}
                    onChange={(e) => setFormData({ ...formData, division1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Divisi Humas">Divisi Humas</option>
                    <option value="Divisi Infokom">Divisi Infokom</option>
                    <option value="Divisi Kewirausahaan (KWU)">Divisi Kewirausahaan (KWU)</option>
                    <option value="Divisi Olahraga">Divisi Olahraga</option>
                    <option value="Divisi Seni & Kerohanian">Divisi Seni & Kerohanian</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Pilihan Divisi Kedua *</label>
                  <select
                    value={formData.division2}
                    onChange={(e) => setFormData({ ...formData, division2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Divisi Infokom">Divisi Infokom</option>
                    <option value="Divisi Humas">Divisi Humas</option>
                    <option value="Divisi Kewirausahaan (KWU)">Divisi Kewirausahaan (KWU)</option>
                    <option value="Divisi Olahraga">Divisi Olahraga</option>
                    <option value="Divisi Seni & Kerohanian">Divisi Seni & Kerohanian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Motivasi & Komitmen Singkat *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ceritakan motivasi Anda ingin berkontribusi di Himpunan Mahasiswa MATARATU..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

            </div>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl transition-all shadow-[0_0_20px_rgba(245,197,66,0.3)] cursor-pointer"
              >
                Kirim Pendaftaran
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              Pendaftaran Berhasil Diterima!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Terima kasih, <strong className="text-amber-300">{formData.fullName}</strong>. Data Anda telah tercatat 
              dalam basis data penerimaan kader MATARATU Teknik Pertambangan Batubara Politeknik Akamigas Palembang.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-amber-500/30 text-left mb-6 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Kode Registrasi:</span>
                <span className="font-mono font-bold text-amber-300">{submittedData.regCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NIM / Kampus:</span>
                <span className="text-white font-medium">{formData.nim} ({formData.university})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Program Studi:</span>
                <span className="text-amber-200 font-medium">{formData.major}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Divisi Pilihan:</span>
                <span className="text-amber-200 font-medium">{formData.division1}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Status Seleksi:</span>
                <span className="text-emerald-400 font-medium">Menunggu Verifikasi Pengurus</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-[0_0_15px_rgba(245,197,66,0.3)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Kembali ke Beranda</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadSlip}
                className="px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Unduh Bukti Registrasi (.json)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
