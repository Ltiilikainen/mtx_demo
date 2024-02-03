import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

type NewsThumbProps = {
  newsItem: News;
};

export default function NewsThumbnail({ newsItem }: NewsThumbProps) {
  const navigate = useNavigate();
  const sanitised = DOMPurify.sanitize(newsItem.body);
  return (
    <div
      id={newsItem._id}
      className="flex flex-col gap-2 rounded-sm border-[1px] border-slate-200 p-4"
      onClick={() => navigate(`/news/${newsItem._id}`)}
    >
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
