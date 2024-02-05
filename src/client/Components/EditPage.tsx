import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextInput from "./Elements/TextInput";
import DOMPurify from "dompurify";
import Button from "./Elements/Button";
import { useMutation } from "@tanstack/react-query";
import newsFeedServices from "../Services/newsFeedServices";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

export default function EditPage() {
  const quillRef = useRef<ReactQuill>(null);

  const [blogPreview, setBlogPreview] = useState(false);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogPost, setBlogPost] = useState("");

  const modules = {
    toolbar: [
      [{ header: [3, 4, 5, false] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ]
  };

  const addNewsMutation = useMutation({
    mutationKey: ["news"],
    mutationFn: () => {
      return newsFeedServices.postNews({ body: blogPost, title: blogTitle });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      navigate(`/news/${data._id}`);
    }
  });

  const navigate = useNavigate();

  return (
    <div className="w-full py-4 px-8 h-[80%] md:w-[75%] mx-auto">
      {quillRef.current && blogPreview ? (
        /*Editor is in Preview mode*/
        <>
          <h2>{blogTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogPost)
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
              value={blogPost}
              onChange={setBlogPost}
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
            addNewsMutation.mutate();
          }}
        >
          Submit
        </Button>
      </div>
      {addNewsMutation.isError && (
        <div className="my-4 mx-auto border-[1px] border-red-600 bg-red-200 text-red-900 rounded-sm">
          <p>An error occurred</p>
        </div>
      )}
    </div>
  );
}
