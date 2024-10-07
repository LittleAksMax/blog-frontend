import { ReactNode, MouseEvent } from 'react';

export interface ChildrenProp {
  children?: ReactNode;
}

export interface ClickableProp extends ChildrenProp {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
