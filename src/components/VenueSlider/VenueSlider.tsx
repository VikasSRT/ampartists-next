import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import pachaIbizaLogo from "../../assets/images/Pacha-Ibiza.png";
import blueMarlinIbizaLogo from "../../assets/images/Blue-Marlin-ibiza.png";
import nikkiBeach from "../../assets/images/Nikki-Beach.png";

// Since we can't download the actual logos, I'll use placeholder images for now
// In a real implementation, you would replace these with the actual logo imports
const venueLogos = [
  {
    name: "Pacha Ibiza",
    src: pachaIbizaLogo,
    alt: "Pacha Ibiza logo",
  },
  {
    name: "Nikki Beach",
    src: nikkiBeach,
    alt: "Nikki Beach logo",
  },
  {
    name: "Blue Marlin Ibiza",
    src: blueMarlinIbizaLogo,
    alt: "Blue Marlin Ibiza logo",
  },
];

export const VenueSlider = () => {
  return (
    <section className="py-8 sm:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Trusted by premium venues
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {venueLogos.map((logo, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3"
              >
                <div className="flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
            {/* Duplicate logos for seamless loop */}
            {venueLogos.map((logo, index) => (
              <CarouselItem
                key={`duplicate-${index}`}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3"
              >
                <div className="flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
