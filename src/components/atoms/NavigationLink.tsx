import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  menuName: string;
  to: string;
}

export const NavigationLink = ({ menuName, to }: NavigationLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link relative px-2 py-1 transition-colors duration-200
      ${isActive ? "active" : ""}`
    }
    end
  >
    {menuName}
  </NavLink>
);
