import { Dispatch, FC, FormEvent, ReactNode, useState } from 'react';
import Page from '../../common/page/Page';
import { handleLogin } from './util';
import { AuthProp } from '../../props';

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

interface LoginFormProps extends AuthProp {}

const LoginForm: FC<LoginFormProps> = ({ auth }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent): Promise<boolean> => {
    e.preventDefault();

    // clear inputs in any case
    setEmail('');
    setPassword('');

    return handleLogin(auth, email, password);
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

interface LoginProps extends AuthProp {}

const Login: FC<LoginProps> = ({ auth }: LoginProps) => {
  return (
    <Page>
      <div>
        <div className="mx-[25%] w-1/2 p-4 m-4 dark:bg-mygrey-800 bg-mygrey-200 rounded-md">
          <LoginForm auth={auth} />
        </div>
      </div>
    </Page>
  );
};

export default Login;
