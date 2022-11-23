import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./rounxCarousal.css";

const mediaByIndex = [
  "/images/screenshot-1.png",
  "/images/screenshot-1.png",
  "/images/screenshot-1.png"
];

const EmblaCarousel = () => {
  const [viewportRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {mediaByIndex.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={image}
                alt="A cool cat."
              />
            </div>
          ))}
        </div>
      </div>
      {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
    </div>
  );
};

export default EmblaCarousel;
