export const View = {
  Landing: 'landing',
  Login: 'login',
  LoginBunker: 'login-bunker',
  Signup: 'signup',
  SignupProfile: 'signup-profile',
} as const;

export type View = typeof View[keyof typeof View];
