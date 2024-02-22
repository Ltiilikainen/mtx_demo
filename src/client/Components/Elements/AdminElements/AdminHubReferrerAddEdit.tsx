import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ReferrerForm from "./ReferrerForm";
import referrersServices from "../../../Services/referrersServices";
import ErrorBox from "../ErrorBox";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

export default function AdminHubReferrerAddEdit() {
  const id = useParams().id;

  if (id) {
    const refQuery = useQuery({
      queryKey: ["reference", id],
      queryFn: () => {
        return referrersServices.getReferrerById(id);
      }
    });

    if (refQuery.isError) return <ErrorBox text={refQuery.error.message} />;

    if (refQuery.isLoading)
      return (
        <ColumnWrapper
          gap="4"
          className="my-6 mx-auto"
        >
          <p className="text-center text-slate-500 animate-pulse">
            Loading information
          </p>
        </ColumnWrapper>
      );

    if (refQuery.isSuccess && refQuery.data) {
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
