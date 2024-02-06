import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  refObject?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export default function TextInput({
  refObject,
  className,
  ...rest
}: TextInputProps) {
  return (
    <input
      ref={refObject}
      className={`rounded-sm border-[1px] border-slate-200 focus:border-[2px] focus-visible:border-slate-400 focus-visible:outline-0 px-1 ${className}`}
      {...rest}
    />
  );
}
