import { useQuery } from "@tanstack/react-query";
import referrersServices from "../../Services/referrersServices";
import AdminRefThumb from "./AdminRefThumb";

export default function AdminRefList() {
  const referrerQuery = useQuery({
    queryKey: ["referrers"],
    queryFn: () => {
      return referrersServices.getAllReferrers();
    }
  });

  if (referrerQuery.isError)
    return (
      <div className="flex flex-col gap-4 my-6 mx-auto">
        <h5 className="text-center text-red-900">Error!</h5>
        <p className="text-center text-red-600">
          {referrerQuery.error.message}
        </p>
      </div>
    );

  if (referrerQuery.isLoading)
    return (
      <div className="flex flex-col gap-4">
        <p className="text-center text-slate-500 animate-pulse">
          Loading referrers...
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center">
      {referrerQuery.data && referrerQuery.data.length > 0 ? (
        referrerQuery.data.map((item: Referrer) => {
          return (
            <div key={item._id}>
              <AdminRefThumb item={item} />
            </div>
          );
        })
      ) : (
        <h5>There are no referrers</h5>
      )}
    </div>
  );
}
