import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  menuName: string;
  to: string;
  onClick?: () => void;
}

export const NavigationLink = ({
  menuName,
  to,
  onClick,
}: NavigationLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link relative px-2 py-1 transition-colors duration-200 ${
        isActive ? "active" : ""
      }`
    }
    end
    onClick={onClick}
  >
    {menuName}
  </NavLink>
);
