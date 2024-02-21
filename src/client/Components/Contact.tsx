import { Route, Routes, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import contactService from "../Services/contactService";
import ContactForm from "./Elements/AdminElements/ContactForm";
import ContactSuccess from "./Elements/AdminElements/ContactSuccess";
import { useState } from "react";
import ErrorBox from "./Elements/ErrorBox";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>();
  const [error, setError] = useState(false);

  const sendContactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: (formData: ContactFormData) => {
      return contactService.sendContactForm(formData);
    },
    onSuccess: () => {
      navigate("/contact/success");
    },
    onError: () => setError(true)
  });

  return (
    <div className="px-4 pb-8 h-max">
      <h1 className="w-[80%] lg:w-[60%] mx-auto">Contact</h1>
      <div className="my-2 border-[1px] px-10 border-slate-200 py-8 w-[80%] lg:w-[60%] mx-auto">
        {error && <ErrorBox text="Please try again." />}
        <Routes>
          <Route
            path="/"
            element={
              <ContactForm
                setFormData={setFormData}
                sendContactMutation={sendContactMutation}
              />
            }
            index
          />
          <Route
            path="/success"
            element={<ContactSuccess formData={formData!} />}
          />
        </Routes>
      </div>
    </div>
  );
}
