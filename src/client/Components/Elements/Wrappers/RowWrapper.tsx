import { ReactNode } from "react";

type RowWrapperProps = {
  children?: ReactNode;
  justify?: string;
  align?: string;
  gap?: string;
  classname?: string;
};

export default function RowWrapper({
  children,
  justify,
  align,
  gap,
  classname
}: RowWrapperProps) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        justify ? "md:justify-" + justify : ""
      } ${align ? "md:content-" + align : ""} ${gap ? "gap-" + gap : ""} ${
        classname ? classname : ""
      }`}
    >
      {children}
    </div>
  );
}
