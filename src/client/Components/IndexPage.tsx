import NewsFeedElement from "./Elements/NewsFeedElement";
import ReferenceList from "./Elements/ReferenceList";
import PageContentWrapper from "./Elements/Wrappers/PageContentWrapper";

export default function IndexPage() {
  return (
    <PageContentWrapper classname="gap-4">
      <ReferenceList limit={3} />
      <NewsFeedElement limit={10} />
    </PageContentWrapper>
  );
}
