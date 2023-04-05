export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  PLAYER = 'player',
}

export enum City {
  ARMIA = 'Armia',
  AZRAN = 'Azran',
  ERION = 'Erion',
  NIPPLEHEIM = 'Nippleheim',
  NOATUN = 'Noatun',
}

export enum GuildRole {
  MEMBER = 'member',
  SUBLEADER = 'subleader',
  LEADER = 'leader',
}

export enum Kingdom {
  AKELONIA = 'Akelonia',
  HEKALOTIA = 'Hekalotia',
}

export enum Evolution {
  MORTAL = 'Mortal',
  ARCH = 'Arch',
  HARDCORE = 'Hardcore',
  CELESTIAL = 'Celestial',
} 

export enum Class {
  TRANSKNIGHT = 'Transknight',
  FOEMA = 'Foema',
  BEASTMASTER = 'Beastmaster',
  HUNTRESS = 'Huntress',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
  EXPRIRED = 'expired',
  FRAUD = 'fraud',
}

export enum PaymentMethod {
  MERCADOPAGO = 'mercadopago',
  PICPAY = 'picpay',
  PAYPAL = 'paypal',
  GERENCIANET = 'gerencianet',
}

export interface Effect {
  id: number;
  value: number;
}

export interface Item {
  id: number;
  name?: string;
  effects: Effect[];
}

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

