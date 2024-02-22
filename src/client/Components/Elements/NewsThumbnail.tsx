import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import ColumnWrapper from "./Wrappers/ColumnWrapper";
import RowWrapper from "./Wrappers/RowWrapper";

type NewsThumbProps = {
  newsItem: News;
};

export default function NewsThumbnail({ newsItem }: NewsThumbProps) {
  const sanitised = DOMPurify.sanitize(newsItem.body);
  return (
    <ColumnWrapper
      id={newsItem._id}
      gap="2"
      className="rounded-sm border-[1px] border-slate-200 p-4 w-full"
    >
      <RowWrapper
        breakPoint="sm"
        justify="between"
        className="sm:flex-row-reverse"
      >
        {newsItem.created_at && (
          <time className="self-end sm:self-start text-slate-500">
            <small>
              {new Date(Date.parse(newsItem.created_at)).toLocaleString()}
            </small>
          </time>
        )}
        <Link to={`/news/${newsItem._id}`}>
          <h5>{newsItem.title}</h5>
        </Link>
      </RowWrapper>
      <div
        className="news-preview"
        dangerouslySetInnerHTML={{ __html: sanitised }}
      />
      <Link
        to={`/news/${newsItem._id}`}
        className="self-end"
      >
        See more
      </Link>
    </ColumnWrapper>
  );
}
