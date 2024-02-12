import Button from "./Button";

type ConfirmModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  text: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  confirmCallback: (parameter?: unknown) => void;
};

export default function ConfirmModal({
  refObject,
  text,
  setIsOpen,
  confirmCallback
}: ConfirmModalProps) {
  return (
    <dialog
      ref={refObject}
      className="flex flex-col gap-4 p-4 rounded-sm border-slate-500 backdrop:bg-[#000] backdrop:opacity-50 border-[1px]"
    >
      <h5>{text}</h5>
      <div className="flex flex-row justify-between gap-2">
        <Button
          className="border-slate-600 border-[1px] px-5"
          onClick={() => {
            refObject.current?.close();
            setIsOpen && setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-slate-600 text-white px-5"
          onClick={() => {
            confirmCallback();
            refObject.current?.close();
            setIsOpen && setIsOpen(false);
          }}
        >
          Confirm
        </Button>
      </div>
    </dialog>
  );
}
