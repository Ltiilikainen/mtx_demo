import Button from "./Button";

type ConfirmModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement>;
  text: string;
  onCancel?: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  refObject,
  text,
  onCancel,
  onConfirm
}: ConfirmModalProps) {
  return (
    <dialog
      ref={refObject}
      className="flex flex-col gap-4 p-4"
    >
      <h5>{text}</h5>
      <div className="flex flex-row justify-between gap-2">
        <Button
          className="bg-slate-600 text-white px-5"
          onClick={() => {
            onCancel && onCancel();
            refObject.current.close();
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-slate-600 text-white px-5"
          onClick={() => {
            onConfirm();
            refObject.current.close();
          }}
        >
          Confirm
        </Button>
      </div>
    </dialog>
  );
}
