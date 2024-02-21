import { DetailedHTMLProps, ReactNode } from "react";

interface ColumnWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  justify?: string;
  align?: string;
  gap?: string;
  classname?: string;
}

export default function ColumnWrapper({
  children,
  justify,
  align,
  gap,
  classname,
  ...rest
}: ColumnWrapperProps) {
  return (
    <div
      className={`flex flex-col ${justify ? "justify-" + justify : ""} ${
        align ? "content-" + align : ""
      } ${gap ? "gap-" + gap : ""} ${classname ? classname : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
