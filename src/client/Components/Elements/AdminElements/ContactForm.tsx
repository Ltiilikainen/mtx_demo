import { useRef, useState } from "react";
import Button from "../Button";
import TextAreaInput from "../Inputs/TextAreaInput";
import TextInput from "../Inputs/TextInput";
import DateInput from "../Inputs/DateInput";
import { UseMutationResult } from "@tanstack/react-query";
import RowWrapper from "../Wrappers/RowWrapper";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

type ContactFormProps = {
  setFormData: React.Dispatch<
    React.SetStateAction<ContactFormData | undefined>
  >;
  sendContactMutation: UseMutationResult<any, Error, ContactFormData, unknown>;
};

export default function ContactForm({
  setFormData,
  sendContactMutation
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = formRef.current?.checkValidity();

    if (!isFormValid) formRef.current?.reportValidity();

    setFormData({
      name,
      company,
      email,
      phone,
      purpose,
      startDate,
      endDate,
      body
    });

    sendContactMutation.mutate({
      name,
      company,
      email,
      phone,
      purpose,
      startDate,
      endDate,
      body
    });
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <ColumnWrapper gap="2">
        <h5>Contact details</h5>
        <RowWrapper
          breakPoint="md"
          justify="between"
          className="w-full"
        >
          <RowWrapper
            breakPoint="md"
            gap="4"
            justify="end"
            className="w-max"
          >
            <label htmlFor="name">Name*</label>
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required
              autoFocus
            />
          </RowWrapper>
          <RowWrapper
            breakPoint="md"
            gap="4"
            justify="end"
            className="w-max"
          >
            <label htmlFor="company">Company</label>
            <TextInput
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </RowWrapper>
        </RowWrapper>
        <RowWrapper
          breakPoint="md"
          justify="between"
          className="w-full"
        >
          <RowWrapper
            breakPoint="md"
            gap="4"
            justify="end"
            className="w-max"
          >
            <label htmlFor="email">Email*</label>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </RowWrapper>
          <RowWrapper
            breakPoint="md"
            gap="4"
            justify="end"
            className="w-max"
          >
            <label htmlFor="phone">Phone</label>
            <TextInput
              id="phone"
              type="telephone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </RowWrapper>
        </RowWrapper>
      </ColumnWrapper>
      <ColumnWrapper gap="2">
        <RowWrapper
          breakPoint="md"
          gap="4"
        >
          <label
            htmlFor="purpose"
            className="text-lg font-thin"
          >
            Purpose*
          </label>
          <TextInput
            id="purpose"
            className="text-lg"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            aria-required
          />
        </RowWrapper>
        <RowWrapper
          breakPoint="md"
          className="w-full items-center md:justify-evenly"
        >
          <label htmlFor="startDate">
            <DateInput
              id="startDate"
              min={Date.now()}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder={new Date(Date.now()).toLocaleDateString()}
            />
          </label>
          <span>-</span>
          <label htmlFor="endDate">
            <DateInput
              id="endDate"
              min={startDate ? Date.parse(startDate) : Date.now()}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder={new Date(Date.now()).toDateString()}
            />
          </label>
        </RowWrapper>
        <label htmlFor="body">
          <TextAreaInput
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Inquiry content..."
            className="w-full"
            rows={10}
            required
            aria-required
          />
        </label>
      </ColumnWrapper>
      <div className="flex flex-row justify-between">
        <Button
          className="border-slate-600 border-[1px] px-5"
          type="reset"
        >
          Reset
        </Button>
        <Button
          className="bg-slate-600 text-white px-5"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
