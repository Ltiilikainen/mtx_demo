type ReferrerThumbProps = {
  referrer: Referrer;
};

export default function ReferrerThumbnail({ referrer }: ReferrerThumbProps) {
  return (
    <div className="w-60 h-40 my-4">
      <div className="flex w-full justify-center">
        <div className="w-20 h-20 bg-slate-300 rounded-full overflow-hidden">
          {referrer.image && (
            <img
              src={referrer.image.path}
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div className="text-center w-full  -translate-y-5">
        <h5 className="text-shadow-white font-semibold">{referrer.refName}</h5>
        <p>{referrer.affiliation}</p>
        <div className="text-center mx-auto px-4 py-2 bg-slate-300 border-[1px] border-slate-800 rounded-xl ">
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
