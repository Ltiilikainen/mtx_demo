export default function ErrorBox({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 my-6 mx-auto">
      <h5 className="text-center text-red-900">Error!</h5>
      <p className="text-center text-red-600">{text}</p>
    </div>
  );
}
