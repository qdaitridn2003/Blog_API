import { z as Zod } from 'zod';
import { defaultAvatarUrl } from '../utilities';

export const ProfileValidate = Zod.object({
  firstName: Zod.string(),
  subName: Zod.string().optional(),
  lastName: Zod.string(),
  dateOfBirth: Zod.date().min(new Date('1900-01-01'), { message: 'You are too old, please choose another date' }),
  gender: Zod.enum(['male', 'female']),
  bio: Zod.string().optional(),
  avatar: Zod.string().default(defaultAvatarUrl),
});
