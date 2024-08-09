import { FC, FormEvent, ReactNode } from 'react';
import Page from '../../common/page/Page';

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
}

const LoginInputBox: FC<LoginInputBoxProps> = ({
  type,
  placeholder,
  name,
}: LoginInputBoxProps) => (
  <input
    className="dark:bg-mygrey-600 outline-myorange-200 hover:outline-myorange-400 flex-1 p-1"
    name={name}
    type={type}
    placeholder={placeholder}
    required
  />
);

interface LoginSubmitProps {
  value: string;
  onSubmit: (e: FormEvent) => boolean;
}

const LoginSubmit: FC<LoginSubmitProps> = ({
  value,
  onSubmit,
}: LoginSubmitProps) => (
  <input
    className="border-2 border-myorange-500 text-myorange-500 hover:text-mygrey-100 hover:bg-myorange-500 p-1 my-2 w-full"
    type="submit"
    value={value}
    onSubmit={onSubmit}
  />
);

const LoginForm: FC = () => (
  <form className="flex flex-col box-border">
    <LoginInput>
      <LoginLabel htmlFor="email">Email:</LoginLabel>
      <LoginInputBox
        name="email"
        type="email"
        placeholder="person@example.com"
      />
    </LoginInput>
    <LoginInput>
      <LoginLabel htmlFor="password">Password:</LoginLabel>
      <LoginInputBox name="password" type="password" placeholder="password" />
    </LoginInput>
    <LoginInput>
      {/* TODO: onSubmit */}
      <LoginSubmit value="Log in" onSubmit={(e) => true} />
    </LoginInput>
  </form>
);

const Login: FC = () => {
  return (
    <Page>
      <div>
        <div className="mx-[25%] w-1/2 p-4 dark:bg-mygrey-800">
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};

export default Login;
