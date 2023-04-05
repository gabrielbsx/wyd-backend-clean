import { City, Entity } from './common';
import { Player } from './player';

export interface Guild extends Entity {
  idInGame: number;
  name: string;
  fame: number;
  kingdom: string;
  members?: Player[];
  city?: City;
}

