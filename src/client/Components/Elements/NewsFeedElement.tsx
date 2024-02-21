import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../../Services/newsFeedServices";
import NewsThumbnail from "./NewsThumbnail";
import ErrorBox from "./ErrorBox";
import ColumnWrapper from "./Wrappers/ColumnWrapper";

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
    return <ErrorBox text={newsFeedQuery.error.message} />;
  }

  return (
    <ColumnWrapper
      gap="4"
      className="my-2"
    >
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
    </ColumnWrapper>
  );
}
