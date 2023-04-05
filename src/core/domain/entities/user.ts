import { Entity, Role } from './common';
import { Order } from './order';
import { Player } from './player';

export interface User extends Entity {
  name?: string;
  username: string;
  email: string;
  password: string;
  donation?: number;
  players: Player;
  role: Role;
  orders?: Order[];
}

