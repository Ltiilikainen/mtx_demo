import NewsThumbnail from "../NewsThumbnail";
import Button from "../Button";
import ConfirmModal from "../ConfirmModal";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newsFeedServices from "../../../Services/newsFeedServices";

export default function AdminNewsThumb({ item }: { item: News }) {
  const navigate = useNavigate();
  const confirmModal = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteNews"],
    mutationFn: (id: string) => {
      return newsFeedServices.deleteNews(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    }
  });
  return (
    <>
      <div className="flex gap-2 mx-4">
        <NewsThumbnail newsItem={item} />
        <div className="flex flex-col gap-2">
          <Button
            className="border-slate-600 border-[1px] px-5"
            onClick={() => navigate("/adminhub/news/" + item._id)}
          >
            Edit
          </Button>
          <Button
            className="border-red-500 bg-red-200 border-[1px] px-5"
            onClick={() => {
              confirmModal.current?.showModal();
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <ConfirmModal
        refObject={confirmModal}
        text="Are you sure you wish to delete this post?"
        subtitle="Any attached media files will need to be deleted separately"
        confirmCallback={() => {
          deleteMutation.mutate(item._id);
        }}
      />
    </>
  );
}
