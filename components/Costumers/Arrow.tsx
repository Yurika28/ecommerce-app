import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = ({ children, ...restProps }) => {
  return (
    <button
      className="embla__button embla__button--prev flex items-center gap-1 px-5 py-1 rounded-full border-1 border-amber-200 hover:bg-amber-200"
      type="button"
      {...restProps}
    >
      <ArrowLongLeftIcon className="w-6 h-6 text-gray-800" />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = ({ children, ...restProps }) => {
  return (
    <button
      className="embla__button embla__button--next flex items-center gap-1 px-5 py-1 rounded-full border-1 border-amber-200 hover:bg-amber-200"
      type="button"
      {...restProps}
    >
      {children}
      <ArrowLongRightIcon className="w-6 h-6 text-gray-800" />
    </button>
  )
}
