import ColumnWrapper from "./Wrappers/ColumnWrapper";

export default function ErrorBox({ text }: { text: string }) {
  return (
    <ColumnWrapper
      gap="4"
      className="my-6 mx-auto"
    >
      <h5 className="text-center text-red-900">Error!</h5>
      <p className="text-center text-red-600">{text}</p>
    </ColumnWrapper>
  );
}
