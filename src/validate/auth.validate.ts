import { z as Zod } from 'zod';

export const LoginValidate = Zod.object({
  username: Zod.string().email({ message: 'Username must be an email address' }),
  password: Zod.string()
    .regex(new RegExp('^[a-z0-9]*$'), {
      message: 'Password must do not have special characters and uppercase letters',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const RegisterValidate = Zod.object({
  username: Zod.string().email({ message: 'Username must be an email address' }),
  password: Zod.string()
    .regex(new RegExp('^[a-z0-9_.-]*$'), {
      message: 'Password must do not have special characters and uppercase letters',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: Zod.string()
    .regex(new RegExp('^[a-z0-9_.-]*$'), {
      message: 'Confirm password must do not have special characters and uppercase letters',
    })
    .min(6, { message: 'Confirm password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password is not match',
  path: ['password', 'confirmPassword'],
});
