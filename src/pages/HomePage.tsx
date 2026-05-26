import React from 'react';
import { Student } from '../types/student';

interface HomePageProps {
  students: Student[];
  onNavigate: (page: 'register' | 'students') => void;
}

export default function HomePage({ students, onNavigate }: HomePageProps) {
  const recentStudents = React.useMemo(() => {
    return [...students].reverse().slice(0, 5);
  }, [students]);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="text-center py-12 sm:py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-3xl shadow-lg shadow-indigo-200 mb-6">
          🎓
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Student Information Management
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">
          Easily manage student records — register new students, view details, and keep everything organized in one place.
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => onNavigate('register')}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            + Register Student
          </button>
          <button
            onClick={() => onNavigate('students')}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            View All Students →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">👥</div>
          <p className="text-4xl font-extrabold text-gray-900">{students.length}</p>
          <p className="text-sm text-gray-400 font-medium mt-1">Total Students</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl mb-4">📋</div>
          <p className="text-4xl font-extrabold text-gray-900">{recentStudents.length}</p>
          <p className="text-sm text-gray-400 font-medium mt-1">Recent Entries</p>
        </div>
      </div>

      {/* Recently Added */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">Recently Added Students</h3>
          <button
            onClick={() => onNavigate('students')}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All →
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-gray-500 font-semibold">No students yet</p>
            <p className="text-sm text-gray-400 mt-1">Register your first student to get started</p>
            <button
              onClick={() => onNavigate('register')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentStudents.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-4 px-6 py-4 hover:bg-indigo-50/40 transition-colors">
                <span className="text-xs font-bold text-gray-300 w-5 text-center">{idx + 1}</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {s.firstName[0]}{s.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{s.firstName} {s.lastName}</p>
                  <p className="text-xs text-gray-400">{s.studentId}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-500 font-medium">{s.course}</p>
                  <p className="text-xs text-gray-400">{s.year}</p>
                </div>
                <div className="hidden md:block text-sm text-gray-400 truncate max-w-[200px]">
                  {s.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
