import { useQuery } from "@tanstack/react-query";
import newsFeedServices from "../../../Services/newsFeedServices";
import AdminNewsThumb from "./AdminNewsThumb";

export default function AdminNewsList() {
  const newsFeedQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return newsFeedServices.getAllNews();
    }
  });

  if (newsFeedQuery.isError)
    return (
      <div className="flex flex-col gap-4 my-6 mx-auto">
        <h5 className="text-center text-red-900">Error!</h5>
        <p className="text-center text-red-600">
          {newsFeedQuery.error.message}
        </p>
      </div>
    );

  if (newsFeedQuery.isLoading)
    return (
      <div className="flex flex-col gap-4">
        <p className="text-center">Loading news items...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}
