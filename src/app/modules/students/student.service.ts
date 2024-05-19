import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  //build in static method
  const result = await Student.create(studentData);

  if (Student.isUserExists(studentData.id)) {
    throw new Error('User already exist');
  }

  //build in instance method
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exist');
  // }
  // const result = await student.save();
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
