import { FC, useState } from 'react';
import { ClickableProp } from '../../props';

interface ButtonProps extends ClickableProp {
  className: string;
  text: string;
  hasModal?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  text,
  onClick,
  hasModal,
}: ButtonProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>();
  return (
    <div>
      {hasModal && modalOpen && (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-2000">
          <div className="dark:bg-mygrey-700 not:dark:bg-mygrey-200 w-[30%] h-[30%] inset-0 flex flex-col items-center justify-center border-2 rounded-md shadow-myorange-500">
            <p>Are you sure?</p>
            <div>
              <button
                className="p-2 border-2 border-mygrey-400 bg-mygrey-400"
                onClick={() => {
                  if (onClick) onClick();
                  setModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className={className}
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }
                  setModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={className}
        onClick={hasModal ? () => setModalOpen(!modalOpen) : onClick}
      >
        <span>{text}</span>
      </button>
    </div>
  );
};
interface ConfirmButtonProps extends ClickableProp {}

export const ConfirmButton: FC<ConfirmButtonProps> = ({
  onClick,
}: ConfirmButtonProps) => (
  <Button
    text="Confirm"
    className="p-2 border-2 bg-myorange-500 border-myorange-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-myorange-500"
    onClick={onClick}
  />
);

interface DeleteButtonProps extends ClickableProp {}

export const DeleteButton: FC<DeleteButtonProps> = ({
  onClick,
}: DeleteButtonProps) => (
  <Button
    text="Delete"
    className="p-2 border-2 bg-red-400 border-red-400 hover:bg-mygrey-100 text-mygrey-100 hover:text-red-400"
    onClick={onClick}
    hasModal
  />
);

interface UpdateButtonProps extends ClickableProp {}

export const UpdateButton: FC<UpdateButtonProps> = ({
  onClick,
}: UpdateButtonProps) => (
  <Button
    text="Update"
    className="p-2 border-2 bg-blue-400 border-blue-400 hover:bg-mygrey-100 text-mygrey-100 hover:text-blue-400"
    onClick={onClick}
  />
);

interface ArchiveButtonProps extends ClickableProp {}

export const ArchiveButton: FC<ArchiveButtonProps> = ({
  onClick,
}: ArchiveButtonProps) => (
  <Button
    text="Archive"
    className="p-2 border-2 bg-orange-500 border-orange-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-orange-500"
    onClick={onClick}
    hasModal
  />
);

interface SaveButtonProps extends ClickableProp {}

export const SaveButton: FC<SaveButtonProps> = ({
  onClick,
}: SaveButtonProps) => (
  <Button
    text="Save"
    className="p-2 border-2 bg-green-500 border-green-500 hover:bg-mygrey-100 text-mygrey-100 hover:text-green-500"
    onClick={onClick}
    hasModal
  />
);

interface CancelButtonProps extends ClickableProp {}

export const CancelButton: FC<CancelButtonProps> = ({
  onClick,
}: SaveButtonProps) => (
  <Button
    text="Cancel"
    className="p-2 border-2 bg-mygrey-400 border-mygrey-400 hover:bg-mygrey-100 text-mygrey-100 hover:text-mygrey-400"
    onClick={onClick}
    hasModal
  />
);
