export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  course: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | '';
  email: string;
}

export type StudentFormData = Omit<Student, 'id' | 'studentId'>;

export const emptyStudent: StudentFormData = {
  firstName: '',
  lastName: '',
  course: '',
  year: '',
  email: '',
};

export const COURSES = [
  'BS Computer Science',
  'BS Information Technology',
  'BS Information Systems',
  'BS Software Engineering',
  'BS Data Science',
  'BS Mathematics',
  'BS Physics',
  'BS Biology',
  'BS Chemistry',
  'BS Electrical Engineering',
  'BS Mechanical Engineering',
  'BS Civil Engineering',
  'BS Business Administration',
  'BS Accountancy',
  'BS Economics',
  'BS Psychology',
  'BS Nursing',
  'BA English Literature',
  'BA Political Science',
  'BA Sociology',
];

export const YEARS: Student['year'][] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
