type ReferrerThumbProps = {
  referrer: Referrer;
};

export default function ReferrerThumbnail({ referrer }: ReferrerThumbProps) {
  return (
    <div className="relative w-60 h-40 my-2">
      <div className="flex  w-full justify-center">
        <div className="w-20 h-20 bg-slate-300 rounded-full overflow-hidden">
          {referrer.image && (
            <img
              src={referrer.image.path}
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div className="absolute top-16 w-full text-center">
        <h5 className="text-shadow-white font-semibold">{referrer.refName}</h5>
        <p>{referrer.affiliation}</p>
        <div className="text-center mx-auto bg-slate-300 border-[1px] border-slate-800 rounded-xl w-60">
          <p>
            {`"`}
            {referrer.content}
            {`"`}
          </p>
        </div>
      </div>
    </div>
  );
}
