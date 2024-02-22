import { useNavigate } from "react-router";
import Button from "./Elements/Button";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageContentWrapper
      pageTitle="There's no content here."
      classname="text-center"
    >
      <Button
        className="px-2 py-1"
        onClick={() => navigate("/")}
      >
        Return home
      </Button>
    </PageContentWrapper>
  );
}
