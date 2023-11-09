export type User = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  salt: string;
  hash: string;
  createdAt: Date;
  id: string;
};
