import { useQuery } from "@tanstack/react-query";
import referencesServices from "../../Services/referencesServices";

export default function ReferenceList({ limit }: { limit?: number }) {
  const referenceQuery = useQuery({
    queryKey: ["references"],
    queryFn: () => {
      return referencesServices.getAllReferences();
    },
  });

  if (referenceQuery.isLoading) {
    return <p>Loading references...</p>;
  }

  if (referenceQuery.isError) {
    return <p>Error! {referenceQuery.error.message}</p>;
  }

  return <p>References have loaded!</p>;
}
