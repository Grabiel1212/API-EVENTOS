import Img02 from '../../../assets/events-img/ev02.jpg';
import Img03 from '../../../assets/events-img/ev03.jpg';
import Img05 from '../../../assets/events-img/ev05.jpg';
import Img06 from '../../../assets/events-img/ev06.jpg';
import Img07 from '../../../assets/events-img/ev07.jpg';

export interface CarouselItem {
  name: string;
  image: string; 
}

export const carouselItems: CarouselItem[] = [
  {
    name: "Sexta imagen",
    image: Img06,
  },
  {
    name: "Segunda imagen",
    image: Img02,
  },
  {
    name: "Tercera imagen",
    image: Img03,
  },
  {
    name: "Cuarta imagen",
    image: Img07,
  },
 
  
  {
    name: "Quinta imagen",
    image: Img05,
  },
];

export default carouselItems;
