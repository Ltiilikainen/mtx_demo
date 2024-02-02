import NewsFeedElement from "./Elements/NewsFeedElement";
import ReferenceList from "./Elements/ReferenceList";

export default function IndexPage() {
  return (
    <div className="mx-4 mt-2">
      <h1>This is the index page</h1>

      <ReferenceList limit={3} />

      <NewsFeedElement limit={10} />
    </div>
  );
}
