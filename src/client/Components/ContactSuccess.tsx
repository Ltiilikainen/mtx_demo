import ColumnWrapper from "./Elements/Wrappers/ColumnWrapper";
import RowWrapper from "./Elements/Wrappers/RowWrapper";

export default function ContactSuccess({
  formData
}: {
  formData: ContactFormData;
}) {
  return (
    <ColumnWrapper gap="2">
      <h4 className="mb-4 justify-between">
        Successfully sent inquiry with the following contents:
      </h4>
      <RowWrapper justify="between">
        <p>Name: {formData ? formData.name : ""}</p>
        {formData && formData.company ? <p>Company: {formData.company}</p> : ""}
      </RowWrapper>
      <RowWrapper justify="between">
        <p>Email: {formData ? formData.email : ""}</p>
        {formData && formData.phone ? <p>Phone: {formData.phone}</p> : ""}
      </RowWrapper>
      <h5>Purpose: {formData ? formData.purpose : ""}</h5>
      {formData && (
        <p>
          {formData.startDate && `From ${formData.startDate} `}{" "}
          {formData.endDate &&
            `${formData.startDate ? "until" : "Until"} ${formData.endDate}`}
        </p>
      )}
      <p>{formData ? formData.body : ""}</p>
    </ColumnWrapper>
  );
}
