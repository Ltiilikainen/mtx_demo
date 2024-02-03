type NewsThumbProps = {
  newsItem: News;
};

export default function NewsThumbnail({ newsItem }: NewsThumbProps) {
  return (
    <div
      id={newsItem._id}
      className="flex flex-col gap-2"
    >
      <h5>{newsItem.title}</h5>
      <div className="line-clamp-3">{newsItem.body}</div>
    </div>
  );
}
