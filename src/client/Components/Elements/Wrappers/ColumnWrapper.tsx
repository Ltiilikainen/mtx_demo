import { DetailedHTMLProps, ReactNode } from "react";

interface ColumnWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  justify?:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
  align?:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "baseline"
    | "evenly"
    | "stretch";
  gap?: string;
  className?: string;
}

export default function ColumnWrapper({
  children,
  justify,
  align,
  gap,
  className,
  ...rest
}: ColumnWrapperProps) {
  return (
    <div
      className={`flex flex-col ${justify ? `justify-${justify}` : ""} ${
        align ? `content-${align}` : ""
      } ${gap ? `gap-${gap}` : ""} 
      ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
