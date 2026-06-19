import { forwardRef } from "react";
import cx from "classnames";

export const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  paragraph: "h6",
  body1: "p",
  caption: "p",
  button1: "span",
  button2: "span",
  link1: "span",
  link2: "span",
  gradient: "div",
  gradient2: "div",
  heading1: "div",
  heading2: "div",
  heading4: "div",
  heading5: "div",
};

export const typographyClasses = {
  h1: "text-4xl leading-[48px] md:text-5xl md:leading-[62px] font-bold tracking-normal",
  h2: "text-4xl font-bold tracking-normal leading-[48px]",
  h3: "text-2xl font-bold tracking-normal",
  h4: "text-base/5.5 font-semibold tracking-normal",
  h5: "text-2xs/4 font-semibold uppercase tracking-normal",
  h6: "text-2xs/4 font-semibold tracking-normal",
  paragraph: "text-2xs/5.5 tracking-normal",
  body1: "text-base md:text-lg 2xl:text-2xl tracking-normal text-[#202529]",
  body2: "text-lg tracking-normal text-[#202529]",
  caption: "text-xs/3.5 tracking-normal",
  button1: "text-2xs/4 uppercase font-semibold tracking-normal",
  button2: "text-xxs/4 uppercase font-semibold tracking-normal",
  link1: "text-2xs/4 font-semibold underline tracking-normal",
  link2: "text-xs/3.5 font-semibold underline text-iron tracking-normal",
  badge: "text-[0.625rem]/3 font-semibold uppercase text-iron tracking-normal",
  gradient:
    "inline-block bg-gradient-to-r from-[#123EAF] to-[#07B0F5] bg-clip-text text-transparent uppercase font-bold text-base text-xs md:text-xl 2xl:text-2xl tracking-widest",
  gradient2:
    "inline-block bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] bg-clip-text text-transparent font-bold text-lg 2xl:text-2xl",
  heading1:
    "py-4 md:py-8 text-base md:text-4xl md:leading-[44px] 2xl:text-5xl 2xl:leading-[62px] font-medium tracking-normal",
  heading2:
    "text-xs md:text-xl 2xl:text-2xl tracking-widest text-center uppercase",
  heading4: "text-xl md:text-2xl leading-9 font-bold tracking-normal",
  heading5:
    "text-xl leading-8 md:text-xl 2xl:text-2xl md:leading-9 font-semibold tracking-normal",
  title:
    "inline-block text-[#333333] uppercase font-bold text-base text-xs md:text-xl 2xl:text-2xl tracking-widest",
};

const Typography = forwardRef(function Typography(props, ref) {
  const {
    align = "inherit",
    className: classNameProp,
    component,
    gutterBottom = false,
    paragraph = false,
    variant = "body1",
    ...other
  } = props;

  const Component =
    component || (paragraph ? "p" : variantMapping[variant]) || "span";

  const className = cx(
    typographyClasses[variant] || typographyClasses.body1,
    // fontFamily,
    {
      "text-center": align === "center",
      "mb-4": gutterBottom,
    },
    classNameProp
  );

  return <Component ref={ref} className={className} {...other} />;
});

export default Typography;
