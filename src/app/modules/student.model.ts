import { Schema, model } from 'mongoose'
import validator from 'validator'

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface'
import bcrypt from 'bcrypt'
import config from '../config'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [20, 'First name can not be more than 20 character'],
    // validate: {
    //     validator: function(value: string){
    //         const firstNameStr= value.charAt(0).toUpperCase() + value.slice(1);
    //         if(value !== firstNameStr){
    //             return false
    //         }
    //         return true;
    //     },
    //     message: '{VALUE} is not capitalize format',
    // }
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // validate: {
    //     validator: (value: string)=> validator.isAlpha(value),
    //     message: '{VALUE} is not capitalize format',
    // }
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    trim: true,
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password ID is required'],
    minlength: [6, 'Password can not be less than 6 char'],
    maxlength: [20, 'Password can not be more than 20 char'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "Gender can only be 'male', 'female', or 'other'",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email type',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAdd: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAdd: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: "Status must be either 'active' or 'inactive'",
    },
    required: [true, 'Active status is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
})

// pre save middleware/hook : will work on create(), save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  const user = this
  // hashing password and save into  DB
  user.password= await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '',
  next()
})

// query middleware
studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isDeleted : {$ne: true}}});
  next();
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  // console.log('User exists:', existingUser);
  return existingUser
}

// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
