export interface Person {
  name: string
  fullName?: string
  photo?: string
  description?: string
}

export interface Venue {
  name: string
  address: string
  mapEmbedUrl: string
  googleMapsUrl: string
  wazeUrl: string
}

export interface WeddingContact {
  name: string
  role: string
  phone: string
  whatsappUrl: string
}

export interface Parents {
  father: string
  mother: string
}

export interface WeddingEvent {
  title: string
  date: string
  dateTime: string
  startTime: string
  endTime: string
  note?: string
}

export interface TentativeItem {
  time: string
  title: string
  details?: string[]
}

export interface TentativeSchedule {
  id: string
  title: string
  items: TentativeItem[]
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

export interface WeddingGift {
  bankName: string
  accountName: string
  accountNumber: string
  qrImage: string
}

export interface WeddingData {
  groom: Person
  bride: Person
  parents: {
    bride: Parents
    groom: Parents
  }
  ceremonyTitle: string
  hashtag: string
  invitationText: string
  date: string
  hijriDate: string
  dateTime: string
  events: WeddingEvent[]
  tentatives: TentativeSchedule[]
  venue: Venue
  gift: WeddingGift
  contacts: WeddingContact[]
  music: string
  gallery: GalleryImage[]
}
