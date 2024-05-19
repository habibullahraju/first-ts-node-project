import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string()
    .max(20, 'First name cannot be more than 20 characters')
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: 'First name is not capitalized' }),
  middleName: z.string().optional(),
  lastName: z.string()
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'Last name is not valid' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']).refine(value => ['male', 'female', 'other'].includes(value), { message: 'Gender is not valid data' }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Email is not valid' }),
  contactNo: z.string(),
  emergencyContact: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
