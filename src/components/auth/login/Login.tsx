import {
  Dispatch,
  FC,
  FormEvent,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import Page from '../../common/page/Page';
import { useAuth } from '../../../contexts/auth';
import { Navigate } from 'react-router-dom';
import logger from '../../../logging';
import Spinner from '../../common/spinner/Spinner';

const NAMESPACE: string = 'components/auth/login/Login.tsx';

interface LoginInputProps {
  children?: ReactNode;
}

const LoginInput: FC<LoginInputProps> = ({ children }: LoginInputProps) => {
  return <div className="flex flex-row m-0.5">{children}</div>;
};

interface LoginLabelProps {
  children?: ReactNode;
  htmlFor?: string;
}

const LoginLabel: FC<LoginLabelProps> = ({
  children,
  htmlFor,
}: LoginLabelProps) => {
  return (
    <label
      className="p-1 min-w-24 font-bold text-myorange-500"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

interface LoginInputBoxProps {
  type: 'email' | 'password';
  placeholder?: string;
  name: string;
  get: string;
  set: Dispatch<string>;
}

const LoginInputBox: FC<LoginInputBoxProps> = ({
  type,
  placeholder,
  name,
  get,
  set,
}: LoginInputBoxProps) => (
  <input
    className="dark:bg-mygrey-600 outline-myorange-200 hover:outline-myorange-400 flex-1 p-1"
    name={name}
    type={type}
    placeholder={placeholder}
    autoComplete="off"
    value={get}
    onChange={(e) => set(e.target.value)}
    required
  />
);

interface LoginSubmitProps {
  value: string;
}

const LoginSubmit: FC<LoginSubmitProps> = ({ value }: LoginSubmitProps) => (
  <input
    className="border-2 border-myorange-500 text-myorange-500 hover:text-mygrey-100 hover:bg-myorange-500 p-1 my-2 w-full"
    type="submit"
    value={value}
  />
);

interface LoginFormProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoginForm: FC<LoginFormProps> = ({ setLoading }) => {
  const { login, user, setUser } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent): Promise<boolean> => {
    setLoading(true);
    e.preventDefault();

    // clear inputs in any case
    setEmail('');
    setPassword('');

    const [userCred, err] = await login(email, password);

    if (err) {
      alert('Invalid sign in.');
      return false;
    }

    // userCred must be non-null at this point
    // \?. just for compiler to be happy
    if (userCred?.user == null) {
      alert('Something went wrong on our end. Please try again later.');
    }

    logger.debug(NAMESPACE, 'User Credentials', userCred);
    setUser(userCred.user);
    setLoading(false);
    return true;
  };

  return (
    <form
      className="flex flex-col box-border"
      action="#"
      onSubmit={handleSubmit}
    >
      <LoginInput>
        <LoginLabel htmlFor="email">Email:</LoginLabel>
        <LoginInputBox
          name="email"
          type="email"
          placeholder="person@example.com"
          get={email}
          set={setEmail}
        />
      </LoginInput>
      <LoginInput>
        <LoginLabel htmlFor="password">Password:</LoginLabel>
        <LoginInputBox
          name="password"
          type="password"
          placeholder="strong password"
          get={password}
          set={setPassword}
        />
      </LoginInput>
      <LoginInput>
        <LoginSubmit value="Log in" />
      </LoginInput>
    </form>
  );
};

const Login: FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  // if we are logged in, we don't want to come back here
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <div>
        <div className="mx-[25%] w-1/2 p-4 m-4 dark:bg-mygrey-800 bg-mygrey-200 rounded-md">
          {!loading ? <LoginForm setLoading={setLoading} /> : <Spinner />}
        </div>
      </div>
    </Page>
  );
};

export default Login;
