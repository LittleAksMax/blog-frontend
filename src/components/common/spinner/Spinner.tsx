import { dotSpinner } from 'ldrs';
import { FC } from 'react';

dotSpinner.register();

const Spinner: FC = () => {
  return (
    <div className="w-full h-full flex align-middle justify-center">
      <l-dot-spinner size="50" speed="0.9" color="#ddd" />
    </div>
  );
};

export default Spinner;
