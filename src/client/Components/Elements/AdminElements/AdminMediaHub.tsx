import { useQuery } from "@tanstack/react-query";
import uploadServices from "../../../Services/uploadServices";
import AdminMediaThumb from "./AdminMediaThumb";

export default function AdminMediaHub() {
  const mediaQuery = useQuery({
    queryKey: ["mediaquery"],
    queryFn: () => {
      return uploadServices.getUploads();
    }
  });

  if (mediaQuery.isError || !mediaQuery.data) {
    return;
  }

  if (mediaQuery.isLoading) {
    return;
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 px-4 mx-auto">
      {(mediaQuery.data as Upload[]).map((item) => (
        <AdminMediaThumb
          key={item._id}
          media={item}
        />
      ))}
    </div>
  );
}
