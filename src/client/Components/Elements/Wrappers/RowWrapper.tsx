import { DetailedHTMLProps, ReactNode } from "react";
interface RowWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  breakPoint: "xs" | "sm" | "md" | "lg" | "xl";
  children: ReactNode;
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
  classname?: string;
}

export default function RowWrapper({
  breakPoint,
  children,
  justify,
  align,
  gap,
  className,
  ...rest
}: RowWrapperProps) {
  return (
    <div
      className={`${breakPoint === "xs" ? "xs-row" : ""} ${
        //the breakpoint class conditionals need to be declared one at a time to work correctly
        breakPoint === "sm" ? "sm-row" : ""
      } ${breakPoint === "md" ? "md-row" : ""} ${
        breakPoint === "lg" ? "lg-row" : ""
      } ${breakPoint === "xl" ? "xl-row" : ""}   ${
        justify ? `justify-${justify}` : ""
      } ${align ? `content-${align}` : ""} ${gap ? `gap-${gap}` : ""} 
      ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
