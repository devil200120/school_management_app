/**
 * JSS Secondary Level Report Card Template
 * Premium professional design for Junior Secondary School students
 * Enhanced with modern UI/UX and detailed analytics
 */

const SecondaryJSSTemplate = () => {
  return (
    <div className="w-full bg-white relative flex flex-col shadow-2xl border border-gray-300 pb-0">
      {/* Premium Header with Modern Design */}
      <div className="relative bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 translate-y-32"></div>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm z-10">
          <div className="text-xs font-bold uppercase tracking-wide">Academic Year</div>
          <div className="text-xl font-bold">2024/2025</div>
        </div>
        
        <div className="relative px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* School Logo with Premium Frame */}
              <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform">
                <img
                  src="/src/pages/admin/report-card/Eduos.png"
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* School Information */}
              <div>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  EDUOS ACADEMY
                </h1>
                <p className="text-blue-200 font-semibold text-sm mb-2 uppercase tracking-wider">
                  Junior Secondary School Division
                </p>
                <div className="flex items-center space-x-4 text-xs text-blue-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    123 Education Avenue, Lagos
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    08163237773
                  </span>
                </div>
              </div>
            </div>
            
            {/* Student Photo with Premium Frame */}
            <div className="relative">
              <div className="w-28 h-32 rounded-xl overflow-hidden shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                <img
                  src="/src/pages/admin/report-card/profile_photo.png"
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Title Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center py-4 shadow-lg">
        <div className="flex items-center justify-center gap-3">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          <div>
            <h2 className="text-xl font-bold tracking-wide uppercase">Termly Academic Progress Report</h2>
            <p className="text-sm mt-1 opacity-90">First Term • Academic Year 2024/2025 • JSS 1</p>
          </div>
        </div>
      </div>

      {/* Student Information Cards */}
      <div className="mx-8 mt-8 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Bio Data */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 overflow-hidden transform hover:scale-[1.02] transition-transform">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-wide">Student Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Full Name:</span>
              <span className="font-bold text-gray-900 text-right">ADEYEMI, Oluwaseun</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Admission No:</span>
              <span className="font-bold text-blue-700">JSS/2024/087</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Class:</span>
              <span className="font-bold text-gray-900">JSS 1A</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Gender:</span>
              <span className="font-bold text-gray-900">Male</span>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg border border-emerald-200 overflow-hidden transform hover:scale-[1.02] transition-transform">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-wide">Performance Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Class Position:</span>
              <span className="font-bold text-blue-700 text-lg">2nd of 40</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Total Subjects:</span>
              <span className="font-bold text-gray-900">10</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-gray-600 font-medium text-sm">Average Score:</span>
              <span className="font-bold text-emerald-700 text-lg">82.5%</span>
            </div>
            <div className="flex items-start justify-between pt-3 border-t border-emerald-200">
              <span className="text-gray-600 font-medium text-sm">Overall Grade:</span>
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                DISTINCTION (A)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Performance Table with Premium Design */}
      <div className="mx-8 mb-6 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 flex items-center justify-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          <h3 className="font-bold text-lg uppercase tracking-wide">Academic Performance Record</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="text-left py-4 px-4 font-bold text-gray-800 border-b-2 border-gray-300 text-sm">SUBJECT</th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">
                  1ST CA<br/><span className="font-normal">(10)</span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">
                  2ND CA<br/><span className="font-normal">(10)</span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">
                  3RD CA<br/><span className="font-normal">(20)</span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">
                  EXAM<br/><span className="font-normal">(60)</span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">
                  TOTAL<br/><span className="font-normal">(100)</span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">GRADE</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800 border-b-2 border-gray-300 text-xs">REMARK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors border-b border-gray-200">
                <td className="py-3 px-4 font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">📐</span>
                  Mathematics
                </td>
                <td className="py-3 px-3 text-center text-gray-700">8</td>
                <td className="py-3 px-3 text-center text-gray-700">9</td>
                <td className="py-3 px-3 text-center text-gray-700">18</td>
                <td className="py-3 px-3 text-center text-gray-700">50</td>
                <td className="py-3 px-3 text-center font-bold text-green-700 text-lg">85</td>
                <td className="py-3 px-3 text-center">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-lg font-bold shadow-md">A</span>
                </td>
                <td className="py-3 px-4 text-center text-green-700 font-semibold text-sm">Excellent</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors border-b border-gray-200">
                <td className="py-3 px-4 font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  English Language
                </td>
                <td className="py-3 px-3 text-center text-gray-700">9</td>
                <td className="py-3 px-3 text-center text-gray-700">8</td>
                <td className="py-3 px-3 text-center text-gray-700">17</td>
                <td className="py-3 px-3 text-center text-gray-700">48</td>
                <td className="py-3 px-3 text-center font-bold text-green-700 text-lg">82</td>
                <td className="py-3 px-3 text-center">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-lg font-bold shadow-md">A</span>
                </td>
                <td className="py-3 px-4 text-center text-green-700 font-semibold text-sm">Excellent</td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors border-b border-gray-200">
                <td className="py-3 px-4 font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">🔬</span>
                  Basic Science
                </td>
                <td className="py-3 px-3 text-center text-gray-700">7</td>
                <td className="py-3 px-3 text-center text-gray-700">8</td>
                <td className="py-3 px-3 text-center text-gray-700">16</td>
                <td className="py-3 px-3 text-center text-gray-700">47</td>
                <td className="py-3 px-3 text-center font-bold text-green-700 text-lg">78</td>
                <td className="py-3 px-3 text-center">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg font-bold shadow-md">B</span>
                </td>
                <td className="py-3 px-4 text-center text-blue-700 font-semibold text-sm">Very Good</td>
              </tr>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold">
                <td className="py-4 px-4 text-base" colSpan="5">OVERALL PERFORMANCE</td>
                <td className="py-4 px-3 text-center text-xl">82%</td>
                <td className="py-4 px-3 text-center">
                  <span className="bg-white text-green-700 px-3 py-1 rounded-lg font-bold shadow-lg">A</span>
                </td>
                <td className="py-4 px-4 text-center text-base">Outstanding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance & Remarks Section */}
      <div className="mx-8 mb-0 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Record */}
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl shadow-lg border border-cyan-200 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 px-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-wide">Attendance Record</h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">School Opened:</span>
              <span className="font-bold text-gray-900 text-lg">95 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">Times Present:</span>
              <span className="font-bold text-green-700 text-lg">93 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">Times Absent:</span>
              <span className="font-bold text-red-600 text-lg">2 days</span>
            </div>
            <div className="pt-3 border-t border-cyan-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium text-sm">Attendance Rate:</span>
                <span className="font-bold text-green-700 text-xl">97.9%</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-sm" style={{ width: '97.9%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Remarks */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-wide">Official Remarks</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  CT
                </div>
                <span className="text-xs text-gray-600 font-semibold uppercase">Class Teacher's Remark</span>
              </div>
              <div className="text-sm font-medium text-gray-700 bg-white p-3 rounded-lg shadow-sm italic">
                Hardworking and disciplined student. Shows great potential in all subjects.
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  PR
                </div>
                <span className="text-xs text-gray-600 font-semibold uppercase">Principal's Comment</span>
              </div>
              <div className="text-sm font-medium text-gray-700 bg-white p-3 rounded-lg shadow-sm italic">
                Excellent performance! Keep up the outstanding work.
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs text-amber-800 font-semibold uppercase">Next Term Begins</span>
              </div>
              <div className="text-lg font-bold text-amber-900">January 8, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryJSSTemplate;
