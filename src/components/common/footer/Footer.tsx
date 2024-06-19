import { FC, ReactNode } from 'react';

interface FooterColumnProps {
  children?: ReactNode;
}

const FooterColumn: FC<FooterColumnProps> = ({
  children,
}: FooterColumnProps) => (
  <div className="flex flex-col items-start max-sm:first:mt-2 sm:mb-5 max-sm:last:mb-5 pt-1 pl-1 w-3/10">
    {children}
  </div>
);

interface FooterColumnHeaderProps {
  columnTitle: string;
}

const FooterColumnHeader: FC<FooterColumnHeaderProps> = ({
  columnTitle,
}: FooterColumnHeaderProps) => (
  <span className="text-myorange-500">
    <strong className="p-2">{columnTitle}</strong>
  </span>
);

interface FooterColumnLinkProps {
  href: string;
  placeholder: string;
}

const FooterColumnLink: FC<FooterColumnLinkProps> = ({
  href,
  placeholder,
}: FooterColumnLinkProps) => (
  <span className="sm:mt-1 mt-0">
    <a href={href} className="hover:text-myorange-700 hover:underline p-2">
      {placeholder}
    </a>
  </span>
);

const Footer: FC = () => {
  return (
    <footer>
      <div className="flex flex-nowrap flex-col sm:flex-row sm:justify-evenly bg-mygrey-200 dark:bg-mygrey-700 dark:text-mygrey-100">
        <FooterColumn>
          <FooterColumnHeader columnTitle="Contact" />
          <FooterColumnLink
            href="mailto:david2005.rosental.work@gmail.com"
            placeholder="Email me"
          />
          <FooterColumnLink
            href="https://www.linkedin.com/in/david-rosental/"
            placeholder="LinkedIn"
          />
          <FooterColumnLink
            href="https://www.github.com/LittleAksMax/"
            placeholder="GitHub"
          />
        </FooterColumn>
        <FooterColumn>
          <FooterColumnHeader columnTitle="Navigation" />
          <FooterColumnLink href="/" placeholder="Home" />
        </FooterColumn>
        <FooterColumn>
          <FooterColumnHeader columnTitle="Other Projects" />
          <FooterColumnLink
            href="https://portfolio.davidrosental.co.uk"
            placeholder="Personal Portfolio"
          />
        </FooterColumn>
      </div>
    </footer>
  );
};

export default Footer;
