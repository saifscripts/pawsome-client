export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const UserRoles = ['admin', 'user'] as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
} as const;

export const UserStatus = ['active', 'blocked'] as const;

export const USER_TYPE = {
  BASIC: 'basic',
  PREMIUM: 'premium',
} as const;

export const UserType = ['basic', 'premium'] as const;
