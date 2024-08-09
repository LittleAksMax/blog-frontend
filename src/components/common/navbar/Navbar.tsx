import { FC } from 'react';
import ThemeToggle from './ThemeToggle';
import { ChildrenProp } from '../../props';

interface NavbarSlotProps extends ChildrenProp {}

const NavbarSlot: FC<NavbarSlotProps> = ({ children }: NavbarSlotProps) => (
  <li>{children}</li>
);

interface NavbarItemInlineContainerProps extends ChildrenProp {}

const NavbarItemInlineContainer: FC<NavbarItemInlineContainerProps> = ({
  children,
}: NavbarItemInlineContainerProps) => (
  <span className="p-2 hover:text-myorange-500 text-xl">{children}</span>
);

const NavbarTitle: FC = () => (
  <NavbarItemInlineContainer>
    <a
      href="/"
      className="underline font-extrabold hover:text-myorange-500 text-3xl "
    >
      DRB
    </a>
  </NavbarItemInlineContainer>
);

interface NavbarLinkProps {
  value: string;
  href: string;
}

const NavbarLink: FC<NavbarLinkProps> = ({ value, href }: NavbarLinkProps) => (
  <NavbarItemInlineContainer>
    <a href={href} className="hover:text-myorange-500 p-2">
      {value}
    </a>
  </NavbarItemInlineContainer>
);

interface NavbarProps {
  loggedIn: boolean;
}

interface NavbarPartitionProps extends ChildrenProp {
  side: 'left' | 'right';
}

const NavbarPartition: FC<NavbarPartitionProps> = ({
  children,
  side,
}: NavbarPartitionProps) => {
  const style =
    'flex flex-row items-center w-full ' +
    (side === 'left' ? 'justify-start' : 'justify-end');
  return <ul className={style}>{children}</ul>;
};

const Navbar: FC<NavbarProps> = ({ loggedIn }: NavbarProps) => {
  return (
    <nav className="flex justify-evenly bg-mygrey-300 dark:bg-mygrey-700 p-4 dark:text-mygrey-100">
      <NavbarPartition side="left">
        <NavbarSlot>
          <NavbarTitle />
        </NavbarSlot>
      </NavbarPartition>
      <NavbarPartition side="right">
        <NavbarSlot>
          <ThemeToggle />
        </NavbarSlot>
        <NavbarSlot>
          {!loggedIn ? (
            <NavbarLink href="/login" value="Login" />
          ) : (
            <NavbarLink href="/logout" value="Log out" />
          )}
        </NavbarSlot>
      </NavbarPartition>
    </nav>
  );
};

export default Navbar;
