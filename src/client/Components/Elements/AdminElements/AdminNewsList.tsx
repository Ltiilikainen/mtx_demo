import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../../../Services/newsFeedServices";
import AdminNewsThumb from "./AdminNewsThumb";
import ErrorBox from "../ErrorBox";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

export default function AdminNewsList() {
  const newsFeedQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return newsFeedServices.getAllNews();
    }
  });

  if (newsFeedQuery.isError)
    return <ErrorBox text={newsFeedQuery.error.message} />;

  if (newsFeedQuery.isLoading)
    return (
      <div className="flex flex-col gap-4">
        <p className="text-center">Loading news items...</p>
      </div>
    );

  return (
    <ColumnWrapper gap="2">
      {newsFeedQuery.data && newsFeedQuery.data.length > 0 ? (
        newsFeedQuery.data.map((item: News) => {
          return (
            <div key={item._id}>
              <AdminNewsThumb item={item} />
            </div>
          );
        })
      ) : (
        <h5>There are no news posts</h5>
      )}
    </ColumnWrapper>
  );
}
