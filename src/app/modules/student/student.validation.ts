 // creating a schema validation using a joi

 import Joi from 'Joi'

    
 const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.empty': 'First name is required',
        'string.max': 'First name can not be more than 20 characters',
        'string.pattern.base': '{#value} is not in capitalize format',
      }),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.empty': 'Last name is required',
        'string.pattern.base': '{#value} is not in capitalize format',
      }),
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required().messages({
      'string.empty': "Father's name is required",
    }),
    fatherOccupation: Joi.string().trim().required().messages({
      'string.empty': "Father's occupation is required",
    }),
    fatherContactNo: Joi.string().trim().required().messages({
      'string.empty': "Father's contact number is required",
    }),
    motherName: Joi.string().trim().required().messages({
      'string.empty': "Mother's name is required",
    }),
    motherOccupation: Joi.string().trim().required().messages({
      'string.empty': "Mother's occupation is required",
    }),
    motherContactNo: Joi.string().trim().required().messages({
      'string.empty': "Mother's contact number is required",
    }),
  });
  
const localGuardianSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.empty': "Local guardian's name is required",
    }),
    occupation: Joi.string().trim().required().messages({
      'string.empty': "Local guardian's occupation is required",
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': "Local guardian's contact number is required",
    }),
    address: Joi.string().required().messages({
      'string.empty': "Local guardian's address is required",
    }),
  });
  
   const studentSchema = Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'Student ID is required',
    }),
    name: userNameSchema.required().messages({
      'object.base': 'Name is required',
    }),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': "Gender can only be 'male', 'female', or 'other'",
        'string.empty': 'Gender is required',
      }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': '{#value} is not a valid email type',
        'string.empty': 'Email is required',
      }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'string.empty': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional()
      .messages({
        'any.only': '{#value} is not a valid blood group',
      }),
    presentAdd: Joi.string().required().messages({
      'string.empty': 'Present address is required',
    }),
    permanentAdd: Joi.string().required().messages({
      'string.empty': 'Permanent address is required',
    }),
    guardian: guardianSchema.required().messages({
      'object.base': 'Guardian details are required',
    }),
    localGuardian: localGuardianSchema.required().messages({
      'object.base': 'Local guardian details are required',
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
      .valid('active', 'inactive')
      .required()
      .messages({
        'any.only': "Status must be either 'active' or 'inactive'",
        'string.empty': 'Active status is required',
      }),
  });
  

  export default studentSchema;