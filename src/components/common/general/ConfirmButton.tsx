import { FC } from 'react';

interface ConfirmButtonProps {
  onClick: any; // TODO: type
}

const ConfirmButton: FC<ConfirmButtonProps> = ({ onClick }) => (
  <button className="bg-myorange-500 text-mygrey-100" onClick={onClick}>
    Confirm
  </button>
);

export default ConfirmButton;
