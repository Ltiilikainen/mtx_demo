import { DetailedHTMLProps, ReactNode } from "react";

interface PageContentWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  pageTitle?: string;
  customWidth?: string;
  classname?: string;
}

export default function PageContentWrapper({
  children,
  pageTitle,
  customWidth,
  classname,
  ...rest
}: PageContentWrapperProps) {
  return (
    <div
      className={`px-4 ${
        customWidth ? customWidth : "w-[80%] lg:w-[60%]"
      } mx-auto pt-2 pb-4 flex flex-col ${classname ? classname : ""}`}
      {...rest}
    >
      {pageTitle && <h1>{pageTitle}</h1>}
      {children}
    </div>
  );
}
