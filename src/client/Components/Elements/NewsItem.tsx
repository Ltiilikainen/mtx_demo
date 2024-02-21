import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useParams } from "react-router";
import newsFeedServices from "../../Services/newsFeedServices";
import ErrorBox from "./ErrorBox";
import ColumnWrapper from "./Wrappers/ColumnWrapper";
import PageContentWrapper from "./Wrappers/PageContentWrapper";
import RowWrapper from "./Wrappers/RowWrapper";

export default function NewsItem() {
  const id = useParams().id;
  const newsItem = useQuery({
    queryKey: [id],
    queryFn: () => {
      return newsFeedServices.getNewsById(id!);
    }
  });

  if (!id || newsItem.isError) {
    return <ErrorBox text="Could not load post" />;
  } else if (newsItem.isLoading) {
    return (
      <ColumnWrapper
        gap="4"
        className="m-4"
      >
        <div className="h-20 w-80 bg-slate-200 animate-pulse"></div>
        <div className="w-[100rem] max-w-[100%] bg-slate-200 animate-pulse h-[180rem]"></div>
      </ColumnWrapper>
    );
  } else {
    return (
      <PageContentWrapper>
        <ColumnWrapper
          gap="4"
          className="p-4 my-4"
        >
          <RowWrapper
            breakPoint="sm"
            justify="between"
            className="border-b-[1px] border-slate-200"
          >
            <h3>{newsItem.data.title}</h3>
            {newsItem.data.created_at && (
              <time>
                <small>
                  {new Date(
                    Date.parse(newsItem.data.created_at)
                  ).toLocaleString()}
                </small>
              </time>
            )}
          </RowWrapper>
          <div
            className="news-post"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(newsItem.data.body)
            }}
          />
        </ColumnWrapper>
      </PageContentWrapper>
    );
  }
}
