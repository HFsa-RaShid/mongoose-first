import { z } from 'zod';

// UserName Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must start with a capital letter' }
    ),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: 'Last name must contain only alphabets' }),
});

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required"),
  fatherOccupation: z.string().trim().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().trim().min(1, "Father's contact number is required"),
  motherName: z.string().trim().min(1, "Mother's name is required"),
  motherOccupation: z.string().trim().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().trim().min(1, "Mother's contact number is required"),
});

// Local Guardian Schema
const localGuardianSchema = z.object({
  name: z.string().trim().min(1, "Local guardian's name is required"),
  occupation: z.string().trim().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().trim().min(1, "Local guardian's contact number is required"),
  address: z.string().trim().min(1, "Local guardian's address is required"),
});

// Student Schema
const studentSchema = z.object({
    id: z.string().trim().min(1, 'Student ID is required'),
    password: z.string().trim().min(6, 'Password is required').max(20, 'Password is required'),
    name: userNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().default(''), // Providing a default value (empty string in this case)
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, 'Email is required'),
    contactNo: z.string().trim().min(1, 'Contact number is required'),
    emergencyContactNo: z.string().trim().min(1, 'Emergency contact number is required'),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional()
      .refine((value) => !!value, { message: '{VALUE} is not a valid blood group' }),
    presentAdd: z.string().trim().min(1, 'Present address is required'),
    permanentAdd: z.string().trim().min(1, 'Permanent address is required'),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'inactive']),
    isDeleted: z.boolean().default(false),
  });
  

export default studentSchema ;
