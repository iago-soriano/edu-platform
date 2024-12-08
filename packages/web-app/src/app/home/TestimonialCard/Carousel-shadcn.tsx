"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
} from "@components/ui/Carousel";
import { TestimonialCard } from ".";

export const TestimonialsCarousel = () => {
  return (
    <Carousel
      plugins={[
        AutoScroll({
          speed: 1,
        }),
      ]}
      carouselOptions={{
        loop: true,
      }}
    >
      <CarouselMainContainer className="h-60 gap-8">
        {[<TestimonialCard />, <TestimonialCard />, <TestimonialCard />].map(
          (card, index) => (
            <SliderMainItem className="bg-transparent" key={index}>
              {card}
            </SliderMainItem>
          )
        )}
      </CarouselMainContainer>
    </Carousel>
  );
};
