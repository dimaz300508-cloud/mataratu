import { useState } from 'react';
import { Header } from './components/Header';
import { Hero3D } from './components/Hero3D';
import { Philosophy } from './components/Philosophy';
import { Organization3D } from './components/Organization3D';
import { ProgramsTimeline } from './components/ProgramsTimeline';
import { AspirationPoll } from './components/AspirationPoll';
import { JoinModal } from './components/JoinModal';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { RegisteredMember } from './types';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [verifiedMember, setVerifiedMember] = useState<RegisteredMember | null>(() => {
    try {
      const saved = localStorage.getItem('mataratu_registered_member');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Header */}
      <Header
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Interactive 3D Emblem Hero */}
        <Hero3D onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* Filosofi & Makna Lambang */}
        <Philosophy />

        {/* Struktur Organisasi Bagan Interaktif */}
        <Organization3D />

        {/* Program Kerja & Ekskursi Tambang */}
        <ProgramsTimeline />

        {/* Pojok Suara & Kotak Aspirasi */}
        <AspirationPoll />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenAdminPanel={() => setIsAdminPanelOpen(true)} />

      {/* Recruitment Registration Modal */}
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)}
        onRegisterSuccess={(member) => setVerifiedMember(member)}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}
