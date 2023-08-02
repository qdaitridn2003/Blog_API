import bcrypt from 'bcrypt';

export const generateHashPassword = (password: string) => {
  const saltHash = bcrypt.genSaltSync(1);
  const hashPassword = bcrypt.hashSync(password, saltHash);
  return hashPassword;
};

export const compareHashPassword = (password: string, hashPassword: string) => {
  const compareResult = bcrypt.compareSync(password, hashPassword);
  return compareResult;
};
