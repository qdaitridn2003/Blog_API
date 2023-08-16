import { z as Zod } from 'zod';
import { checkOver18 } from '../utilities';

export const ProfileValidate = Zod.object({
  firstName: Zod.string(),
  subName: Zod.string().optional(),
  lastName: Zod.string(),
  dateOfBirth: Zod.date().min(new Date('1900-01-01'), { message: 'You are too old, please choose another date' }),
  gender: Zod.enum(['male', 'female'], {
    errorMap: (issue, ctx) => ({ message: 'Gender must be male or female' }),
  }),
  bio: Zod.string().optional(),
  auth_id: Zod.string().optional(),
})
  .refine((data) => checkOver18(data.dateOfBirth), {
    message: "You must over 18 years old to access blog app's feature",
    path: ['dateOfBirth'],
  })
  .refine((data) => data.firstName, {
    message: 'First name must be not empty',
    path: ['firstName'],
  })
  .refine((data) => data.lastName, {
    message: 'Last name must be not empty',
    path: ['lastName'],
  });
