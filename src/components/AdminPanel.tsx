import React, { useEffect, useMemo, useState } from 'react';
import { Lock, Shield, UserCog, Plus, Trash2, RotateCcw, LogOut } from 'lucide-react';
import { getEffectiveMembers, saveEffectiveMembers, MemberRecord } from '../data/membersData';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'mataratu123';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm = {
  name: '',
  npm: '',
  kelas: 'TPB 3A',
  departemen: 'Humas',
  role: 'Anggota' as MemberRecord['role'],
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('mataratu_admin_session') === 'true';
  });
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [members, setMembers] = useState<MemberRecord[]>(() => getEffectiveMembers());
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMembers(getEffectiveMembers());
    }
  }, [isOpen]);

  const totalMembers = useMemo(() => members.length, [members]);

  const syncMembers = (nextMembers: MemberRecord[]) => {
    const normalizedMembers = nextMembers.map((member, index) => ({
      ...member,
      no: index + 1,
    }));

    setMembers(normalizedMembers);
    saveEffectiveMembers(normalizedMembers);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setLoginError('Username atau password salah.');
      return;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('mataratu_admin_session', 'true');
    }
    setIsLoggedIn(true);
    setLoginError('');
    setPassword('');
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('mataratu_admin_session');
    }
    setIsLoggedIn(false);
    setPassword('');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const npm = form.npm.trim();
    if (!name || !npm) {
      setNotice('Nama dan NIM wajib diisi.');
      return;
    }

    const nextMember: MemberRecord = {
      no: members.length + 1,
      name: name.toUpperCase(),
      npm,
      kelas: form.kelas,
      departemen: form.departemen,
      role: form.role,
    };

    const nextMembers = [...members, nextMember];
    syncMembers(nextMembers);
    setForm(emptyForm);
    setNotice('Anggota baru berhasil ditambahkan.');
  };

  const handleRemoveMember = (npm: string) => {
    const nextMembers = members.filter((member) => member.npm !== npm);
    syncMembers(nextMembers);
    setNotice('Anggota berhasil dihapus.');
  };

  const handleResetData = () => {
    const keys = [
      'mataratu_poll_options',
      'mataratu_poll_has_voted',
      'mataratu_poll_selected_option',
      'mataratu_aspirations',
    ];

    keys.forEach((key) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('mataratu-data-reset'));
    }

    setNotice('Data polling dan aspirasi berhasil direset.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-amber-500/40 bg-slate-900 p-5 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white cursor-pointer"
          aria-label="Tutup panel admin"
        >
          ✕
        </button>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto py-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="rounded-full border border-amber-500/40 bg-amber-500/10 p-3 text-amber-300">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400">Admin Area</div>
                <h3 className="font-cinzel text-2xl font-bold text-white">Login Panel</h3>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {loginError && <div className="text-red-400 text-[11px]">{loginError}</div>}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-xs font-semibold text-slate-950 shadow-[0_0_20px_rgba(245,197,66,0.25)] cursor-pointer"
              >
                Masuk ke Panel Admin
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-amber-500/40 bg-amber-500/10 p-2 text-amber-300">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400">Panel Admin</div>
                  <h3 className="font-cinzel text-xl font-bold text-white">Kelola Anggota & Data</h3>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-[11px] font-medium text-slate-300 hover:border-amber-500/40 hover:text-amber-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1.8fr] gap-6">
              <form onSubmit={handleAddMember} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                  <UserCog className="w-4 h-4" />
                  Tambah Anggota Baru
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">Nama Lengkap</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Nama sesuai KTM"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">NIM</label>
                  <input
                    value={form.npm}
                    onChange={(e) => setForm({ ...form, npm: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Contoh: 2404057"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">Kelas</label>
                    <input
                      value={form.kelas}
                      onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">Role</label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value as MemberRecord['role'] })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Ketua">Ketua</option>
                      <option value="Wakil">Wakil</option>
                      <option value="Sekretaris">Sekretaris</option>
                      <option value="Bendahara">Bendahara</option>
                      <option value="PJ">PJ</option>
                      <option value="Anggota">Anggota</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">Departemen</label>
                  <select
                    value={form.departemen}
                    onChange={(e) => setForm({ ...form, departemen: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Himpunan">Himpunan</option>
                    <option value="PSDM">PSDM</option>
                    <option value="Humas">Humas</option>
                    <option value="Kesenian">Kesenian</option>
                    <option value="Bisnis Kreatif">Bisnis Kreatif</option>
                    <option value="Media Kreatif">Media Kreatif</option>
                    <option value="Kerohanian">Kerohanian</option>
                    <option value="Olahraga">Olahraga</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(emptyForm)}
                    className="rounded-xl border border-slate-700 px-3 py-2 text-[11px] font-medium text-slate-300 cursor-pointer"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Simpan Anggota
                  </button>
                </div>
              </form>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-amber-300">Daftar Anggota Saat Ini</div>
                  <div className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-200">
                    {totalMembers} anggota
                  </div>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
                  {members.map((member) => (
                    <div key={`${member.npm}-${member.name}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-[11px]">
                      <div>
                        <div className="font-semibold text-white">{member.name}</div>
                        <div className="text-slate-400">{member.npm} · {member.kelas} · {member.departemen}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.npm)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-red-300 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                  <button
                    type="button"
                    onClick={handleResetData}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 text-[11px] font-medium text-amber-200 hover:bg-amber-500/20 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Data Aspirasi & Poll
                  </button>
                </div>
              </div>
            </div>

            {notice && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-300">{notice}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
