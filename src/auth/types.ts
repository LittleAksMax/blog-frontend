export type SignInType = (email: string, password: string) => Promise<boolean>;
export type SignOutType = () => Promise<boolean>;
