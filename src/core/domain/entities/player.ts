import { Class, Entity, Evolution, GuildRole, Item, Kingdom } from './common';
import { Guild } from './guild';
import { User } from './user';

export interface Player extends Entity {
  nick: string;
  level: number;
  experience: number;
  class: Class;
  evolution: Evolution;
  kingdom: Kingdom;
  inventory?: Item[];
  equipment?: Item[];
  guild?: Guild;
  guildRole?: GuildRole;
  owner: User;
}

