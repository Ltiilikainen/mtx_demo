import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../Services/newsFeedServices";
import NewsFeedElement from "./Elements/NewsFeedElement";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";

export default function NewsFeed() {
  const newsFeedQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return newsFeedServices.getAllNews();
    }
  });
  return (
    <PageContentWrapper pageTitle="News">
      <NewsFeedElement newsFeedQuery={newsFeedQuery} />
    </PageContentWrapper>
  );
}
