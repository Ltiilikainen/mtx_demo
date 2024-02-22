import { UseQueryResult, useQuery } from "@tanstack/react-query";
import ReferrerThumbnail from "./ReferrerThumbnail";
import ErrorBox from "./ErrorBox";
import RowWrapper from "./Wrappers/RowWrapper";

export default function ReferenceList({
  referenceQuery
}: {
  referenceQuery: UseQueryResult<any, Error>;
}) {
  if (referenceQuery.isLoading) {
    return <p>Loading references...</p>;
  }

  if (referenceQuery.isError) {
    return <ErrorBox text={referenceQuery.error.message} />;
  }

  return (
    <RowWrapper
      breakPoint="md"
      gap="2"
      justify="center"
      className="py-2 my-2 md:gap-4 flex-wrap"
    >
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
    </RowWrapper>
  );
}
