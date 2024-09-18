import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
interface NavLinkProps {
  children: ReactNode;
  href: string;
}
const NavLink = ({ children, href }: NavLinkProps) => {
  const navigate = useNavigate();
  return (
    <div
      className='mt-4 group flex h-9 w-9 shrink-0 justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base items-center cursor-pointer'
      onClick={() => navigate({ pathname: href })}
    >
      <div>{children}</div>
    </div>
  );
};

export default NavLink;
