import Img01 from '../../../assets/events-img/c1.jpg';
import Img10 from '../../../assets/events-img/c10.jpg';
import Img02 from '../../../assets/events-img/c2.jpg';
import Img03 from '../../../assets/events-img/c3.jpg';
import Img04 from '../../../assets/events-img/c4.png';
import Img05 from '../../../assets/events-img/c5.webp';
import Img06 from '../../../assets/events-img/c6.webp';
import Img07 from '../../../assets/events-img/c7.webp';
import Img08 from '../../../assets/events-img/c8.jpg';
import Img09 from '../../../assets/events-img/c9.jpeg';

export interface ContentItem {
  id: number;
  title: string;
  date: string;
  time: string;
  image: string;
  location: string; // 👈 NUEVA propiedad
}

export const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Concierto de Verano",
    date: "10/06/2025",
    time: "19:00",
    image: Img01,
    location: "Parque Central, Madrid",
  },
  {
    id: 2,
    title: "Festival de Cine",
    date: "12/06/2025",
    time: "20:30",
    image: Img02,
    location: "Teatro Lumière, Barcelona",
  },
  {
    id: 3,
    title: "Feria Gastronómica",
    date: "15/06/2025",
    time: "12:00",
    image: Img03,
    location: "Paseo del Río, Sevilla",
  },
  {
    id: 4,
    title: "Exposición de Arte",
    date: "18/06/2025",
    time: "10:00",
    image: Img04,
    location: "Museo de Arte Moderno, Valencia",
  },
  {
    id: 5,
    title: "Obra de Teatro",
    date: "20/06/2025",
    time: "21:00",
    image: Img05,
    location: "Teatro Real, Madrid",
  },
  {
    id: 6,
    title: "Conferencia de Tecnología",
    date: "22/06/2025",
    time: "09:00",
    image: Img06,
    location: "Palacio de Congresos, Bilbao",
  },
  {
    id: 7,
    title: "Noche de Jazz",
    date: "25/06/2025",
    time: "22:00",
    image: Img07,
    location: "Jazz Club Luna Azul, Granada",
  },
  {
    id: 8,
    title: "Maratón Urbano",
    date: "28/06/2025",
    time: "07:00",
    image: Img08,
    location: "Centro Histórico, Zaragoza",
  },
  {
    id: 9,
    title: "Festival de Fotografía",
    date: "30/06/2025",
    time: "11:00",
    image: Img09,
    location: "Centro Cultural, Málaga",
  },
  {
    id: 10,
    title: "Noche de Estrellas",
    date: "02/07/2025",
    time: "20:00",
    image: Img10,
    location: "Mirador de las Cumbres, Tenerife",
  },
];

export default contentItems;
