import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariant = cva("", {
  variants: {
    size: {
      xs: "py-1 px-1",
      sm: "px-14 py-1.5",
      md: "px-28 py-2.5",
    },
    font: {
      default: "text-xs",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    font: "default",
    size: "xs",
  },
});

export type ButtonVariant = VariantProps<typeof buttonVariant> &
  ComponentProps<"button">;
type buttonProps = {
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
  label?: string;
  imgClassName?: string;
} & ButtonVariant;

function Button({
  size,
  className,
  imgSrc,
  imgAlt,
  label,
  font,
  imgClassName,
  ...props
}: buttonProps) {
  return (
    <button
      className={`${buttonVariant({
        size,
        className,
      })} group`}
      {...props}
    >
      {imgSrc && (
        <img
          className={`group-hover:bg-gray-300 group-hover:rounded-md group-hover:shadow-md p-1 ${imgClassName}`}
          src={imgSrc}
          alt={imgAlt}
        />
      )}
      {label && <span className={buttonVariant({ font })}>{label}</span>}
    </button>
  );
}

export default Button;
