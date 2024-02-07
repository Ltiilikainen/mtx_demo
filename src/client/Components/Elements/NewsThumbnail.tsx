import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

type NewsThumbProps = {
  newsItem: News;
};

export default function NewsThumbnail({ newsItem }: NewsThumbProps) {
  const sanitised = DOMPurify.sanitize(newsItem.body);
  return (
    <div
      id={newsItem._id}
      className="flex flex-col gap-2 rounded-sm border-[1px] border-slate-200 p-4 w-full"
    >
      {newsItem.created_at && (
        <time className="self-end text-slate-500">
          <small>
            {new Date(Date.parse(newsItem.created_at)).toLocaleString()}
          </small>
        </time>
      )}
      <h5>{newsItem.title}</h5>
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
    </div>
  );
}
