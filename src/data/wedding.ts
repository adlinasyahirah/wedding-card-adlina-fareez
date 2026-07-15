import type { WeddingData } from '../types/wedding'

export const wedding: WeddingData = {
  groom: {
    name: 'Fareez Fahmi',
    fullName: '',
    photo: '',
    description: '',
  },
  bride: {
    name: 'Adlina Syahirah',
    fullName: '',
    photo: '',
    description: '',
  },
  parents: {
    bride: {
      father: '',
      mother: '',
    },
    groom: {
      father: '',
      mother: '',
    },
  },
  invitationText:
    'Dengan penuh kesyukuran, kami menjemput anda untuk meraikan hari bahagia kami.',
  date: '21 November 2026',
  dateTime: '2026-11-21T00:00:00+08:00',
  event: {
    title: 'Majlis Resepsi',
    date: '21 November 2026',
    dateTime: '2026-11-21T00:00:00+08:00',
    startTime: '',
    endTime: '',
  },
  tentative: [
    {
      time: '',
      title: 'Ketibaan Tetamu',
      description: 'Para tetamu dipersilakan hadir dan menikmati jamuan.',
    },
    {
      time: '',
      title: 'Ketibaan Pengantin',
      description: 'Meraikan ketibaan pasangan pengantin bersama keluarga.',
    },
    {
      time: '',
      title: 'Sesi Bersanding',
      description: 'Sesi bergambar dan meraikan mempelai di pelamin.',
    },
    {
      time: '',
      title: 'Majlis Bersurai',
      description: 'Terima kasih kerana hadir memeriahkan hari bahagia kami.',
    },
  ],
  venue: {
    name: '',
    address: '',
    mapEmbedUrl: '',
    googleMapsUrl: '',
    wazeUrl: '',
  },
  gift: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    qrImage: '',
  },
  contacts: {
    bride: {
      name: 'Adlina',
      role: 'Pihak Pengantin Perempuan',
      phone: '',
      whatsappUrl: '',
    },
    groom: {
      name: 'Fareez',
      role: 'Pihak Pengantin Lelaki',
      phone: '',
      whatsappUrl: '',
    },
  },
  music: '',
  gallery: [],
}
