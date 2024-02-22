import { NavLink } from "react-router-dom";

type TopLinkProps = {
  to: string;
  text?: string;
  children?: React.ReactNode;
};

export default function TopLink({ to, text, children }: TopLinkProps) {
  return (
    <NavLink
      className="aria-[current=page]:text-slate-800 md:aria-[current=page]:text-slate-200 px-8 md:px-0 w-screen bg-white text-black h-[max-content] md:w-[max-content] md:bg-transparent md:text-white hover:border-b-[0.5px] border-transparent hover:border-slate-200 md:hover:border-slate-500 hover:ease-in-out hover:duration-500"
      to={to}
    >
      {text ? text : ""}
      {children ? children : ""}
    </NavLink>
  );
}
