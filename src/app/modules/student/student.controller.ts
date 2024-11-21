import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentSchema from './student.validation';


const createStudent = async (req: Request, res: Response) => {
  try {
   
    const { student: studentData } = req.body;
    const {error} = studentSchema.validate(studentData);
    // console.log(error, value);

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    if(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.details,
          });
    }


    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    // console.log('Requested studentId:', studentId);
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    // console.log('Database query result:', result);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
