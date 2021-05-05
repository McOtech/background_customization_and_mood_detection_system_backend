export const userType = {
  client: 'client',
  accounts: 'accounts',
  support: 'support',
  admin: 'admin',
};
export const userTypes = [
  userType.client,
  userType.accounts,
  userType.support,
  userType.admin,
];

export enum sex {
  'male',
  'female',
  'other',
}

export enum visibility {
  'private',
  'public',
}

export const filePaths = {
  profile: () => {
    const path = '/uploads/images/profile';
    return {
      dest: `./public${path}`,
      avatar: `${path}/avatar.png`,
    };
  },
};
