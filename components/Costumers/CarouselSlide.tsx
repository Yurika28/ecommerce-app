// src/components/EmblaCarousel.tsx
'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { CommentCard } from './Comment'
import { Comment } from '../UI/type'
import { PrevButton, NextButton, usePrevNextButtons } from './Arrow'
import { QuotationMarkIcon } from  "@sidekickicons/react/24/solid";




type PropType = {
  comments: Comment[]
  options?: EmblaOptionsType
}

export const EmblaCarousel = ({ comments, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla max-w-[100rem] mx-auto my-8 px-4">
      <div className='mb-4 flex items-center justify-between w-full h-[6rem]'>
      <div className="flex items-center gap-4">
        <div className="relative w-[5rem] h-[5rem]">
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-amber-200">
            <QuotationMarkIcon className="size-15 text-black absolute top-2 left-2" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          WHATS OUR CUSTOMERS <br /> ARE SAYING?
        </h2>
      </div>
        <div className="embla__controls flex justify-end gap-4">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      

      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex select-none touch-pan-y -ml-[1rem]">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="embla__slide flex-[0_0_100%] min-w-0 pl-[1rem] sm:flex-[0_0_50%] sm:pl-[1.6rem] xl:flex-[0_0_calc(100%/3)] xl:pl-[2rem]"
            >
              <CommentCard comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}