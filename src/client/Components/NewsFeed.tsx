import NewsFeedElement from "./Elements/NewsFeedElement";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";

export default function NewsFeed() {
  return (
    <PageContentWrapper pageTitle="News">
      <NewsFeedElement />
    </PageContentWrapper>
  );
}
