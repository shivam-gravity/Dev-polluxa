import { useMemo } from "react";
import { DotButton, useDotButton } from "./DotButtons/EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ArrowButtons/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplay } from "./Autoplay/EmblaCarouselAutoplay";
import cx from "classnames";
import { useLocale } from "next-intl";

const EmblaCarousel = (props) => {

  const locale = useLocale();
  const isRtl = locale === "ar";

  const {
    items = [],
    renderItem,
    options = {},
    showArrows = true,
    showDots = true,
    slidesToShow = 1,
    slidesToScroll = 1,
    breakpoints = {},
    loop = false,
    autoplay = false,
    autoplayDelay = 4000,
    stopAutoplayOnInteraction = true,
  } = props;


  const { autoplayPlugin } = useAutoplay(null, {
    delay: autoplayDelay,
    stopOnInteraction: stopAutoplayOnInteraction,
  });

  // calculating manually how many items to duplicate for smooth looping
  const processedItems = useMemo(() => {
    if (!loop || items.length === 0) return items;

    const itemsToShow =
      Object.keys(breakpoints).length > 0
        ? Math.max(...Object.values(breakpoints).map((b) => b.slidesToShow))
        : slidesToShow;

    const duplicateCount = Math.min(itemsToShow, items.length);
    const duplicatedItems = items.slice(0, duplicateCount);

    return [...items, ...duplicatedItems];
  }, [items, loop, breakpoints, slidesToShow]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      align: "start",
      dragFree: true,
      containScroll: false,
      loop: loop,
      slidesToScroll: slidesToScroll,
      direction: isRtl ? "rtl" : "ltr",
      breakpoints:
        Object.keys(breakpoints).length > 0 ? breakpoints : undefined,
      ...(Object.keys(breakpoints).length === 0 && { slidesToShow }),
    },
    autoplay ? [autoplayPlugin] : []
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (!renderItem) {
    console.warn("EmblaCarousel renderItem prop is required");
    return null;
  }

  return (
    <div
      className={cx("embla", {
        "embla--no-arrows": !showArrows,
        "embla--no-dots": !showDots,
      })}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {processedItems.map((item, index) => (
            <div
              key={`${item?.id || index}-${index}`}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_25%] px-8"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={!loop && prevBtnDisabled}
            isRtl
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={!loop && nextBtnDisabled}
          />
        </div>
      )}

      {showDots && (
        <div className="embla__dots">
          {scrollSnaps.slice(0, items.length).map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cx("embla__dot", {
                "embla__dot--selected": index === selectedIndex % items.length,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
