'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './useDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import Slides from './Slides'

const options: EmblaOptionsType = { loop: false };

const EmblaCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="embla relative w-full px-4 py-2">
      
      <div className="embla__viewport overflow-hidden h-[22rem]" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {Slides.map((slideContent, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 h-full flex items-center justify-center transition-colors duration-300"
            >
              {typeof slideContent === 'string' ? (
                <div className="text-white text-4xl font-bold drop-shadow-lg">
                  {slideContent}
                </div>
              ) : (
                slideContent
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls absolute bottom-4 left-1/2 -translate-x-1/2 transform flex justify-center items-center gap-2"> 
        {scrollSnaps.map((_: unknown, index: number) => ( 
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-4 h-4 rounded-full border-2 border-gray-400 transition-colors duration-200 focus:outline-none ${
              index === selectedIndex
              ? 'bg-gray-900 border-gray-900'
              : 'bg-gray-300 border-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
