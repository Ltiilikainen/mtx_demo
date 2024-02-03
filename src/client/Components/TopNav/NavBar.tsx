import { useNavigate } from "react-router";
import NavContainer from "./NavContainer";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[3.5rem] bg-slate-700 border-b[0.5px] border-b-slate-800 flex flex-row gap-4 text-white items-center px-4">
      <div
        className="ml-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {"<Logo/>"}
      </div>
      <h2
        className="cursor-pointer"
        onClick={() => navigate("/")}
      >
        Site Title
      </h2>
      <NavContainer />
    </div>
  );
}
