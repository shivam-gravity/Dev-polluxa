import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import cx from "classnames";

export const useAutoplay = (
  emblaApi,
  { delay = 4000, stopOnInteraction = true } = {}
) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);
  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay,
      stopOnInteraction,
      stopOnMouseEnter: false,
    })
  );

  const onAutoplayButtonClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback?.();
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    const autoplay = emblaApi.plugins()?.autoplay;
    setAutoplayIsPlaying(autoplay?.isPlaying() ?? false);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("autoplay:play", onSelect);
    emblaApi.on("autoplay:stop", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("autoplay:play", onSelect);
      emblaApi.off("autoplay:stop", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    autoplayIsPlaying,
    autoplayPlugin,
    onAutoplayButtonClick,
  };
};

export const AutoplayButton = (props) => {
  const { onClick, className, children, ...restProps } = props;

  return (
    <button
      className={cx("embla__button embla__button--autoplay", className)}
      type="button"
      onClick={onClick}
      {...restProps}
    >
      {children || (
        <svg className="embla__button__svg" viewBox="0 0 24 24">
          {props.autoplayIsPlaying ? (
            <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          ) : (
            <path fill="currentColor" d="M8 5v14l11-7z" />
          )}
        </svg>
      )}
    </button>
  );
};
