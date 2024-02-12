import ReferrerThumbnail from "./ReferrerThumbnail";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { queryClient } from "../../main";
import { useMutation } from "@tanstack/react-query";
import newsFeedServices from "../../Services/newsFeedServices";
import referrersServices from "../../Services/referrersServices";

export default function AdminRefThumb({ item }: { item: Referrer }) {
  const navigate = useNavigate();
  const confirmModal = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationKey: ["deleteRefs", item._id],
    mutationFn: (id: string) => {
      return referrersServices.deleteReferrer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrers"] });
    }
  });
  return (
    <>
      <div className="flex gap-2 mx-4">
        <ReferrerThumbnail referrer={item} />
        <div className="flex flex-col gap-2">
          <Button
            className="border-slate-600 border-[1px] px-5"
            onClick={() => navigate("/adminhub/referrer/" + item._id)}
          >
            Edit
          </Button>
          <Button
            className="border-red-500 bg-red-200 border-[1px] px-5"
            onClick={() => {
              setIsOpen(true);
              confirmModal.current?.showModal();
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {
        /**
         * Additional piece of logic to keep modal from spawning on map
         */
        isOpen && (
          <ConfirmModal
            refObject={confirmModal}
            text="Are you sure you wish to delete this post?"
            setIsOpen={setIsOpen}
            confirmCallback={() => {
              deleteMutation.mutate(item._id);
            }}
          />
        )
      }
    </>
  );
}
