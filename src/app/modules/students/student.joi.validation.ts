import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      if (value.charAt(0).toUpperCase() + value.slice(1) !== value) {
        return helpers.error('string.custom', {
          message: '{VALUE} is not capitalized!',
        });
      }
      return value;
    }, 'capitalize validation')
    .messages({
      'any.required': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.custom': '{#message}',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/, 'capitalize')
    .messages({
      'any.required': 'Last name is required',
      'string.pattern.base': '{VALUE} is not valid data!',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required',
  }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{VALUE} is not valid data',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.date().iso().messages({
    'date.format': 'Date of birth must be in ISO format',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{VALUE} is not a valid email type',
    'any.required': 'Email is required Please',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContact: Joi.string().required().messages({
    'any.required': 'Emergency contact is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#VALUE} is not a valid blood group raju mama',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().uri().optional().messages({
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{VALUE} is not valid',
  }),
});


export default studentValidationSchema;