import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentSchema from './student.zod.validation'
// import studentSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // data validation using zod
    const zodParseData = studentSchema.parse(studentData)
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // data validation using Joi
    // const {error,value} = studentSchema.validate(studentData);
    // const result = await StudentServices.createStudentIntoDB(value)
    // console.log(error, value);
    // if (error) {
    //     res.status(500).json({
    //       success: false,
    //       message: 'Something went wrong',
    //       error: error.details,
    //     })
    //   }



    // will call service func to send this data(buildIn)
    // const result = await StudentServices.createStudentIntoDB(studentData)

   

      // Success Response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (err: any) {
      console.error("Error during student creation:", err.message); 
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
}

// get all student
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    console.error("Error during student creation:", err.message); 
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
}

// get single student
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
  } catch (err: any) {
    console.error("Error during student creation:", err.message); 
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
}

// delete
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    // console.log('Requested studentId:', studentId);
    const result = await StudentServices.deleteStudentFromDB(studentId)
    // console.log('Database query result:', result);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
  } catch (err: any) {
    console.error("Error during student creation:", err.message); 
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
