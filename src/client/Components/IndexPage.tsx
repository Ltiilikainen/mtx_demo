import NewsFeedElement from "./Elements/NewsFeedElement";
import ReferenceList from "./Elements/ReferenceList";

export default function IndexPage() {
  return (
    <div className="px-4 pt-2">
      <h1>Home</h1>

      <ReferenceList limit={3} />

      <NewsFeedElement limit={10} />
    </div>
  );
}
