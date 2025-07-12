import { FC } from 'react';
import clsx from 'clsx';

interface EditModeToggleProps {
  editMode: boolean;
  toggleEditMode: () => void;
}

const EditModeToggle: FC<EditModeToggleProps> = ({
  editMode,
  toggleEditMode,
}: EditModeToggleProps) => {
  return (
    <div>
      <button
        onClick={toggleEditMode}
        className={clsx(
          'flex items-center w-12 h-6 rounded shadow transition cursor-pointer',
          'border',
          editMode
            ? 'bg-blue-400 border-blue-500'
            : 'bg-gray-300 border-gray-400',
          'hover:brightness-90 hover:border-gray-600 active:scale-95'
        )}
      >
        {editMode ? (
          <img
            src="/preview.png"
            alt="Preview"
            className="w-5 h-5 ml-auto p-0.5"
          />
        ) : (
          <img src="/edit.png" alt="Edit" className="w-5 h-5 p-0.5" />
        )}
      </button>
    </div>
  );
};

export default EditModeToggle;
