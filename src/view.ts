export const View = {
  Landing: 'landing',
  Login: 'login',
  LoginBunker: 'login-bunker',
  Signup: 'signup',
  SignupProfile: 'signup-profile',
  SignupKey: 'signup-key',
} as const;

export type View = typeof View[keyof typeof View];
