import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className: string;
  children?: React.ReactNode;
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`${className} rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
}
