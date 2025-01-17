import { cva, VariantProps } from "class-variance-authority";

const buttonVariant = cva("", {
  variants: {
    size: {
      xs: "py-0 px-0",
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

export type ButtonVariant = VariantProps<typeof buttonVariant>;
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
      className={buttonVariant({
        size,
        className,
      })}
      {...props}
    >
      {imgSrc && <img className={imgClassName} src={imgSrc} alt={imgAlt} />}
      {label && <span className={buttonVariant({ font })}>{label}</span>}
    </button>
  );
}

export default Button;
