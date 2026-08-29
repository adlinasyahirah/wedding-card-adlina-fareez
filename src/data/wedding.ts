import type { WeddingData } from '../types/wedding'

export const wedding: WeddingData = {
  groom: {
    name: "Fareez",
    fullName: "Mohammad Fareez Fahmi bin Mohd Fauzi",
    photo: "",
    description: "",
  },
  bride: {
    name: "Adlina",
    fullName: "Nur Adlina Syahirah binti Mustafa",
    photo: "",
    description: "",
  },
  parents: {
    bride: {
      father: "Mustafa bin Abu Bakar",
      mother: "Dalina binti Mohamed Ariffin",
    },
    groom: {
      father: "",
      mother: "",
    },
  },
  ceremonyTitle: "Majlis Bertaut Kasih",
  hashtag: "#ReezervedForSyira",
  invitationText:
    "Dengan penuh kesyukuran, kami menjemput anda untuk meraikan hari bahagia kami.",
  date: "21 November 2026",
  hijriDate: "11 Jamadilakhir 1448 Hijrah",
  dateTime: "2026-11-21T00:00:00+08:00",
  events: [
    {
      title: "Majlis Akad Nikah",
      date: "21 November 2026",
      dateTime: "2026-11-21T08:00:00+08:00",
      startTime: "8:00 pagi",
      endTime: "10:30 pagi",
    },
    {
      title: "Majlis Bersanding",
      date: "21 November 2026",
      dateTime: "2026-11-21T11:30:00+08:00",
      startTime: "11:30 pagi",
      endTime: "3:30 petang",
      note: "Ketibaan pengantin pada 12:15 tengah hari",
    },
  ],
  tentatives: [
    {
      id: "akad-nikah",
      title: "Majlis Akad Nikah",
      items: [
        {
          time: "8:00 PAGI",
          title: "Ketibaan keluarga & tetamu terdekat",
        },
        {
          time: "8:30 PAGI – 8:45 PAGI",
          title: "Ketibaan jurunikah, wali & saksi",
          details: [
            "Ketibaan & perarakan masuk Jurunikah, Wali & Saksi",
            "Perarakan masuk Pembawa Dulang Mas Kahwin & Hantaran",
            "Perarakan masuk Pengantin Lelaki",
            "Perarakan masuk Pengantin Perempuan, diiringi oleh Ibu pengantin",
          ],
        },
        {
          time: "Anggaran 9:00 PAGI",
          title: "Majlis Ijab & Qabul",
          details: [
            "Khutbah Nikah",
            "Lafaz Ijab & Qabul",
            "Doa",
            "Bacaan Lafaz Taklik",
            "Tandatangan Dokumen",
          ],
        },
        {
          time: "9:30 PAGI",
          title: "Majlis Ijab & Qabul selesai",
          details: [
            "Sesi Batal Air Sembahyang",
            "Sesi Serahan Mas Kahwin",
            "Sesi Serahan Cincin Kahwin",
          ],
        },
        {
          time: "9:40 PAGI",
          title: "Sesi Salam Restu",
        },
        {
          time: "9:45 PAGI",
          title: "Sesi bergambar",
        },
        {
          time: "10:00 PAGI",
          title: "Jamuan Ringkas",
        },
      ],
    },
    {
      id: "bersanding",
      title: "Majlis Bersanding",
      items: [
        {
          time: "11:30 PAGI",
          title: "Ketibaan Tetamu",
          details: ["Majlis bermula"],
        },
        {
          time: "12:15 PETANG",
          title: "Pengantin tiba di Dewan Puncak Arabella",
        },
        {
          time: "12:20 PETANG",
          title: "Perarakan Masuk Pengantin",
        },
        {
          time: "12:25 PETANG",
          title: "Bacaan Doa",
        },
        {
          time: "12:35 PETANG",
          title: "Salam Restu",
        },
        {
          time: "12:45 PETANG",
          title: "Makan Beradab",
        },
        {
          time: "1:00 PETANG",
          title: "Sesi Memotong Kek",
        },
        {
          time: "1:10 PETANG",
          title: "Sesi Bergambar",
          details: [
            "Kedua-dua keluarga",
            "Keluarga pengantin perempuan",
            "Keluarga pengantin lelaki",
            "Tetamu jemputan",
          ],
        },
        {
          time: "3:30 PETANG",
          title: "Majlis tamat",
        },
      ],
    },
  ],
  venue: {
    name: "Dewan Puncak Arabella",
    address: "Tanah Rata 39000, Cameron Highlands, Pahang Darul Makmur",
    mapEmbedUrl: "",
    googleMapsUrl: "https://maps.app.goo.gl/iYqDUsn2pz7N5V3PA?g_st=ic",
    wazeUrl: "https://waze.com/ul/hw2b17hdn4",
  },
  gift: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    qrImage: "",
  },
  contacts: [
    {
      name: "Mustafa",
      role: "Ayah",
      phone: "019 551 9734",
      whatsappUrl: "https://wa.me/60195519734",
    },
    {
      name: "Dalina",
      role: "Ibu",
      phone: "019 597 7238",
      whatsappUrl: "https://wa.me/60195977238",
    },
    {
      name: "Syafiq",
      role: "Abang",
      phone: "011 1245 8285",
      whatsappUrl: "https://wa.me/601112458285",
    },
    {
      name: "Deeha",
      role: "Kakak",
      phone: "018 462 4356",
      whatsappUrl: "https://wa.me/60184624356",
    },
  ],
  music: "/music/Teman Lelaki & Aziem Rashidi - Satu Bunga.mp3",
  gallery: [],
};
