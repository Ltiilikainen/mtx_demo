import Button from "./Button";

type ConfirmModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  text: string;
  subtitle?: string;
  confirmCallback: (parameter?: unknown) => void;
};

export default function ConfirmModal({
  refObject,
  text,
  subtitle,
  confirmCallback
}: ConfirmModalProps) {
  return (
    <dialog
      ref={refObject}
      className="relative bg-transparent h-[max-content] w-[max-content] max-h-[90%] mx-auto backdrop:bg-[#000] backdrop:opacity-50 border-[1px] border-slate-600"
    >
      <div className="py-2 px-4 bg-white flex flex-col gap-2">
        <h5 className="w-full text-center">{text}</h5>
        {subtitle && <p className="mx-4">{subtitle}</p>}
        <div className="flex flex-row justify-between gap-2 px-8">
          <Button
            className="border-slate-600 border-[1px] px-5"
            onClick={() => {
              refObject.current?.close();
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-slate-600 text-white px-5"
            onClick={() => {
              confirmCallback();
              refObject.current?.close();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </dialog>
  );
}
