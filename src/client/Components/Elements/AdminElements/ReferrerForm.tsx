import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextInput from "../Inputs/TextInput";
import { useState } from "react";
import referrersServices from "../../../Services/referrersServices";
import { useNavigate } from "react-router";
import Button from "../Button";
import ReferrerThumbnail from "../ReferrerThumbnail";
import uploadServices from "../../../Services/uploadServices";
import ErrorBox from "../ErrorBox";

type RefFormProps = {
  id?: string;
  referrer?: Referrer;
};

export default function ReferrerForm({ id, referrer }: RefFormProps) {
  const [refImage, setRefImage] = useState<File | null>(null);
  const [refName, setRefName] = useState(referrer?.refName || "");
  const [refAffiliation, setRefAffiliation] = useState(
    referrer?.affiliation || ""
  );
  const [refContent, setRefContent] = useState(referrer?.content || "");
  const [previewImgPath, setPreviewImgPath] = useState(
    referrer?.image?.path || ""
  );
  const [refPreview, setRefPreview] = useState(false);

  const queryClient = useQueryClient();

  const addRefMutation = useMutation({
    mutationKey: ["refAdd"],
    mutationFn: async () => {
      if (refImage) {
        const formData = new FormData();
        formData.append("img", refImage);
        const upload = await uploadServices.addUpload(formData, "image");

        return referrersServices.addReferrer({
          refName,
          affiliation: refAffiliation,
          content: refContent,
          image: (upload as Upload)._id
        });
      }
      return referrersServices.addReferrer({
        refName,
        affiliation: refAffiliation,
        content: refContent
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrers"] });
      navigate(`/references`);
    }
  });

  const editRefMutation = useMutation({
    mutationKey: ["refEdit", id],
    mutationFn: async () => {
      if (
        refName === "" &&
        refAffiliation === "" &&
        refContent === "" &&
        refImage === null
      )
        throw new Error(
          "Name, affiliation and Content and Image cannot all be empty"
        );
      if (refImage) {
        const formData = new FormData();
        formData.append("img", refImage);
        const upload = await uploadServices.addUpload(formData, "image");

        referrer!.image &&
          (await uploadServices.deleteUpload(referrer?.image._id));

        const infoObject = {
          refName: refName,
          affiliation: refAffiliation,
          content: refContent,
          image: (upload as Upload)._id
        };
        if (infoObject.refName === "")
          Object.entries(infoObject).filter(([key]) => key != "refName");
        if (infoObject.affiliation === "")
          Object.entries(infoObject).filter(([key]) => key != "affiliation");
        if (infoObject.content === "")
          Object.entries(infoObject).filter(([key]) => key != "content");

        /**
         * Edit mutation is only called if the id exists so the id can be asserted as "not undefined"
         */
        return referrersServices.updateReferrer(id!, infoObject);
      }
      const infoObject = {
        refName: refName,
        affiliation: refAffiliation,
        content: refContent
      };
      if (infoObject.refName === "")
        Object.entries(infoObject).filter(([key]) => key != "refName");
      if (infoObject.affiliation === "")
        Object.entries(infoObject).filter(([key]) => key != "affiliation");
      if (infoObject.content === "")
        Object.entries(infoObject).filter(([key]) => key != "content");

      /**
       * Edit mutation is only called if the id exists so the id can be asserted as "not undefined"
       */
      return referrersServices.updateReferrer(id!, infoObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrers"] });
      navigate(`/references`);
    }
  });

  const navigate = useNavigate();

  return (
    <div className={"my-8 mx-auto w-[90%] md:w-[70%] flex flex-col gap-4"}>
      {refPreview ? (
        <div className="mx-auto">
          <ReferrerThumbnail
            referrer={{
              _id: "",
              image: previewImgPath,
              refName,
              affiliation: refAffiliation,
              content: refContent
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col  w-full items-center">
            <div className="w-20 h-20 bg-slate-300 rounded-full overflow-hidden">
              {previewImgPath !== "" && (
                <img
                  src={previewImgPath}
                  className="object-cover"
                  onDrop={() => {
                    if (!previewImgPath.includes("/foldername")) {
                      URL.revokeObjectURL(previewImgPath);
                    }
                  }}
                />
              )}
            </div>
            <label
              htmlFor="refImage"
              className="border-slate-600 border-[1px] px-5 rounded-md my-4"
            >
              Add Image
            </label>
            <input
              id="refImage"
              name="img"
              type="file"
              className="h-0 w-0 hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setRefImage(e.target.files[0]);
                  setPreviewImgPath(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <TextInput
            id="refName"
            placeholder="Referrer name"
            value={refName}
            onChange={(e) => setRefName(e.target.value)}
            className="text-xl py-1 px-2"
          />
          <TextInput
            id="refAffiliation"
            placeholder="Referrer affiliation"
            value={refAffiliation}
            onChange={(e) => setRefAffiliation(e.target.value)}
            className="py-2 px-4"
          />
          <textarea
            id="refContent"
            placeholder="Reference content"
            value={refContent}
            onChange={(e) => setRefContent(e.target.value)}
            className="border-[1px] border-slate-200 rounded-sm py-2 px-4"
          ></textarea>
        </>
      )}

      <div className="flex justify-between mt-4">
        <Button
          className="bg-slate-600 text-white px-5"
          onClick={() => {
            setRefPreview(!refPreview);
          }}
        >
          {refPreview ? "Edit" : "Preview"}
        </Button>
        <Button
          className="border-slate-600 border-[1px] px-5"
          onClick={() => {
            if (id) editRefMutation.mutate();
            else addRefMutation.mutate();
          }}
        >
          Submit
        </Button>
      </div>
      {addRefMutation.isError ||
        (editRefMutation.isError && <ErrorBox text="Please try again." />)}
    </div>
  );
}
