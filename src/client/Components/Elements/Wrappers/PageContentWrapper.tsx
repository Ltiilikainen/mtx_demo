import { ReactNode } from "react";

type PageContentWrapperProps = {
  children: ReactNode;
  pageTitle?: string;
  customWidth?: string;
  classname?: string;
};

export default function PageContentWrapper({
  children,
  pageTitle,
  customWidth,
  classname
}: PageContentWrapperProps) {
  return (
    <div
      className={`px-4 ${
        customWidth ? customWidth : "w-[80%] lg:w-[60%]"
      } mx-auto pt-2 pb-4 flex flex-col ${classname ? classname : ""}`}
    >
      {pageTitle && <h1>{pageTitle}</h1>}
      {children}
    </div>
  );
}
