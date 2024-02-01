import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  text?: string;
  children?: React.ReactNode;
};

export default function NavLink({ to, text, children }: NavLinkProps) {
  return (
    <Link
      className="w-screen bg-white text-black h-[max-content] md:w-[max-content] md:bg-transparent md:text-white"
      to={to}
    >
      {text ? text : ""}
      {children ? children : ""}
    </Link>
  );
}
