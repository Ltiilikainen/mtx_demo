import { useQuery } from "@tanstack/react-query";
import referrersServices from "../Services/referrersServices";
import ReferenceList from "./Elements/ReferenceList";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";

export default function References() {
  const referenceQuery = useQuery({
    queryKey: ["referrers"],
    queryFn: () => {
      return referrersServices.getAllReferrers();
    }
  });
  return (
    <PageContentWrapper pageTitle="References">
      <ReferenceList referenceQuery={referenceQuery} />
    </PageContentWrapper>
  );
}
