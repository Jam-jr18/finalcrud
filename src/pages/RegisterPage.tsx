import React from 'react';
import { StudentFormData, COURSES, YEARS, emptyStudent, Student } from '../types/student';

interface RegisterPageProps {
  students: Student[];
  editingStudent: Student | null;
  onSubmit: (data: StudentFormData) => void;
  onCancelEdit: () => void;
}

export default function RegisterPage({ editingStudent, onSubmit, onCancelEdit }: RegisterPageProps) {
  const initialData = editingStudent
    ? { firstName: editingStudent.firstName, lastName: editingStudent.lastName, email: editingStudent.email, course: editingStudent.course, year: editingStudent.year }
    : { ...emptyStudent };

  const [formData, setFormData] = React.useState<StudentFormData>(initialData);
  const [errors, setErrors] = React.useState<Partial<Record<keyof StudentFormData, string>>>({});

  React.useEffect(() => {
    setFormData(initialData);
    setErrors({});
  }, [editingStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StudentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.year) newErrors.year = 'Year is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      if (!editingStudent) {
        setFormData({ ...emptyStudent });
      }
    }
  };

  const inputClass = (field: keyof StudentFormData) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
    }`;

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';
  const errorClass = 'text-red-500 text-xs mt-1 font-medium';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {editingStudent ? '✏️ Edit Student' : '📝 Register Student'}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {editingStudent
            ? `Updating record for ${editingStudent.firstName} ${editingStudent.lastName} (${editingStudent.studentId})`
            : 'Fill in the form below to register a new student'}
        </p>
      </div>

      {editingStudent && (
        <button
          onClick={onCancelEdit}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          ← Cancel editing and register new student
        </button>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h3 className="text-white font-bold">
            {editingStudent ? 'Update Information' : 'Student Registration Form'}
          </h3>
          <p className="text-indigo-100 text-xs mt-0.5">Fields marked with * are required</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                className={inputClass('firstName')} placeholder="Juan" />
              {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                className={inputClass('lastName')} placeholder="Dela Cruz" />
              {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className={inputClass('email')} placeholder="student@university.edu" />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass}>Course *</label>
            <select name="course" value={formData.course} onChange={handleChange} className={inputClass('course')}>
              <option value="">Select a course</option>
              {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.course && <p className={errorClass}>{errors.course}</p>}
          </div>

          <div>
            <label className={labelClass}>Year Level *</label>
            <select name="year" value={formData.year} onChange={handleChange} className={inputClass('year')}>
              <option value="">Select year level</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            {errors.year && <p className={errorClass}>{errors.year}</p>}
          </div>

          {/* Info Box */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-700 font-semibold">ℹ️ Note</p>
            <p className="text-xs text-blue-500 mt-1">
              {editingStudent
                ? 'Student ID cannot be changed. Update other fields as needed.'
                : 'A unique Student ID will be automatically generated upon registration.'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            {editingStudent && (
              <button type="button" onClick={onCancelEdit}
                className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            )}
            <button type="submit"
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">
              {editingStudent ? 'Update Student' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
