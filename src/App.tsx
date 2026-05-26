import React from 'react';
import { Student, StudentFormData } from './types/student';
import { useStudents } from './hooks/useStudents';
import Navigation, { Page } from './components/Navigation';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = React.useState<Student | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'register') {
      setEditingStudent(null);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setCurrentPage('register');
  };

  const handleDelete = (student: Student) => {
    setDeletingStudent(student);
  };

  const confirmDelete = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id);
      showToast(`${deletingStudent.firstName} ${deletingStudent.lastName} deleted successfully`);
      setDeletingStudent(null);
    }
  };

  const handleFormSubmit = (data: StudentFormData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
      showToast(`${data.firstName} ${data.lastName} updated successfully`);
      setEditingStudent(null);
      setCurrentPage('students');
    } else {
      const newStudent = addStudent(data);
      showToast(`${newStudent.firstName} ${newStudent.lastName} registered successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-5 py-3 rounded-xl shadow-lg bg-emerald-500 text-white font-semibold text-sm animate-slide-in">
          ✅ {toast}
        </div>
      )}

      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={navigateTo} />

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {currentPage === 'home' && (
          <HomePage students={students} onNavigate={navigateTo} />
        )}

        {currentPage === 'register' && (
          <RegisterPage
            students={students}
            editingStudent={editingStudent}
            onSubmit={handleFormSubmit}
            onCancelEdit={() => { setEditingStudent(null); setCurrentPage('students'); }}
          />
        )}

        {currentPage === 'students' && (
          <StudentsPage
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        Student Information Management System • Built with React & Tailwind CSS
      </footer>

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <ConfirmModal
          title="Delete Student"
          message={`Are you sure you want to delete ${deletingStudent.firstName} ${deletingStudent.lastName}? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingStudent(null)}
          confirmText="Delete"
        />
      )}
    </div>
  );
}
