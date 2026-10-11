export interface Division {
  id: string;
  name: string;
  shortName: string;
  head: string;
  headTitle: string;
  description: string;
  membersCount: number;
  programs: string[];
  color: string;
  coordinate: [number, number, number];
}

export interface ProgramItem {
  id: string;
  title: string;
  category: 'Akademik' | 'Sosial' | 'Kebudayaan' | 'Kaderisasi' | 'Sambutan Mahasiswa Baru' | string;
  date: string;
  location: string;
  status: 'Akan Datang' | 'Sedang Berjalan' | 'Selesai';
  summary: string;
  image: string;
  instagramUrl?: string;
  targetParticipants: number;
  registeredCount: number;
}

export interface MemberCardData {
  fullName: string;
  memberId: string;
  faculty: string;
  generation: string;
  role: string;
  division: string;
  joinedDate: string;
}

export interface RegisteredMember {
  fullName: string;
  nim: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  division: string;
  regCode: string;
  registeredAt: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}
