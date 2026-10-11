export interface MemberRecord {
  no: number;
  name: string;
  npm: string;
  kelas: string;
  departemen: string;
  role: 'Ketua' | 'Wakil' | 'Sekretaris' | 'Bendahara' | 'PJ' | 'Anggota';
}

export interface DepartmentData {
  id: string;
  name: string;
  shortName: string;
  head: string;
  viceHead?: string;
  description: string;
  membersCount: number;
  color: string;
  coordinate: [number, number, number];
  members: MemberRecord[];
}

export const HMPS_MEMBERS: MemberRecord[] = [
  { no: 1, name: 'STEVEN AL WAHID', npm: '2404057', kelas: 'TPB 5B', departemen: 'Himpunan', role: 'Ketua' },
  { no: 2, name: 'M ALZAKY QUSHOYYI', npm: '2404085', kelas: 'TPB 5C', departemen: 'Himpunan', role: 'Wakil' },
  { no: 3, name: 'ZARIFAH YULIA FITRIANI', npm: '2404102', kelas: 'TPB 5C', departemen: 'Himpunan', role: 'Sekretaris' },
  { no: 4, name: 'NABILA SITORUS', npm: '2504112', kelas: 'TPB 3C', departemen: 'Himpunan', role: 'Sekretaris' },
  { no: 5, name: 'GITA RDISTYA CITRA', npm: '2404112', kelas: 'TPB 5C', departemen: 'Himpunan', role: 'Bendahara' },
  { no: 6, name: 'ANGGUN INTAN LESTARI', npm: '2504061', kelas: 'TPB 3B', departemen: 'Himpunan', role: 'Bendahara' },
  { no: 7, name: 'ARJUN DENI OKI PUTRA', npm: '2404029', kelas: 'TPB 5A', departemen: 'PSDM', role: 'Ketua' },
  { no: 8, name: 'DWI RAHMAWATI', npm: '2404103', kelas: 'TPB 5C', departemen: 'PSDM', role: 'Wakil' },
  { no: 9, name: 'MUHAMMAD FADHIL ABDURRAHMAN ALKAHFI', npm: '2504053', kelas: 'TPB 3B', departemen: 'PSDM', role: 'PJ' },
  { no: 10, name: 'FITRIA ANGGARAWATI', npm: '2504014', kelas: 'TPB 3A', departemen: 'PSDM', role: 'Anggota' },
  { no: 11, name: 'MUHAMMAD HAMDI', npm: '2504100', kelas: 'TPB 3C', departemen: 'PSDM', role: 'Anggota' },
  { no: 12, name: 'M. NABIL MIFTAHUL RAHMAT', npm: '2404067', kelas: 'TPB 5B', departemen: 'PSDM', role: 'Anggota' },
  { no: 13, name: 'YESYA SYAVIA GANDAWATI', npm: '2404035', kelas: 'TPB 5A', departemen: 'PSDM', role: 'Anggota' },
  { no: 14, name: 'MUHAMMAD PAREL ZIKRI', npm: '2504027', kelas: 'TPB 3A', departemen: 'PSDM', role: 'PJ' },
  { no: 15, name: 'AMANDA JULISKA SARI', npm: '2504106', kelas: 'TPB 3C', departemen: 'PSDM', role: 'Anggota' },
  { no: 16, name: 'GUSTI KOMANG NGURAH ANGGA WIJAYA', npm: '2504114', kelas: 'TPB 3C', departemen: 'PSDM', role: 'Anggota' },
  { no: 17, name: 'ARI ANDIKA', npm: '2404004', kelas: 'TPB 5A', departemen: 'PSDM', role: 'Anggota' },
  { no: 18, name: 'FARREL PERDINAND', npm: '2404089', kelas: 'TPB 5C', departemen: 'PSDM', role: 'Anggota' },
  { no: 19, name: 'TOMAS', npm: '2404180', kelas: 'TPB 5C', departemen: 'Humas', role: 'Ketua' },
  { no: 20, name: 'MUHAMMAD TAUFIQURRAHMAN', npm: '2404034', kelas: 'TPB 5A', departemen: 'Humas', role: 'Wakil' },
  { no: 21, name: 'REZA YUWANDI', npm: '2504019', kelas: 'TPB 3A', departemen: 'Humas', role: 'Anggota' },
  { no: 22, name: 'ODY MARWANSYAH', npm: '2504065', kelas: 'TPB 3B', departemen: 'Humas', role: 'Anggota' },
  { no: 23, name: 'ALIF SAFWAN FAJAR', npm: '2504058', kelas: 'TPB 3B', departemen: 'Humas', role: 'Anggota' },
  { no: 24, name: 'VINI OKTA SEMERU EFENDI', npm: '2504094', kelas: 'TPB 3C', departemen: 'Humas', role: 'Anggota' },
  { no: 25, name: 'MUHAMMAD GALUH JEGGY', npm: '2404007', kelas: 'TPB 5A', departemen: 'Humas', role: 'Anggota' },
  { no: 26, name: 'AMELIA ANGGELA', npm: '2404026', kelas: 'TPB 5A', departemen: 'Humas', role: 'Anggota' },
  { no: 27, name: 'YONATAN KURNIAWAN', npm: '2404062', kelas: 'TPB 5B', departemen: 'Kesenian', role: 'Ketua' },
  { no: 28, name: 'RIESTY ANJANI', npm: '2404017', kelas: 'TPB 5A', departemen: 'Kesenian', role: 'Wakil' },
  { no: 29, name: 'MUHAMMAD RIDWAN HAKIM ABDILLAH', npm: '2404115', kelas: 'TPB 5C', departemen: 'Kesenian', role: 'Anggota' },
  { no: 30, name: 'RISKHA RAHMADHANI', npm: '2404025', kelas: 'TPB 5A', departemen: 'Kesenian', role: 'Anggota' },
  { no: 31, name: 'WILDANIA SHAKILA AZHARI', npm: '2504111', kelas: 'TPB 3C', departemen: 'Kesenian', role: 'Anggota' },
  { no: 32, name: 'LODI AGESTIRA', npm: '2504040', kelas: 'TPB 3A', departemen: 'Kesenian', role: 'Anggota' },
  { no: 33, name: 'DINDA HARDIANTI', npm: '2504034', kelas: 'TPB 3A', departemen: 'Kesenian', role: 'Anggota' },
  { no: 34, name: 'REFI MARISKA', npm: '2504021', kelas: 'TPB 3A', departemen: 'Kesenian', role: 'Anggota' },
  { no: 35, name: 'REJA TRISNA DATA', npm: '2404031', kelas: 'TPB 5A', departemen: 'Bisnis Kreatif', role: 'Ketua' },
  { no: 36, name: 'RISKI HERMAWAN', npm: '2404056', kelas: 'TPB 5B', departemen: 'Bisnis Kreatif', role: 'Wakil' },
  { no: 37, name: 'RIYAN AL FARINDO', npm: '2404054', kelas: 'TPB 5B', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 38, name: 'RIKA ARYANI', npm: '2404024', kelas: 'TPB 5A', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 39, name: 'PUTRI KOMALA', npm: '2504082', kelas: 'TPB 3C', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 40, name: 'RONY ADI SUSENO', npm: '2504107', kelas: 'TPB 3C', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 41, name: 'DODI HERMAWAN', npm: '2504012', kelas: 'TPB 3A', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 42, name: 'FAJRI SYAHPUTRA', npm: '2504031', kelas: 'TPB 3A', departemen: 'Bisnis Kreatif', role: 'Anggota' },
  { no: 43, name: 'AHMAD BIMA KUSUMA', npm: '2404008', kelas: 'TPB 5A', departemen: 'Media Kreatif', role: 'Ketua' },
  { no: 44, name: 'MUHAMMAD ALIF', npm: '2404088', kelas: 'TPB 5C', departemen: 'Media Kreatif', role: 'Wakil' },
  { no: 45, name: 'SCERLY WINTASARI', npm: '2504054', kelas: 'TPB 3B', departemen: 'Media Kreatif', role: 'PJ' },
  { no: 46, name: 'NABILAH RATNA DUHITA AZARLAILA HERLAMBANG', npm: '2504074', kelas: 'TPB 3B', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 47, name: 'FAREL BASTIAN', npm: '2504042', kelas: 'TPB 3B', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 48, name: 'RONI FERDINAND', npm: '2404099', kelas: 'TPB 5C', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 49, name: 'GIEO THANAKA', npm: '2404027', kelas: 'TPB 5A', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 50, name: 'IRMA', npm: '2504007', kelas: 'TPB 3A', departemen: 'Media Kreatif', role: 'PJ' },
  { no: 51, name: 'ZAHRA APRILITA', npm: '2504110', kelas: 'TPB 3C', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 52, name: 'ARDIAN DUTA FIRMANSYAH', npm: '2504076', kelas: 'TPB 3B', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 53, name: 'M SULTAN DINATA', npm: '2404001', kelas: 'TPB 5A', departemen: 'Media Kreatif', role: 'Anggota' },
  { no: 54, name: 'MUHAMMAD ABI AL RASYID', npm: '2404014', kelas: 'TPB 5A', departemen: 'Kerohanian', role: 'Ketua' },
  { no: 55, name: 'ARYA GILANG AL FAISAL', npm: '2404042', kelas: 'TPB 5B', departemen: 'Kerohanian', role: 'Wakil' },
  { no: 56, name: 'ELVIRA OKTAVIARA', npm: '2404055', kelas: 'TPB 5B', departemen: 'Kerohanian', role: 'Anggota' },
  { no: 57, name: 'RANTA WINDRI NATA', npm: '2404036', kelas: 'TPB 5A', departemen: 'Kerohanian', role: 'Anggota' },
  { no: 58, name: 'MUHAMMAD HARIS MULIADI', npm: '2504085', kelas: 'TPB 3C', departemen: 'Kerohanian', role: 'Anggota' },
  { no: 59, name: 'DEDEN', npm: '2504104', kelas: 'TPB 3C', departemen: 'Kerohanian', role: 'Anggota' },
  { no: 60, name: 'MUHAMMAD LEDRA SAPUTRA', npm: '2404081', kelas: 'TPB 5C', departemen: 'Olahraga', role: 'Ketua' },
  { no: 61, name: 'POPI DWI KENZABRINA', npm: '2404052', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Wakil' },
  { no: 62, name: 'ERIKA ANGGRAINI', npm: '2404040', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 63, name: 'IBRAHIM CRISVO', npm: '2404047', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 64, name: 'DEVA KURNIAWAN', npm: '2404068', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 65, name: 'FITRI YANI', npm: '2404069', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 66, name: 'RAFI PUTRA RAMDHANI', npm: '2404005', kelas: 'TPB 5A', departemen: 'Olahraga', role: 'Anggota' },
  { no: 67, name: 'RIKO AFRIANSYAH', npm: '2404044', kelas: 'TPB 5B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 68, name: 'ARIL ADITIA', npm: '2504037', kelas: 'TPB 3A', departemen: 'Olahraga', role: 'Anggota' },
  { no: 69, name: 'NAYLA NAJWA FATIMAH', npm: '2504041', kelas: 'TPB 3B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 70, name: 'KAKA NURFAUZI', npm: '2504008', kelas: 'TPB 3A', departemen: 'Olahraga', role: 'Anggota' },
  { no: 71, name: 'DASRI', npm: '2504044', kelas: 'TPB 3B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 72, name: 'PANDU PIJAYA', npm: '2504091', kelas: 'TPB 3C', departemen: 'Olahraga', role: 'Anggota' },
  { no: 73, name: 'M.YUDA PUTRA', npm: '2504056', kelas: 'TPB 3B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 74, name: 'MISS HANNY RAMADANI', npm: '2504055', kelas: 'TPB 3B', departemen: 'Olahraga', role: 'Anggota' },
  { no: 75, name: 'RAHMAT ALDI AGASI', npm: '2504098', kelas: 'TPB 3C', departemen: 'Olahraga', role: 'Anggota' },
];

export const LOCAL_MEMBER_STORAGE_KEY = 'mataratu_admin_members_v2';

export const getEffectiveMembers = (): MemberRecord[] => {
  if (typeof window === 'undefined') return HMPS_MEMBERS;

  try {
    const saved = window.localStorage.getItem(LOCAL_MEMBER_STORAGE_KEY);
    if (!saved) return HMPS_MEMBERS;

    const parsed = JSON.parse(saved) as MemberRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) return HMPS_MEMBERS;

    return parsed.map((member) => ({
      ...member,
      departemen:
        member.departemen === 'Minat dan Bakat' ||
        member.departemen === 'Kaderisasi' ||
        member.departemen === 'Departemen PSDM'
          ? 'PSDM'
          : member.departemen === 'Dokumentasi' ||
              member.departemen === 'Publikasi' ||
              member.departemen === 'Departemen Media Kreatif'
            ? 'Media Kreatif'
            : member.departemen,
    }));
  } catch {
    return HMPS_MEMBERS;
  }
};

export const saveEffectiveMembers = (members: MemberRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_MEMBER_STORAGE_KEY, JSON.stringify(members));
  window.dispatchEvent(new Event('mataratu-members-updated'));
};

export const DEPARTMENTS_DATA: DepartmentData[] = [
  {
    id: 'himpunan',
    name: 'Himpunan',
    shortName: 'Himpunan',
    head: 'STEVEN AL WAHID (Ketua)',
    viceHead: 'M ALZAKY QUSHOYYI (Wakil)',
    description: 'Pengurus struktural HMPS MATARATU periode 2026-2027.',
    membersCount: 6,
    color: '#FACC15',
    coordinate: [0, 0.4, 0],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Himpunan'),
  },
  {
    id: 'psdm',
    name: 'PSDM',
    shortName: 'PSDM',
    head: 'ARJUN DENI OKI PUTRA (Ketua)',
    viceHead: 'DWI RAHMAWATI (Wakil)',
    description: 'Pengurus Departemen PSDM.',
    membersCount: 12,
    color: '#38BDF8',
    coordinate: [2.3, 1.4, 0],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'PSDM'),
  },
  {
    id: 'humas',
    name: 'Humas',
    shortName: 'Humas',
    head: 'TOMAS (Ketua)',
    viceHead: 'MUHAMMAD TAUFIQURRAHMAN (Wakil)',
    description: 'Pengurus Departemen Humas.',
    membersCount: 8,
    color: '#F97316',
    coordinate: [-2.5, 1.4, -0.4],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Humas'),
  },
  {
    id: 'kesenian',
    name: 'Kesenian',
    shortName: 'Kesenian',
    head: 'YONATAN KURNIAWAN (Ketua)',
    viceHead: 'RIESTY ANJANI (Wakil)',
    description: 'Pengurus Departemen Kesenian.',
    membersCount: 8,
    color: '#EC4899',
    coordinate: [-2.6, 0.4, 0.5],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Kesenian'),
  },
  {
    id: 'bisnis',
    name: 'Bisnis Kreatif',
    shortName: 'Bisnis Kreatif',
    head: 'REJA TRISNA DATA (Ketua)',
    viceHead: 'RISKI HERMAWAN (Wakil)',
    description: 'Pengurus Departemen Bisnis Kreatif.',
    membersCount: 8,
    color: '#10B981',
    coordinate: [2.5, -1.4, -0.4],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Bisnis Kreatif'),
  },
  {
    id: 'media',
    name: 'Media Kreatif',
    shortName: 'Media Kreatif',
    head: 'AHMAD BIMA KUSUMA (Ketua)',
    viceHead: 'MUHAMMAD ALIF (Wakil)',
    description: 'Pengurus Departemen Media Kreatif.',
    membersCount: 11,
    color: '#A855F7',
    coordinate: [0, -2.5, 0.4],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Media Kreatif'),
  },
  {
    id: 'kerohanian',
    name: 'Kerohanian',
    shortName: 'Kerohanian',
    head: 'MUHAMMAD ABI AL RASYID (Ketua)',
    viceHead: 'ARYA GILANG AL FAISAL (Wakil)',
    description: 'Pengurus Departemen Kerohanian.',
    membersCount: 6,
    color: '#EAB308',
    coordinate: [-1.8, -0.4, 1.8],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Kerohanian'),
  },
  {
    id: 'olahraga',
    name: 'Olahraga',
    shortName: 'Olahraga',
    head: 'MUHAMMAD LEDRA SAPUTRA (Ketua)',
    viceHead: 'POPI DWI KENZABRINA (Wakil)',
    description: 'Pengurus Departemen Olahraga.',
    membersCount: 16,
    color: '#06B6D4',
    coordinate: [1.8, 0.4, -1.8],
    members: HMPS_MEMBERS.filter((m) => m.departemen === 'Olahraga'),
  },
];
