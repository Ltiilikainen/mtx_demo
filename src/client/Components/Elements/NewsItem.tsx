import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useParams } from "react-router";
import newsFeedServices from "../../Services/newsFeedServices";

export default function NewsItem() {
  const id = useParams().id;
  const newsItem = useQuery({
    queryKey: [id],
    queryFn: () => {
      return newsFeedServices.getNewsById(id!);
    }
  });

  if (!id || newsItem.isError) {
    return (
      <div className="w-full flex flex-col m-4">
        <h5>Error loading post</h5>
      </div>
    );
  } else if (newsItem.isLoading) {
    <div className="w-full flex flex-col gap-4 m-4">
      <div className="h-20 w-80 animate-pulse"></div>
      <div className="w-[100rem] max-w-[100%] animate-pulse h-[180rem]"></div>
    </div>;
  } else {
    return (
      <div className="w-full flex flex-col gap-4 m-4 md:w-[70%] md:mx-auto md:my-4">
        <div className="flex flex-row justify-between border-b-[1px] border-slate-200">
          <h3>{newsItem.data.title}</h3>
          {newsItem.data.created_at && (
            <time>
              <small>{newsItem.data.created_at}</small>
            </time>
          )}
        </div>
        <div
          className="news-post"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(newsItem.data.body)
          }}
        />
      </div>
    );
  }
}
