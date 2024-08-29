import { dotSpinner } from 'ldrs';
import { FC } from 'react';

dotSpinner.register();

const Spinner: FC = () => {
  return <l-dot-spinner size="50" speed="0.9" color="#ddd" />;
};

export default Spinner;
