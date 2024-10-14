import { FC, useMemo, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { ChildrenProp } from '../../props';
import { useAuth } from '../../../contexts/auth';
import { ThemeType } from '../../../types';
// import logger from '../../../logging';

// const NAMESPACE: string = 'components/common/navbar/Navbar.tsx';

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

interface NavbarTitleProps {
  mode: ThemeType | undefined;
}

const NavbarTitle: FC<NavbarTitleProps> = ({ mode }: NavbarTitleProps) => {
  const logoUrl = useMemo(() => `/logo/drb-${mode ?? 'dark'}.svg`, [mode]);
  return (
    <a href="/">
      <img src={logoUrl} alt="DRB Logo"></img>
    </a>
  );
};

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

const Navbar: FC = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<ThemeType | undefined>(undefined);

  // logger.debug(NAMESPACE, 'Auth handler', auth);
  return (
    <nav className="flex justify-evenly bg-mygrey-300 dark:bg-mygrey-700 p-4 dark:text-mygrey-100">
      <NavbarPartition side="left">
        <NavbarSlot>
          <NavbarTitle mode={mode} />
        </NavbarSlot>
      </NavbarPartition>
      <NavbarPartition side="right">
        <NavbarSlot>
          <ThemeToggle mode={mode} setMode={setMode} />
        </NavbarSlot>
        <NavbarSlot>
          <NavbarLink href="/posts" value="Posts" />
        </NavbarSlot>
        <NavbarSlot>
          {!user ? (
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
