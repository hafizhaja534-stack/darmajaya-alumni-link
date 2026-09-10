/**
 * Data contoh (dummy) untuk Darmajaya Alumni Connect.
 * Struktur objek mengikuti rencana tabel database alumni_darmajaya
 * sehingga mudah ditukar dengan data asli nanti.
 */

export type UserRole = "admin" | "alumni" | "company";
export type UserStatus = "pending" | "active" | "suspended" | "rejected";
export type VerificationStatus = "pending" | "approved" | "rejected" | "needs_revision";
export type CardStatus = "active" | "expired" | "blocked";
export type EmploymentType = "full_time" | "part_time" | "contract" | "internship" | "freelance";
export type Workplace = "onsite" | "hybrid" | "remote";
export type EventType = "reunion" | "seminar" | "workshop" | "webinar" | "career" | "other";
export type EventMode = "online" | "offline" | "hybrid";
export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "accepted";

export interface Program {
  id: number;
  faculty: string;
  name: string;
}

export interface AlumniProfile {
  id: number;
  full_name: string;
  nim: string;
  program: string;
  entry_year: number;
  graduation_year: number;
  job_title: string;
  company_name: string;
  industry: string;
  province: string;
  city: string;
  linkedin: string;
  bio: string;
  photo_url: string;
  verification_status: VerificationStatus;
  is_public: boolean;
}

export interface JobVacancy {
  id: number;
  title: string;
  company_name: string;
  company_logo: string;
  industry: string;
  city: string;
  province: string;
  salary_range: string;
  employment_type: EmploymentType;
  workplace: Workplace;
  deadline: string;
  posted_at: string;
  description: string;
}

export interface AlumniEvent {
  id: number;
  title: string;
  type: EventType;
  mode: EventMode;
  date: string;
  time: string;
  location: string;
  image_url: string;
  quota: number;
  registered: number;
  register_deadline: string;
  excerpt: string;
}

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image_url: string;
  author: string;
  published_at: string;
}

export interface AppNotification {
  id: number;
  title: string;
  body: string;
  category: "verifikasi" | "lamaran" | "event" | "tracer" | "kartu" | "pengumuman";
  created_at: string;
  read: boolean;
}

const FILKOM = "Fakultas Ilmu Komputer";
const FEB = "Fakultas Ekonomi dan Bisnis";

export const FACULTIES = [FILKOM, FEB];

export const PROGRAMS: Program[] = [
  { id: 1, faculty: FILKOM, name: "Teknik Informatika" },
  { id: 2, faculty: FILKOM, name: "Sistem Informasi" },
  { id: 3, faculty: FILKOM, name: "Teknik Komputer" },
  { id: 4, faculty: FEB, name: "Manajemen" },
  { id: 5, faculty: FEB, name: "Akuntansi" },
  { id: 6, faculty: FEB, name: "Bisnis Digital" },
];

export const PROVINCES = ["Lampung", "DKI Jakarta", "Jawa Barat", "Banten", "Jawa Timur"];

export const CITIES = [
  "Bandar Lampung",
  "Metro",
  "Jakarta Selatan",
  "Jakarta Pusat",
  "Bandung",
  "Tangerang",
  "Surabaya",
];

export const INDUSTRIES = [
  "Teknologi Informasi",
  "Perbankan",
  "Pendidikan",
  "Manufaktur",
  "Telekomunikasi",
  "Retail",
  "Konsultan",
];

const photo = (seed: string) => `https://i.pravatar.cc/300?u=${seed}`;

export const ALUMNI: AlumniProfile[] = [
  {
    id: 1,
    full_name: "Raka Wijaya Pratama",
    nim: "1611010045",
    program: "Teknik Informatika",
    entry_year: 2016,
    graduation_year: 2020,
    job_title: "Backend Engineer",
    company_name: "Nusantara Tech Labs",
    industry: "Teknologi Informasi",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    linkedin: "https://linkedin.com/in/contoh-raka",
    bio: "Membangun layanan backend berskala nasional dan aktif menjadi mentor coding untuk adik tingkat.",
    photo_url: photo("raka"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 2,
    full_name: "Salsabila Nurhaliza",
    nim: "1712020118",
    program: "Sistem Informasi",
    entry_year: 2017,
    graduation_year: 2021,
    job_title: "Product Analyst",
    company_name: "Bank Sinar Andalas",
    industry: "Perbankan",
    province: "Lampung",
    city: "Bandar Lampung",
    linkedin: "https://linkedin.com/in/contoh-salsa",
    bio: "Fokus pada analisis produk digital perbankan dan transformasi layanan nasabah.",
    photo_url: photo("salsa"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 3,
    full_name: "Bagas Anandika",
    nim: "1511030077",
    program: "Manajemen",
    entry_year: 2015,
    graduation_year: 2019,
    job_title: "Branch Manager",
    company_name: "Andalas Retail Group",
    industry: "Retail",
    province: "Lampung",
    city: "Metro",
    linkedin: "https://linkedin.com/in/contoh-bagas",
    bio: "Memimpin operasional cabang dengan 60 karyawan dan program pengembangan talenta muda.",
    photo_url: photo("bagas"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 4,
    full_name: "Dinda Ayu Larasati",
    nim: "1812040203",
    program: "Akuntansi",
    entry_year: 2018,
    graduation_year: 2022,
    job_title: "Financial Auditor",
    company_name: "Prima Konsultan Indonesia",
    industry: "Konsultan",
    province: "Jawa Barat",
    city: "Bandung",
    linkedin: "https://linkedin.com/in/contoh-dinda",
    bio: "Auditor keuangan dengan spesialisasi sektor manufaktur dan UMKM naik kelas.",
    photo_url: photo("dinda"),
    verification_status: "pending",
    is_public: true,
  },
  {
    id: 5,
    full_name: "Fajar Ramadhan Putra",
    nim: "1611010199",
    program: "Teknik Komputer",
    entry_year: 2016,
    graduation_year: 2020,
    job_title: "Network Engineer",
    company_name: "Telkomsat Nusantara",
    industry: "Telekomunikasi",
    province: "Banten",
    city: "Tangerang",
    linkedin: "https://linkedin.com/in/contoh-fajar",
    bio: "Mengelola infrastruktur jaringan dan konektivitas satelit untuk wilayah timur Indonesia.",
    photo_url: photo("fajar"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 6,
    full_name: "Nabila Kirana Dewi",
    nim: "1912050311",
    program: "Bisnis Digital",
    entry_year: 2019,
    graduation_year: 2023,
    job_title: "Digital Marketing Lead",
    company_name: "Kopi Rakyat Nusantara",
    industry: "Retail",
    province: "Jawa Timur",
    city: "Surabaya",
    linkedin: "https://linkedin.com/in/contoh-nabila",
    bio: "Membangun kanal digital untuk brand F&B lokal hingga menembus pasar nasional.",
    photo_url: photo("nabila"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 7,
    full_name: "Yoga Saputra Hidayat",
    nim: "1712020455",
    program: "Sistem Informasi",
    entry_year: 2017,
    graduation_year: 2021,
    job_title: "IT Support Supervisor",
    company_name: "Lampung Sejahtera Manufaktur",
    industry: "Manufaktur",
    province: "Lampung",
    city: "Bandar Lampung",
    linkedin: "https://linkedin.com/in/contoh-yoga",
    bio: "Menangani sistem produksi dan digitalisasi proses pabrik.",
    photo_url: photo("yoga"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 8,
    full_name: "Alifia Rahmadani",
    nim: "1812040088",
    program: "Teknik Informatika",
    entry_year: 2018,
    graduation_year: 2022,
    job_title: "UI/UX Designer",
    company_name: "Studio Karsa Digital",
    industry: "Teknologi Informasi",
    province: "DKI Jakarta",
    city: "Jakarta Pusat",
    linkedin: "https://linkedin.com/in/contoh-alifia",
    bio: "Merancang produk digital untuk startup edukasi dan layanan publik.",
    photo_url: photo("alifia"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 9,
    full_name: "Rizky Maulana Akbar",
    nim: "1511030512",
    program: "Manajemen",
    entry_year: 2015,
    graduation_year: 2019,
    job_title: "Founder",
    company_name: "Tani Pintar Lampung",
    industry: "Teknologi Informasi",
    province: "Lampung",
    city: "Bandar Lampung",
    linkedin: "https://linkedin.com/in/contoh-rizky",
    bio: "Wirausaha agritech yang mendampingi lebih dari 500 petani di Lampung.",
    photo_url: photo("rizky"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 10,
    full_name: "Cindy Permatasari",
    nim: "1912050777",
    program: "Akuntansi",
    entry_year: 2019,
    graduation_year: 2023,
    job_title: "Tax Associate",
    company_name: "Bank Sinar Andalas",
    industry: "Perbankan",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    linkedin: "https://linkedin.com/in/contoh-cindy",
    bio: "Menangani perpajakan korporasi dan pelaporan kepatuhan.",
    photo_url: photo("cindy"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 11,
    full_name: "Hendra Kusuma Jaya",
    nim: "1611010333",
    program: "Teknik Komputer",
    entry_year: 2016,
    graduation_year: 2020,
    job_title: "DevOps Engineer",
    company_name: "Nusantara Tech Labs",
    industry: "Teknologi Informasi",
    province: "Jawa Barat",
    city: "Bandung",
    linkedin: "https://linkedin.com/in/contoh-hendra",
    bio: "Mengelola infrastruktur cloud dan otomasi rilis perangkat lunak.",
    photo_url: photo("hendra"),
    verification_status: "approved",
    is_public: true,
  },
  {
    id: 12,
    full_name: "Putri Anggraini",
    nim: "1712020909",
    program: "Bisnis Digital",
    entry_year: 2017,
    graduation_year: 2021,
    job_title: "E-Commerce Manager",
    company_name: "Andalas Retail Group",
    industry: "Retail",
    province: "Lampung",
    city: "Metro",
    linkedin: "https://linkedin.com/in/contoh-putri",
    bio: "Mengembangkan penjualan daring lintas marketplace nasional.",
    photo_url: photo("putri"),
    verification_status: "approved",
    is_public: true,
  },
];

export const JOBS: JobVacancy[] = [
  {
    id: 1,
    title: "Junior Backend Developer",
    company_name: "Nusantara Tech Labs",
    company_logo: "NT",
    industry: "Teknologi Informasi",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    salary_range: "Rp 7.000.000 - Rp 10.000.000",
    employment_type: "full_time",
    workplace: "hybrid",
    deadline: "2026-10-15",
    posted_at: "2026-09-02",
    description:
      "Mengembangkan layanan API internal, menulis pengujian otomatis, dan berkolaborasi dengan tim produk.",
  },
  {
    id: 2,
    title: "Data Analyst",
    company_name: "Bank Sinar Andalas",
    company_logo: "BS",
    industry: "Perbankan",
    city: "Bandar Lampung",
    province: "Lampung",
    salary_range: "Rp 8.000.000 - Rp 12.000.000",
    employment_type: "full_time",
    workplace: "onsite",
    deadline: "2026-09-30",
    posted_at: "2026-09-01",
    description:
      "Mengolah data transaksi nasabah menjadi laporan dan rekomendasi bisnis bagi manajemen.",
  },
  {
    id: 3,
    title: "UI/UX Designer (Kontrak)",
    company_name: "Studio Karsa Digital",
    company_logo: "SK",
    industry: "Teknologi Informasi",
    city: "Bandung",
    province: "Jawa Barat",
    salary_range: "Rp 6.500.000 - Rp 9.000.000",
    employment_type: "contract",
    workplace: "remote",
    deadline: "2026-10-05",
    posted_at: "2026-08-28",
    description: "Merancang antarmuka aplikasi mobile dan menyusun design system produk klien.",
  },
  {
    id: 4,
    title: "Management Trainee",
    company_name: "Andalas Retail Group",
    company_logo: "AR",
    industry: "Retail",
    city: "Metro",
    province: "Lampung",
    salary_range: "Rp 5.500.000 - Rp 7.000.000",
    employment_type: "full_time",
    workplace: "onsite",
    deadline: "2026-10-20",
    posted_at: "2026-08-25",
    description: "Program percepatan karier 12 bulan untuk lulusan baru menuju posisi supervisor.",
  },
  {
    id: 5,
    title: "Magang Network Support",
    company_name: "Telkomsat Nusantara",
    company_logo: "TN",
    industry: "Telekomunikasi",
    city: "Tangerang",
    province: "Banten",
    salary_range: "Rp 2.500.000 (uang saku)",
    employment_type: "internship",
    workplace: "onsite",
    deadline: "2026-09-25",
    posted_at: "2026-08-20",
    description: "Mendampingi tim jaringan dalam pemeliharaan perangkat dan dokumentasi teknis.",
  },
  {
    id: 6,
    title: "Content Writer Lepas",
    company_name: "Kopi Rakyat Nusantara",
    company_logo: "KR",
    industry: "Retail",
    city: "Surabaya",
    province: "Jawa Timur",
    salary_range: "Rp 300.000 / artikel",
    employment_type: "freelance",
    workplace: "remote",
    deadline: "2026-11-01",
    posted_at: "2026-08-18",
    description: "Menulis artikel dan naskah kampanye media sosial untuk brand kopi lokal.",
  },
];

export const EVENTS: AlumniEvent[] = [
  {
    id: 1,
    title: "Temu Alumni Akbar Darmajaya 2026",
    type: "reunion",
    mode: "offline",
    date: "2026-10-11",
    time: "08.00 - 15.00 WIB",
    location: "Aula Rektorat IIB Darmajaya, Bandar Lampung",
    image_url:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=70",
    quota: 500,
    registered: 312,
    register_deadline: "2026-10-05",
    excerpt: "Reuni akbar lintas angkatan dengan sesi ramah tamah, talkshow, dan bazar UMKM alumni.",
  },
  {
    id: 2,
    title: "Webinar Karier: Menembus Industri Teknologi",
    type: "webinar",
    mode: "online",
    date: "2026-09-24",
    time: "19.00 - 21.00 WIB",
    location: "Zoom Meeting",
    image_url:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=70",
    quota: 300,
    registered: 187,
    register_deadline: "2026-09-23",
    excerpt: "Berbagi pengalaman alumni yang berkarier di perusahaan teknologi nasional.",
  },
  {
    id: 3,
    title: "Workshop Kewirausahaan Digital",
    type: "workshop",
    mode: "hybrid",
    date: "2026-10-02",
    time: "09.00 - 16.00 WIB",
    location: "Gedung Inkubator Bisnis & Zoom",
    image_url:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=70",
    quota: 120,
    registered: 96,
    register_deadline: "2026-09-28",
    excerpt: "Praktik menyusun model bisnis dan strategi pemasaran digital bersama mentor alumni.",
  },
  {
    id: 4,
    title: "Darmajaya Career Expo",
    type: "career",
    mode: "offline",
    date: "2026-11-08",
    time: "08.30 - 16.00 WIB",
    location: "GSG IIB Darmajaya, Bandar Lampung",
    image_url:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70",
    quota: 1000,
    registered: 421,
    register_deadline: "2026-11-01",
    excerpt: "Lebih dari 40 perusahaan mitra membuka rekrutmen langsung untuk alumni dan mahasiswa.",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    slug: "alumni-darmajaya-raih-penghargaan-inovasi",
    title: "Alumni Darmajaya Raih Penghargaan Inovasi Digital Nasional",
    category: "Prestasi",
    excerpt:
      "Karya aplikasi pendampingan petani buatan alumni angkatan 2015 memenangi kompetisi inovasi tingkat nasional.",
    image_url:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=70",
    author: "Humas Darmajaya",
    published_at: "2026-09-05",
  },
  {
    id: 2,
    slug: "tracer-study-2026-dibuka",
    title: "Tracer Study 2026 Resmi Dibuka untuk Lulusan 2023-2025",
    category: "Pengumuman",
    excerpt:
      "Pengisian tracer study menjadi masukan penting bagi pengembangan kurikulum dan layanan karier kampus.",
    image_url:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=70",
    author: "Pusat Karier",
    published_at: "2026-09-01",
  },
  {
    id: 3,
    slug: "kartu-alumni-digital-diluncurkan",
    title: "Kartu Alumni Digital Resmi Diluncurkan",
    category: "Layanan",
    excerpt:
      "Alumni terverifikasi kini memiliki kartu digital ber-QR Code untuk akses layanan kampus dan potongan mitra.",
    image_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=70",
    author: "Ikatan Alumni",
    published_at: "2026-08-22",
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    title: "Verifikasi alumni disetujui",
    body: "Data ijazah dan NIM Anda telah diverifikasi oleh admin.",
    category: "verifikasi",
    created_at: "2026-09-08",
    read: false,
  },
  {
    id: 2,
    title: "Lamaran sedang ditinjau",
    body: "Lamaran Anda untuk posisi Junior Backend Developer masuk tahap peninjauan.",
    category: "lamaran",
    created_at: "2026-09-06",
    read: false,
  },
  {
    id: 3,
    title: "Pengingat event",
    body: "Webinar Karier akan berlangsung 24 September 2026 pukul 19.00 WIB.",
    category: "event",
    created_at: "2026-09-04",
    read: true,
  },
  {
    id: 4,
    title: "Tracer Study 2026",
    body: "Mohon lengkapi kuesioner tracer study sebelum 31 Oktober 2026.",
    category: "tracer",
    created_at: "2026-09-02",
    read: true,
  },
];

export const MY_APPLICATIONS: {
  id: number;
  job: string;
  company: string;
  applied_at: string;
  status: ApplicationStatus;
}[] = [
  {
    id: 1,
    job: "Junior Backend Developer",
    company: "Nusantara Tech Labs",
    applied_at: "2026-09-03",
    status: "reviewing",
  },
  {
    id: 2,
    job: "Data Analyst",
    company: "Bank Sinar Andalas",
    applied_at: "2026-08-27",
    status: "shortlisted",
  },
  {
    id: 3,
    job: "Management Trainee",
    company: "Andalas Retail Group",
    applied_at: "2026-08-12",
    status: "rejected",
  },
];

export const CURRENT_ALUMNI = {
  full_name: "Raka Wijaya Pratama",
  nim: "1611010045",
  program: "Teknik Informatika",
  graduation_year: 2020,
  photo_url: photo("raka"),
  verification_status: "approved" as VerificationStatus,
  profile_completion: 80,
  card_number: "DJ-2020-001045",
  card_status: "active" as CardStatus,
};

export const STATS = {
  total_alumni: 18420,
  verified_alumni: 12765,
  programs: PROGRAMS.length,
  events: 64,
  jobs: 238,
};

export const EMPLOYMENT_TYPE_LABEL: Record<EmploymentType, string> = {
  full_time: "Penuh Waktu",
  part_time: "Paruh Waktu",
  contract: "Kontrak",
  internship: "Magang",
  freelance: "Lepas",
};

export const WORKPLACE_LABEL: Record<Workplace, string> = {
  onsite: "Di Kantor",
  hybrid: "Hibrida",
  remote: "Jarak Jauh",
};

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  reunion: "Reuni",
  seminar: "Seminar",
  workshop: "Workshop",
  webinar: "Webinar",
  career: "Karier",
  other: "Lainnya",
};

export const EVENT_MODE_LABEL: Record<EventMode, string> = {
  online: "Daring",
  offline: "Luring",
  hybrid: "Hibrida",
};

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  submitted: "Terkirim",
  reviewing: "Ditinjau",
  shortlisted: "Masuk Seleksi",
  rejected: "Ditolak",
  accepted: "Diterima",
};

export const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  pending: "Menunggu",
  approved: "Terverifikasi",
  rejected: "Ditolak",
  needs_revision: "Perlu Revisi",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
