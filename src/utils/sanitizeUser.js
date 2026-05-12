export const sanitizeUser = (user) => {
  const obj = user.toObject();

  delete obj.password;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpire;
  delete obj.emailVerifyToken;
  delete obj.emailVerifyExpire;
  delete obj.__v;

  return obj;
};
