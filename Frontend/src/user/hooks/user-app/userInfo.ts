// src/data/User.ts

import fuser from '../../../assets/user-img/9.2.jpg';

export interface UserInterface {
  id: number;
  name: string;
  lastName: string;
  email: string;
  photo: string;
}

export const user: UserInterface = {
  id: 1,
  name: 'Maria',
  lastName: 'Pérez',
  email: 'mariaperes223@gmail.com',
  photo: fuser
};
