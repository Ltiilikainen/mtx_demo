import Button from "./Button";
import ColumnWrapper from "./Wrappers/ColumnWrapper";
import RowWrapper from "./Wrappers/RowWrapper";

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
      <ColumnWrapper
        gap="2"
        className="py-2 px-4 bg-white"
      >
        <h5 className="w-full text-center">{text}</h5>
        {subtitle && <p className="mx-4">{subtitle}</p>}
        <RowWrapper
          breakPoint="xs"
          className="px-8"
          justify="between"
          gap="2"
        >
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
        </RowWrapper>
      </ColumnWrapper>
    </dialog>
  );
}
