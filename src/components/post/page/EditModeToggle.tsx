import { FC } from 'react';

interface EditModeToggleProps {
  editMode: boolean;
  toggleEditMode: () => void;
}

const EditModeToggle: FC<EditModeToggleProps> = ({
  editMode,
  toggleEditMode,
}: EditModeToggleProps) => {
  // TODO: make this nicer
  return (
    <div>
      <button onClick={toggleEditMode}>{!editMode ? 'Edit' : 'Preview'}</button>
    </div>
  );
};

export default EditModeToggle;
