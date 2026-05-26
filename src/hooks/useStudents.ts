import { useState, useEffect, useCallback } from 'react';
import { Student, StudentFormData } from '../types/student';

const STORAGE_KEY = 'students_data';

const SEED_DATA: Student[] = [
  { id: '1', studentId: '2024-0001', firstName: 'Emma', lastName: 'Johnson', course: 'BS Computer Science', year: '3rd Year', email: 'emma.johnson@university.edu' },
  { id: '2', studentId: '2024-0002', firstName: 'James', lastName: 'Williams', course: 'BS Information Technology', year: '4th Year', email: 'james.williams@university.edu' },
  { id: '3', studentId: '2024-0003', firstName: 'Sofia', lastName: 'Martinez', course: 'BS Data Science', year: '2nd Year', email: 'sofia.martinez@university.edu' },
  { id: '4', studentId: '2024-0004', firstName: 'Liam', lastName: 'Chen', course: 'BS Software Engineering', year: '4th Year', email: 'liam.chen@university.edu' },
  { id: '5', studentId: '2024-0005', firstName: 'Ava', lastName: 'Thompson', course: 'BS Biology', year: '1st Year', email: 'ava.thompson@university.edu' },
  { id: '6', studentId: '2024-0006', firstName: 'Noah', lastName: 'Patel', course: 'BS Business Administration', year: '3rd Year', email: 'noah.patel@university.edu' },
  { id: '7', studentId: '2024-0007', firstName: 'Isabella', lastName: 'Kim', course: 'BS Information Systems', year: '2nd Year', email: 'isabella.kim@university.edu' },
  { id: '8', studentId: '2024-0008', firstName: 'Ethan', lastName: 'Davis', course: 'BS Mathematics', year: '4th Year', email: 'ethan.davis@university.edu' },
];

function generateStudentId(students: Student[]): string {
  const year = new Date().getFullYear();
  const maxSeq = students.reduce((max, s) => {
    const parts = s.studentId.split('-');
    if (parts[0] === String(year) && parts[1]) {
      const seq = parseInt(parts[1], 10);
      return seq > max ? seq : max;
    }
    return max;
  }, 0);
  return `${year}-${String(maxSeq + 1).padStart(4, '0')}`;
}

function loadStudents(): Student[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // ignore
  }
  return SEED_DATA;
}

function saveStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(loadStudents);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const addStudent = useCallback((data: StudentFormData) => {
    const newStudent: Student = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      studentId: generateStudentId(students),
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  }, [students]);

  const updateStudent = useCallback((id: string, data: StudentFormData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getStudent = useCallback(
    (id: string) => students.find((s) => s.id === id),
    [students]
  );

  return { students, addStudent, updateStudent, deleteStudent, getStudent };
}
