export const View = {
  Landing: 'landing',
  Login: 'login',
  LoginBunker: 'login-bunker',
  SignupProfile: 'signup-profile',
  SignupKey: 'signup-key',
  SignupComplete: 'signup-complete',
} as const;

export type View = typeof View[keyof typeof View];
