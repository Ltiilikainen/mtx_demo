import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import newsFeedServices from "../../../Services/newsFeedServices.js";
import NewsPostForm from "./NewsPostForm.js";
import ErrorBox from "../ErrorBox.js";
import ColumnWrapper from "../Wrappers/ColumnWrapper.js";

export default function AdminHubNewsAddEdit() {
  const id = useParams().id;
  console.log(id);

  if (id) {
    const getNewsQuery = useQuery({
      queryKey: ["news", id],
      queryFn: () => {
        return newsFeedServices.getNewsById(id);
      }
    });

    if (getNewsQuery.isError)
      return <ErrorBox text={getNewsQuery.error.message} />;

    if (getNewsQuery.isLoading)
      return (
        <ColumnWrapper
          gap="4"
          className="my-6 mx-auto"
        >
          <p className="text-center animate-pulse text-slate-500">
            Loading post information
          </p>
        </ColumnWrapper>
      );

    return (
      <NewsPostForm
        defaultTitle={(getNewsQuery.data as News).title}
        defaultBody={(getNewsQuery.data as News).body}
      />
    );
  }

  return <NewsPostForm />;
}
