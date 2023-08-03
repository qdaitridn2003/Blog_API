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
  confirmPassword: Zod.string().regex(new RegExp('^[a-z0-9_.-]*$'), {
    message: 'Confirm password must do not have special characters and uppercase letters',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Confirm password is not match',
  path: ['confirmPassword'],
});

export const ChangePasswordValidate = Zod.object({
  oldPassword: Zod.string().regex(new RegExp('^[a-z0-9_.-]*$'), {
    message: 'Old password must do not have special characters and uppercase letters',
  }),
  newPassword: Zod.string()
    .regex(new RegExp('^[a-z0-9_.-]*$'), {
      message: 'New password must do not have special characters and uppercase letters',
    })
    .min(6, { message: 'New password must be at least 6 characters' }),
  confirmPassword: Zod.string().regex(new RegExp('^[a-z0-9_.-]*$'), {
    message: 'Confirm new password must do not have special characters and uppercase letters',
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Confirm password is not match',
  path: ['confirmPassword'],
});

export const EmailValidate = Zod.object({
  username: Zod.string().email({ message: 'Username must be an email address' }),
});

export const ResetPasswordValidate = Zod.object({
  username: Zod.string().email({ message: 'Username must be an email address' }),
  otp: Zod.string().length(6, { message: 'Otp must be at least 6 number' }),
  newPassword: Zod.string()
    .regex(new RegExp('^[a-z0-9_.-]*$'), {
      message: 'New password must do not have special characters and uppercase letters',
    })
    .min(6, { message: 'New password must be at least 6 characters' }),
  confirmPassword: Zod.string().regex(new RegExp('^[a-z0-9_.-]*$'), {
    message: 'Confirm new password must do not have special characters and uppercase letters',
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Confirm password is not match',
  path: ['confirmPassword'],
});
