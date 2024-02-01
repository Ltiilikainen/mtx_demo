import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../../Services/newsFeedServices";

export default function NewsFeedElement({ limit }: { limit?: number }) {
  const newsFeedQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return newsFeedServices.getAllNews();
    },
  });

  if (newsFeedQuery.isLoading) {
    return <p>Loading news...</p>;
  }

  if (newsFeedQuery.isError) {
    return <p>Error! {newsFeedQuery.error.message}</p>;
  }

  return <p>News has loaded!</p>;
}
