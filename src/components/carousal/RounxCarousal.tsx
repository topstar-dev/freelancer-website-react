import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./rounxCarousal.css";

const mediaByIndex = [
  "/images/screenshot-1.png",
  "/images/screenshot-2.png",
  "/images/screenshot-3.png"
];

const EmblaCarousel = () => {
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false },
      //@ts-ignore
      (emblaRoot: any) => emblaRoot.parentElement
    )
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {mediaByIndex.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={image}
                alt="Rounx"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
