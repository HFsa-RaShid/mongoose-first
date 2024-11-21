import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Name is required'],
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: [true, 'Name is required'],
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String , required: true, unique: true},
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
        values: ['male', 'female', 'other'],
        message: "The gender can only be one of the following: 'male', 'female'message, or 'other'"
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
    },
  },
  presentAdd: {
    type: String,
    required: true,
  },
  permanentAdd: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
  },
})

export const StudentModel = model<Student>('Student', studentSchema)
