import { FC } from 'react';
import { ClickableProp } from '../../props';

interface ButtonProps extends ClickableProp {
  className: string;
  text: string;
}

const Button: FC<ButtonProps> = ({ className, text, onClick }: ButtonProps) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

interface ConfirmButtonProps extends ClickableProp {}

export const ConfirmButton: FC<ConfirmButtonProps> = ({
  onClick,
}: ConfirmButtonProps) => (
  <Button
    text="Confirm"
    className="p-1 border-2 bg-myorange-500 border-myorange-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-myorange-500"
    onClick={onClick}
  />
);

interface DeleteButtonProps extends ClickableProp {}

export const DeleteButton: FC<DeleteButtonProps> = ({
  onClick,
}: DeleteButtonProps) => (
  <Button
    text="Delete"
    className="p-1 border-2 bg-red-500 border-red-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-red-500"
    onClick={onClick}
  />
);

interface UpdateButtonProps extends ClickableProp {}

export const UpdateButton: FC<UpdateButtonProps> = ({
  onClick,
}: UpdateButtonProps) => (
  <Button
    text="Update"
    className="p-1 border-2 bg-blue-500 border-blue-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-blue-500"
    onClick={onClick}
  />
);

interface ArchiveButtonProps extends ClickableProp {}

export const ArchiveButton: FC<ArchiveButtonProps> = ({
  onClick,
}: ArchiveButtonProps) => (
  <Button
    text="Archive"
    className="p-1 border-2 bg-orange-600 border-orange-600 hover:bg-mygrey-100 text-mygrey-100 hover:text-orange-600"
    onClick={onClick}
  />
);
