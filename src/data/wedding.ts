import type { WeddingData } from '../types/wedding'

export const wedding: WeddingData = {
  groom: {
    name: "Fareez",
    fullName: "Mohammad Fareez Fahmi Bin Mohd Fauzi",
    photo: "",
    description: "",
  },
  bride: {
    name: "Adlina",
    fullName: "Nur Adlina Syahirah Binti Mustafa",
    photo: "",
    description: "",
  },
  parents: {
    bride: {
      father: "Mustafa Bin Abu Bakar",
      mother: "Dalina Binti Mohamed Ariffin",
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
      startTime: "8:00 a.m",
      endTime: "10:30 a.m",
    },
    {
      title: "Majlis Resepsi",
      date: "21 November 2026",
      dateTime: "2026-11-21T11:30:00+08:00",
      startTime: "11:30 a.m",
      endTime: "3:30 p.m",
      note: "Ketibaan pengantin pada 12:30 p.m",
    },
  ],
  tentatives: [
    {
      id: "akad-nikah",
      title: "Majlis Akad Nikah",
      items: [
        {
          time: "8:00 a.m",
          title: "Ketibaan Keluarga & Tetamu",
        },
        {
          time: "8:30 a.m – 8:45 a.m",
          title: "Ketibaan Jurunikah, Wali & Saksi",
          details: [
            "Perarakan masuk Jurunikah, Wali & Saksi",
            "Perarakan masuk Pembawa Dulang Mas Kahwin & Hantaran",
            "Perarakan masuk Pengantin Lelaki",
            "Perarakan masuk Pengantin Perempuan diiringi Ibu",
          ],
        },
        {
          time: "9:00 a.m",
          title: "Upacara Akad Nikah",
          details: [
            "Khutbah Nikah",
            "Lafaz Ijab & Qabul",
            "Bacaan Doa",
            "Lafaz Taklik",
            "Tandatangan Dokumen Nikah",
          ],
        },
        {
          time: "9:30 a.m",
          title: "Penyempurnaan Akad Nikah",
          details: [
            "Sesi Batal Air Sembahyang",
            "Penyerahan Mas Kahwin",
            "Penyerahan Cincin",
          ],
        },
        {
          time: "9:40 a.m",
          title: "Salam Restu",
        },
        {
          time: "9:45 a.m",
          title: "Sesi Bergambar",
        },
        {
          time: "10:30 a.m",
          title: "Jamuan Ringkas",
        },
      ],
    },

    {
      id: "resepsi",
      title: "Majlis Resepsi",
      items: [
        {
          time: "11:30 a.m",
          title: "Ketibaan Tetamu & Majlis Bermula",
        },
        {
          time: "12:25 p.m",
          title: "Ketibaan Pengantin",
        },
        {
          time: "12:30 p.m",
          title: "Perarakan Masuk Pengantin",
        },
        {
          time: "12:35 p.m",
          title: "Bacaan Doa",
        },
        {
          time: "12:40 p.m",
          title: "Salam Restu",
        },
        {
          time: "12:45 p.m",
          title: "Makan Beradab",
        },
        {
          time: "1:00 p.m",
          title: "Sesi Bergambar",
          details: [
            "Keluarga Pengantin Perempuan",
            "Keluarga Pengantin Lelaki",
            "Saudara-mara & Tetamu",
          ],
        },
        {
          time: "1:30 p.m",
          title: "Menyantuni Tetamu",
        },
        {
          time: "3:30 p.m",
          title: "Majlis Bersurai",
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
