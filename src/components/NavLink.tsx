
import { NavLink as RouterNavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

interface CustomNavLinkProps extends NavLinkProps {
  activeClassName: string;
}

export const NavLink: React.FC<CustomNavLinkProps> = ({ to, className, activeClassName, children, ...rest }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => 
        `${typeof className === 'function' ? className({ isActive }) : className} ${isActive ? activeClassName : ''}`
      }
      {...rest}
    >
      {children}
    </RouterNavLink>
  );
};
