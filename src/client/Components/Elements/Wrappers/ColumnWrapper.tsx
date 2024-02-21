import { ReactNode } from "react";

type ColumnWrapperProps = {
  children?: ReactNode;
  justify?: string;
  align?: string;
  gap?: string;
  classname?: string;
};

export default function ColumnWrapper({
  children,
  justify,
  align,
  gap,
  classname
}: ColumnWrapperProps) {
  return (
    <div
      className={`flex flex-col ${justify ? "justify-" + justify : ""} ${
        align ? "content-" + align : ""
      } ${gap ? "gap-" + gap : ""} ${classname ? classname : ""}`}
    >
      {children}
    </div>
  );
}
