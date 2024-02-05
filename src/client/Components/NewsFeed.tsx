import NewsFeedElement from "./Elements/NewsFeedElement";

export default function NewsFeed() {
  return (
    <div className="h-[91%] w-full overflow-y-auto px-4 pt-2">
      <h1>This is the news feed</h1>

      <NewsFeedElement />
    </div>
  );
}
