import NavContainer from "./NavContainer";

export default function NavBar() {
  return (
    <div className="w-full h-[3.5rem] bg-slate-700 border-b[0.5px] border-b-slate-800 flex flex-row gap-4 text-white items-center">
      <div className="ml-4">{"</Logo>"}</div>
      <h2>Site Title</h2>
      <NavContainer />
    </div>
  );
}
