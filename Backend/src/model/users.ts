
export interface Users {
  id: number;
  name: string;
  lastname: string;
  photo: string | null;
  email: string;
  password: string | null;
  googleID: string | null;
  active: boolean;
  rol: 'ADMIN' | 'USUARIO';
  dateCreate: Date;
}
