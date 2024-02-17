import { useEffect, useRef } from "react";
import AdminMediaDialog from "./AdminMediaDialog";
import ConfirmModal from "../ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadServices from "../../../Services/uploadServices";
import MaterialSymbolsDeleteRounded from "../../Icons/MaterialSymbolsDeleteRounded";

export default function AdminMediaThumb({ media }: { media: Upload }) {
  const displayDialog = useRef<HTMLDialogElement>(null);
  const confirmDialog = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();

  const handleMediaDeletion = useMutation({
    mutationKey: ["delete-upload", media._id],
    mutationFn: () => {
      return uploadServices.deleteUpload(media._id, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mediaquery"]
      });
    }
  });

  return (
    <>
      <div className="relative h-40 w-40 rounded-md border-[1px] border-slate-200 overflow-hidden">
        <div
          className="absolute top-[0.5rem] right-[0.5rem] cursor-pointer text-xl text-slate-600"
          onClick={() => confirmDialog.current?.showModal()}
        >
          <MaterialSymbolsDeleteRounded />
        </div>
        <img
          src={media.path}
          style={{ minHeight: "100%", minWidth: "100%", objectFit: "cover" }}
          onClick={() => displayDialog.current?.showModal()}
        />
      </div>

      <AdminMediaDialog
        media={media}
        refObject={displayDialog}
      />

      <ConfirmModal
        refObject={confirmDialog}
        text="Delete upload?"
        subtitle="Any news posts featuring the deleted upload will need to be edited manually."
        confirmCallback={() => handleMediaDeletion.mutate()}
      />
    </>
  );
}
