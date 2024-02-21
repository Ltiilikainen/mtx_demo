import { useQuery } from "@tanstack/react-query";
import referrersServices from "../../../Services/referrersServices";
import AdminRefThumb from "./AdminRefThumb";
import ErrorBox from "../ErrorBox";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

export default function AdminRefList() {
  const referrerQuery = useQuery({
    queryKey: ["referrers"],
    queryFn: () => {
      return referrersServices.getAllReferrers();
    }
  });

  if (referrerQuery.isError)
    return <ErrorBox text={referrerQuery.error.message} />;

  if (referrerQuery.isLoading)
    return (
      <ColumnWrapper gap="4">
        <p className="text-center text-slate-500 animate-pulse">
          Loading referrers...
        </p>
      </ColumnWrapper>
    );

  return (
    <ColumnWrapper
      gap="2"
      className="items-center"
    >
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
    </ColumnWrapper>
  );
}
