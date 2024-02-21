import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface DateInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  refObject?: React.RefObject<HTMLInputElement>;
  value?: string;
  className?: string;
}

export default function DateInput({
  refObject,
  value,
  placeholder,
  className,
  ...rest
}: DateInputProps) {
  return (
    <input
      ref={refObject}
      type="date"
      value={value}
      className={`rounded-sm border-[1px] border-slate-200 focus:border-[2px] focus-visible:border-slate-400 focus-visible:outline-0 px-1 ${
        value ? "text-black" : "text-slate-400"
      } ${className}`}
      {...rest}
    />
  );
}
