import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../../Services/newsFeedServices";
import NewsThumbnail from "./NewsThumbnail";

export default function NewsFeedElement({ limit }: { limit?: number }) {
  const newsFeedQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return newsFeedServices.getAllNews();
    }
  });

  if (newsFeedQuery.isLoading) {
    return <p>Loading news...</p>;
  }

  if (newsFeedQuery.isError) {
    return <p>Error! {newsFeedQuery.error.message}</p>;
  }

  return (
    <div className="flex flex-col px-4 gap-4 w-[80%] md:w-[70%] mx-auto my-2">
      {newsFeedQuery.data && newsFeedQuery.data.length > 0 ? (
        newsFeedQuery.data.map((item: News) => {
          return (
            <NewsThumbnail
              key={item._id}
              newsItem={item}
            />
          );
        })
      ) : (
        <h5>There are no news posts</h5>
      )}
    </div>
  );
}
