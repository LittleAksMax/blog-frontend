import { FC, ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavbarSlotProps {
  children?: ReactNode;
}

const NavbarSlot: FC<NavbarSlotProps> = ({ children }: NavbarSlotProps) => (
  <li className="p-2">{children}</li>
);

const NavbarTitle: FC = () => (
  <a
    href="/"
    className="underline font-extrabold hover:text-myorange-500 text-2xl p-4"
  >
    DRB
  </a>
);

const Navbar: FC = () => {
  return (
    <nav>
      <ul className="flex flex-row w-full items-center bg-mygrey-300 dark:bg-mygrey-700 p-4 dark:text-mygrey-100">
        <NavbarSlot>
          <NavbarTitle />
        </NavbarSlot>
        <NavbarSlot>
          <ThemeToggle />
        </NavbarSlot>
      </ul>
    </nav>
  );
};

export default Navbar;
