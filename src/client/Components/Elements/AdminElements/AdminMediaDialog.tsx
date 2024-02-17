import MaterialSymbolsCloseRounded from "../../Icons/MaterialSymbolsCloseRounded";

type AdminMediaDialogProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  media: Upload;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminMediaDialog({
  media,
  refObject
}: AdminMediaDialogProps) {
  return (
    <dialog
      ref={refObject}
      className="relative bg-transparent h-[max-content] w-[max-content] max-h-[90%] mx-auto backdrop:bg-[#000] backdrop:opacity-50 border-[1px] border-slate-600"
    >
      <div
        className="absolute top-1 right-1 text-slate-500 text-2xl cursor-pointer"
        onClick={() => refObject.current?.close()}
      >
        <MaterialSymbolsCloseRounded />
      </div>
      <img
        src={media.path}
        style={{ height: "100%", width: "100%", maxHeight: "80vh" }}
      />
    </dialog>
  );
}
