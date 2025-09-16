export const Screen = {
  Landing: 'landing',
  Login: 'login',
  LoginBunker: 'login/bunker',
  Signup: 'signup',
} as const;

export type Screen = typeof Screen[keyof typeof Screen];
