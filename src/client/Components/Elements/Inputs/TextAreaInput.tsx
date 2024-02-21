import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  refObject?: React.RefObject<HTMLTextAreaElement>;
  className?: string;
}

export default function TextAreaInput({
  refObject,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      ref={refObject}
      className={`rounded-sm border-[1px] border-slate-200 focus:border-[2px] focus-visible:border-slate-400 focus-visible:outline-0 px-1 ${className}`}
      {...rest}
    ></textarea>
  );
}
