export const Screen = {
  Landing: 'landing',
  Login: 'login',
  Signup: 'signup',
} as const;

export type Screen = typeof Screen[keyof typeof Screen];
