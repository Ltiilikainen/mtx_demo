import { NavLink } from "react-router-dom";

type TopLinkProps = {
  to: string;
  text?: string;
  children?: React.ReactNode;
};

export default function TopLink({ to, text, children }: TopLinkProps) {
  return (
    <NavLink
      className="aria-[current=page]:text-slate-800 md:aria-[current=page]:text-slate-200 w-screen bg-white text-black h-[max-content] md:w-[max-content] md:bg-transparent md:text-white"
      to={to}
    >
      {text ? text : ""}
      {children ? children : ""}
    </NavLink>
  );
}
