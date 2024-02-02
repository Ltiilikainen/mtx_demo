import { useNavigate } from "react-router";
import Button from "./Elements/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-4 mt-2 text-center">
      <h1>There's no content here.</h1>

      <Button
        className="px-2 py-1"
        onClick={() => navigate("/")}
      >
        Return home
      </Button>
    </div>
  );
}
