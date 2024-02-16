import { useQuery } from "@tanstack/react-query";
import referrersServices from "../../Services/referrersServices";
import ReferrerThumbnail from "./ReferrerThumbnail";

export default function ReferenceList({ limit }: { limit?: number }) {
  const referenceQuery = useQuery({
    queryKey: ["referrers"],
    queryFn: () => {
      return referrersServices.getAllReferrers();
    }
  });

  if (referenceQuery.isLoading) {
    return <p>Loading references...</p>;
  }

  if (referenceQuery.isError) {
    return <p>Error! {referenceQuery.error.message}</p>;
  }

  return (
    <div className="flex flex-col h-max py-2 mx-auto w-max md:flex-row gap-2 md:gap-4 md:w-full md:justify-center my-2">
      {referenceQuery.data && referenceQuery.data.length > 0 ? (
        referenceQuery.data.map((item: Referrer) => {
          return (
            <ReferrerThumbnail
              key={item._id}
              referrer={item}
            />
          );
        })
      ) : (
        <h5>There are no references</h5>
      )}
    </div>
  );
}
