import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import type { CarouselItem } from "../../hooks/carousel/carouselItems";
import carouselItems from "../../hooks/carousel/carouselItems";

function CarouselComponent() {
    return (
        <Carousel
            autoPlay
            interval={4000}
            animation="slide" // transición más dinámica que "fade"
            indicators={true}
            navButtonsAlwaysVisible={false}
            swipe={true}
            duration={700}
        >
            {carouselItems.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

interface ItemProps {
    item: CarouselItem;
}

function Item({ item }: ItemProps) {
    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: 0, // sin bordes redondeados
                overflow: "hidden",
                height: { xs: 250, sm: 350, md: 450 },
            }}
        >
            <Box
                component="img"
                src={item.image}
                alt=""
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                        transform: "scale(1.02)", // efecto sutil al pasar el mouse
                    },
                }}
            />
        </Paper>
    );
}

export default CarouselComponent;
