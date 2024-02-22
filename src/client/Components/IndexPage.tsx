import NewsFeedElement from "./Elements/NewsFeedElement";
import ReferenceList from "./Elements/ReferenceList";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";
import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../Services/newsFeedServices";
import referrersServices from "../Services/referrersServices";

export default function IndexPage() {
  const referenceQuery = useQuery({
    queryKey: ["referrers"],
    queryFn: () => {
      return referrersServices.getAllReferrers(3);
    }
  });

  const newsFeedQuery = useQuery({
    queryKey: ["news", "index"],
    queryFn: () => {
      return newsFeedServices.getAllNews(6);
    },
    enabled: referenceQuery.isSuccess
  });

  return (
    <PageContentWrapper classname="gap-4">
      <ReferenceList referenceQuery={referenceQuery} />
      <NewsFeedElement newsFeedQuery={newsFeedQuery} />
    </PageContentWrapper>
  );
}
