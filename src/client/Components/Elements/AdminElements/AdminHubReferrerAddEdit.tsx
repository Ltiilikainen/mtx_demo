import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ReferrerForm from "./ReferrerForm";
import referrersServices from "../../../Services/referrersServices";

export default function AdminHubReferrerAddEdit() {
  const id = useParams().id;

  if (id) {
    console.log(id);
    const refQuery = useQuery({
      queryKey: ["reference", id],
      queryFn: () => {
        return referrersServices.getReferrerById(id);
      }
    });

    if (refQuery.isError)
      return (
        <div className="flex flex-col gap-4 my-6 mx-auto">
          <h5 className="text-center text-red-900">Error!</h5>
          <p className="text-center text-red-600">{refQuery.error.message}</p>
        </div>
      );

    if (refQuery.isLoading)
      return (
        <div className="flex flex-col gap-4 my-6 mx-auto">
          <p className="text-center text-slate-500 animate-pulse">
            Loading information
          </p>
        </div>
      );

    if (refQuery.isSuccess && refQuery.data) {
      console.log(refQuery.data);
      return (
        <div>
          <ReferrerForm
            id={id}
            referrer={refQuery.data}
          />
        </div>
      );
    }
  }
  return (
    <div>
      <ReferrerForm />
    </div>
  );
}
