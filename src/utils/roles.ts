const ROLES = {
  admin: 0,
  contributor: 1,
} as const;

export const getRoleValueFromName = (name: keyof typeof ROLES) => ROLES[name];
