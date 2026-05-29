/**
 * Prisma Seed Script - Alter Ego Esports
 * Jalankan: npm run prisma:seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Seed Admin User ─────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@alterego.id' },
    update: {},
    create: {
      name: 'Admin Alter Ego',
      email: 'admin@alterego.id',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Demo member
  const memberPassword = await bcrypt.hash('member123', 12);
  const member = await prisma.user.upsert({
    where: { email: 'member@alterego.id' },
    update: {},
    create: {
      name: 'AE Fan',
      email: 'member@alterego.id',
      password: memberPassword,
      role: 'MEMBER',
    },
  });
  console.log('✅ Member user created:', member.email);

  // ─── Seed Roster Players ──────────────────────────────────────
  const players = [
    // MLBB
    {
      name: 'Udil',
      role: 'Midlaner',
      game: 'MLBB',
      imageUrl: 'https://picsum.photos/seed/udil/400/400',
      bio: 'Pemain midlane legendaris Alter Ego, dikenal dengan mekanik hero yang luar biasa dan game sense yang tajam.',
    },
    {
      name: 'Celiboy',
      role: 'Gold Laner',
      game: 'MLBB',
      imageUrl: 'https://picsum.photos/seed/celiboy/400/400',
      bio: 'Gold laner andalan AE dengan kemampuan farming dan teamfight yang konsisten di setiap turnamen.',
    },
    {
      name: 'Kiboy',
      role: 'Jungler',
      game: 'MLBB',
      imageUrl: 'https://picsum.photos/seed/kiboy/400/400',
      bio: 'Jungler agresif yang selalu menjadi motor serangan tim, master rotasi dan objective control.',
    },
    {
      name: 'Antimage',
      role: 'EXP Laner',
      game: 'MLBB',
      imageUrl: 'https://picsum.photos/seed/antimage/400/400',
      bio: 'EXP laner tangguh dengan kemampuan split push dan 1v1 yang ditakuti lawan.',
    },
    {
      name: 'Rekt',
      role: 'Roamer',
      game: 'MLBB',
      imageUrl: 'https://picsum.photos/seed/rekt/400/400',
      bio: 'Roamer visioner yang selalu hadir di momen kritis, maestro vision control dan setup teamfight.',
    },
    // Valorant
    {
      name: 'Fl1pzjder',
      role: 'Duelist',
      game: 'VALORANT',
      imageUrl: 'https://picsum.photos/seed/fl1pzjder/400/400',
      bio: 'Entry fragger berbahaya dengan aim yang konsisten dan kemampuan clutch di situasi tekanan tinggi.',
    },
    {
      name: 'Ryu',
      role: 'IGL / Controller',
      game: 'VALORANT',
      imageUrl: 'https://picsum.photos/seed/ryu/400/400',
      bio: 'In-game leader cerdas yang memimpin strategi AE Valorant menuju podium tertinggi.',
    },
    {
      name: 'Monyet',
      role: 'Sentinel',
      game: 'VALORANT',
      imageUrl: 'https://picsum.photos/seed/monyet/400/400',
      bio: 'Sentinel spesialis yang menjaga flank dan memberikan informasi vital untuk tim.',
    },
    // CS2
    {
      name: 'Xccurate',
      role: 'AWPer',
      game: 'CS2',
      imageUrl: 'https://picsum.photos/seed/xccurate/400/400',
      bio: 'AWPer terbaik Indonesia, dikenal dengan tembakan presisi dan kemampuan clutch yang mendebarkan.',
    },
    {
      name: 'Halo',
      role: 'Rifler / IGL',
      game: 'CS2',
      imageUrl: 'https://picsum.photos/seed/halo/400/400',
      bio: 'IGL berpengalaman yang memimpin strategi CS2 AE dengan taktik inovatif dan adaptif.',
    },
    {
      name: 'Laz',
      role: 'Support Rifler',
      game: 'CS2',
      imageUrl: 'https://picsum.photos/seed/laz/400/400',
      bio: 'Support rifler yang selalu mengorbankan diri untuk keberhasilan tim, master utility usage.',
    },
  ];

  for (const player of players) {
    await prisma.rosterPlayer.upsert({
      where: { id: players.indexOf(player) + 1 },
      update: {},
      create: player,
    });
  }
  console.log(`✅ ${players.length} roster players seeded`);

  // ─── Seed News ────────────────────────────────────────────────
  const newsItems = [
    {
      title: '🏆 Alter Ego Juara MPL Indonesia Season 13!',
      content: `Alter Ego berhasil meraih gelar juara MPL Indonesia Season 13 setelah mengalahkan RRQ Hoshi dengan skor 3-1 di Grand Final yang berlangsung di Jakarta Convention Center.\n\nPertandingan berlangsung sangat sengit dengan Udil tampil sebagai MVP turnamen berkat penampilan gemilangnya di atas panggung. Kiboy juga mencuri perhatian dengan rotasi jungler yang sempurna di game ketiga.\n\n"Ini adalah hasil kerja keras seluruh tim selama berbulan-bulan. Kami berlatih 12 jam sehari untuk momen ini," ujar kapten tim.\n\nAlter Ego kini berhak mewakili Indonesia di M-Series World Championship yang akan berlangsung di Dubai bulan depan.`,
      imageUrl: 'https://picsum.photos/seed/news1/800/450',
    },
    {
      title: '🎮 AE Valorant Lolos ke VCT Pacific 2024',
      content: `Tim Valorant Alter Ego berhasil mengamankan slot di VCT Pacific 2024 setelah melewati babak kualifikasi yang ketat. Fl1pzjder tampil sebagai top fragger dengan rating 1.45 sepanjang turnamen.\n\nCoach tim mengungkapkan bahwa persiapan intensif selama 3 bulan terakhir menjadi kunci keberhasilan ini. Strategi baru yang dikembangkan bersama analis tim terbukti efektif menghadapi berbagai gaya bermain lawan.\n\nAE Valorant akan menghadapi tim-tim terbaik Asia Pasifik termasuk Paper Rex, ZETA Division, dan DRX di fase grup VCT Pacific.`,
      imageUrl: 'https://picsum.photos/seed/news2/800/450',
    },
    {
      title: '🤝 Alter Ego Umumkan Partnership dengan Brand Gaming Terkemuka',
      content: `Alter Ego dengan bangga mengumumkan kemitraan strategis dengan beberapa brand gaming terkemuka untuk tahun 2024. Partnership ini mencakup penyediaan peralatan gaming premium, jersey eksklusif, dan dukungan finansial untuk operasional tim.\n\nCEO Alter Ego menyatakan bahwa kolaborasi ini akan membawa AE ke level berikutnya dalam kompetisi esports regional dan internasional.\n\nFan merchandise eksklusif hasil kolaborasi ini akan segera tersedia di official store Alter Ego. Stay tuned untuk pengumuman lebih lanjut!`,
      imageUrl: 'https://picsum.photos/seed/news3/800/450',
    },
    {
      title: '📢 Rekrutmen Pemain Baru untuk Divisi MLBB 2024',
      content: `Alter Ego membuka kesempatan bagi pemain berbakat untuk bergabung dengan tim MLBB. Kami mencari pemain dengan rank Mythical Glory ke atas yang memiliki dedikasi tinggi dan semangat juang yang kuat.\n\nPersyaratan:\n- Minimal rank Mythical Glory 600 poin\n- Usia 16-25 tahun\n- Bisa berlatih full-time\n- Memiliki mental kompetitif yang kuat\n\nPendaftaran dibuka hingga 31 Januari 2024. Kirimkan video highlight gameplay dan CV ke recruitment@alterego.id`,
      imageUrl: 'https://picsum.photos/seed/news4/800/450',
    },
    {
      title: '🌟 Xccurate Masuk Daftar Top 10 AWPer Asia 2023',
      content: `Xccurate, AWPer andalan Alter Ego CS2, berhasil masuk dalam daftar Top 10 AWPer terbaik Asia versi HLTV untuk tahun 2023. Pencapaian luar biasa ini merupakan pengakuan atas konsistensi dan kualitas permainan Xccurate sepanjang tahun.\n\nDengan rating HLTV 1.23 dan headshot percentage 68%, Xccurate membuktikan dirinya sebagai salah satu AWPer paling berbahaya di Asia.\n\n"Saya sangat bersyukur atas pencapaian ini. Ini bukan hanya tentang saya, tapi tentang seluruh tim yang selalu mendukung," kata Xccurate.`,
      imageUrl: 'https://picsum.photos/seed/news5/800/450',
    },
  ];

  for (const news of newsItems) {
    await prisma.news.create({ data: news });
  }
  console.log(`✅ ${newsItems.length} news articles seeded`);

  // ─── Seed BA Photos ───────────────────────────────────────────
  const baPhotos = [
    {
      name: 'Raisa x Alter Ego',
      imageUrl: 'https://picsum.photos/seed/ba1/600/600',
      caption: 'Kolaborasi eksklusif bersama Raisa untuk jersey limited edition AE',
      product: 'AE x Raisa Limited Jersey',
    },
    {
      name: 'Ria Ricis x AE Gaming',
      imageUrl: 'https://picsum.photos/seed/ba2/600/600',
      caption: 'Brand Ambassador AE Gaming memperkenalkan koleksi merchandise terbaru',
      product: 'AE Gaming Merchandise Collection',
    },
    {
      name: 'Awkarin x AE Lifestyle',
      imageUrl: 'https://picsum.photos/seed/ba3/600/600',
      caption: 'Koleksi lifestyle AE yang stylish dan nyaman untuk gaming marathon',
      product: 'AE Lifestyle Hoodie Series',
    },
    {
      name: 'Rachel Vennya x AE Beauty',
      imageUrl: 'https://picsum.photos/seed/ba4/600/600',
      caption: 'Kolaborasi unik antara dunia esports dan beauty dengan AE Beauty Line',
      product: 'AE x Beauty Collab',
    },
    {
      name: 'Atta Halilintar x AE Pro',
      imageUrl: 'https://picsum.photos/seed/ba5/600/600',
      caption: 'AE Pro Gaming Chair - dirancang untuk kenyamanan gaming profesional',
      product: 'AE Pro Gaming Chair',
    },
    {
      name: 'Fuji x AE Accessories',
      imageUrl: 'https://picsum.photos/seed/ba6/600/600',
      caption: 'Koleksi aksesoris gaming AE yang stylish dan fungsional',
      product: 'AE Gaming Accessories Pack',
    },
    {
      name: 'Ayu Ting Ting x AE Fashion',
      imageUrl: 'https://picsum.photos/seed/ba7/600/600',
      caption: 'Fashion line AE yang memadukan estetika esports dengan gaya sehari-hari',
      product: 'AE Fashion Line 2024',
    },
    {
      name: 'Deddy Corbuzier x AE Fitness',
      imageUrl: 'https://picsum.photos/seed/ba8/600/600',
      caption: 'AE Fitness Program - karena atlet esports juga butuh fisik prima',
      product: 'AE Fitness x Deddy Program',
    },
  ];

  for (const photo of baPhotos) {
    await prisma.bAPhoto.create({ data: photo });
  }
  console.log(`✅ ${baPhotos.length} BA photos seeded`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('📧 Admin: admin@alterego.id / admin123');
  console.log('📧 Member: member@alterego.id / member123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
