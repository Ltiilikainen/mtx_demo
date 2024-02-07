import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextInput from "./TextInput.js";
import DOMPurify from "dompurify";
import Button from "./Button.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryClient } from "../../main.js";
import newsFeedServices from "../../Services/newsFeedServices.js";

type NewsPostFormProps = {
  id?: string;
  defaultTitle?: string;
  defaultBody?: string;
};

export default function NewsPostForm({
  id,
  defaultTitle,
  defaultBody
}: NewsPostFormProps) {
  const [blogTitle, setBlogTitle] = useState(defaultTitle || "");
  const [blogBody, setBlogBody] = useState(defaultBody || "");

  const addNewsMutation = useMutation({
    mutationKey: ["newsAdd"],
    mutationFn: () => {
      return newsFeedServices.postNews({
        body: blogBody,
        title: blogTitle
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      navigate(`/news/${data._id}`);
    }
  });

  const editNewsMutation = useMutation({
    mutationKey: ["newsEdit", id],
    mutationFn: () => {
      if (blogTitle === "" && blogBody === "")
        throw new Error("Title and body cannot be empty");
      const infoObject = { title: blogTitle, body: blogBody };
      if (infoObject.title === "")
        Object.entries(infoObject).filter(([key]) => key != "title");
      if (infoObject.body === "")
        Object.entries(infoObject).filter(([key]) => key != "body");

      /**
       * Edit mutation is only called if the id exists so the id can be asserted as "not undefined"
       */
      return newsFeedServices.updateNews(id!, infoObject);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      navigate(`/news/${data._id}`);
    }
  });

  const navigate = useNavigate();

  const quillRef = useRef<ReactQuill>(null);

  const [blogPreview, setBlogPreview] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [3, 4, 5, false] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ]
  };

  return (
    <div className="w-full py-4 px-8 h-[80%] md:w-[75%] mx-auto">
      {quillRef.current && blogPreview ? (
        /*Editor is in Preview mode*/
        <>
          <h2>{blogTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogBody)
            }}
          />
        </>
      ) : (
        /*Editor is in Edit Mode*/
        <>
          <TextInput
            id="blogTitle"
            className="text-xl mb-4"
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Blog Title"
          />
          <div className="h-[75%] mb-28 md:mb-20">
            <ReactQuill
              id="blogText"
              className="h-full"
              ref={quillRef}
              value={blogBody}
              onChange={setBlogBody}
              theme="snow"
              placeholder="Blog text"
              modules={modules}
            />
          </div>
        </>
      )}
      <div className="flex justify-between mt-4">
        <Button
          className="bg-slate-600 text-white px-5"
          onClick={() => {
            setBlogPreview(!blogPreview);
          }}
        >
          {blogPreview ? "Edit" : "Preview"}
        </Button>
        <Button
          className="border-slate-600 border-[1px] px-5"
          onClick={() => {
            if (id) editNewsMutation.mutate();
            else addNewsMutation.mutate();
          }}
        >
          Submit
        </Button>
      </div>
      {addNewsMutation.isError ||
        (editNewsMutation.isError && (
          <div className="my-4 mx-auto border-[1px] border-red-600 bg-red-200 text-red-900 rounded-sm">
            <p>An error occurred</p>
          </div>
        ))}
    </div>
  );
}
