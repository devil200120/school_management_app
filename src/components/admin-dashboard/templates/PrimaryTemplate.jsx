/**
 * Primary Level Report Card Template
 * Ultra-premium professional design with modern styling and advanced layout
 * Features gradient backgrounds, shadows, sophisticated typography, and premium visual elements
 */

const PrimaryTemplate = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white relative flex flex-col shadow-2xl border border-gray-200" style={{ padding: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Premium Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative p-4">
          <div className="flex items-center justify-between">
            {/* Premium School Identity */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <img
                  src="/EDUOSlogo.png"
                  alt="EDUOS Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold tracking-wide">EDUOS ACADEMY</div>
                <div className="text-blue-200 text-xs font-medium">Excellence in Education Since 2010</div>
                <div className="text-blue-300 text-xs">📞 08160327173 | 📧 admin@eduos.edu.ng</div>
              </div>
            </div>
            
            {/* Premium Status Badge */}
            <div className="flex flex-col items-end space-y-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>VERIFIED</span>
              </div>
              <div className="text-xs text-blue-200">Academic Session 2023/2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Student Information Card */}
      <div className="mx-6 mt-6 mb-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Student Information
            </h3>
          </div>
          
          {/* Student Details Grid */}
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Student Photo Section */}
              <div className="col-span-3">
                <div className="text-center">
                  <div className="w-32 h-40 mx-auto border-4 border-gray-200 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src="/profile_photo.png"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium text-blue-700">
                    Primary One
                  </div>
                </div>
              </div>
              
              {/* Student Information Grid */}
              <div className="col-span-9">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Admission Number</label>
                    <div className="mt-1 text-lg font-bold text-gray-900">Fcapt/nd/cps/14/263</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Sport House</label>
                    <div className="mt-1 text-lg font-bold text-gray-900">Blue House</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                    <div className="mt-1 text-lg font-bold text-gray-900">MUHAMMAD Ahmad</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Academic Session</label>
                    <div className="mt-1 text-lg font-bold text-gray-900">2023/2024</div>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="mt-4 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-blue-800">First Term Academic Report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Academic Performance Section */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Section Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-white bg-opacity-20 p-1 rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Academic Performance Report</h2>
                  <p className="text-indigo-200 text-xs">First Term Assessment Summary</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-indigo-200">Total Subjects</div>
                <div className="text-2xl font-bold">8</div>
              </div>
            </div>
          </div>

          {/* Modern Academic Table */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-3 py-2 text-left font-bold text-gray-700 border-b-2 border-gray-200 text-sm">Subject</th>
                  <th className="px-2 py-2 text-center font-bold text-gray-700 border-b-2 border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-xs">First CA</span>
                      <span className="text-[10px] text-gray-500">(20%)</span>
                    </div>
                  </th>
                  <th className="px-2 py-2 text-center font-bold text-gray-700 border-b-2 border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-xs">Second CA</span>
                      <span className="text-[10px] text-gray-500">(10%)</span>
                    </div>
                  </th>
                  <th className="px-2 py-2 text-center font-bold text-gray-700 border-b-2 border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-xs">Examination</span>
                      <span className="text-[10px] text-gray-500">(70%)</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">Total Score</th>
                  <th className="px-4 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">Grade</th>
                  <th className="px-4 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">Position</th>
                  <th className="px-4 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">Remark</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: 'Mathematics', ca1: 18, ca2: 8, exam: 62, total: 88, grade: 'A', position: '2nd', remark: 'Excellent' },
                  { subject: 'English Language', ca1: 17, ca2: 9, exam: 58, total: 84, grade: 'A', position: '1st', remark: 'Outstanding' },
                  { subject: 'Basic Science', ca1: 16, ca2: 7, exam: 55, total: 78, grade: 'A', position: '3rd', remark: 'Very Good' },
                  { subject: 'Social Studies', ca1: 15, ca2: 8, exam: 52, total: 75, grade: 'B+', position: '4th', remark: 'Good' },
                  { subject: 'Creative Arts', ca1: 19, ca2: 9, exam: 65, total: 93, grade: 'A+', position: '1st', remark: 'Exceptional' },
                  { subject: 'Physical Education', ca1: 18, ca2: 8, exam: 60, total: 86, grade: 'A', position: '2nd', remark: 'Excellent' },
                  { subject: 'Computer Studies', ca1: 17, ca2: 9, exam: 58, total: 84, grade: 'A', position: '1st', remark: 'Outstanding' },
                  { subject: 'Moral Instruction', ca1: 19, ca2: 10, exam: 68, total: 97, grade: 'A+', position: '1st', remark: 'Exemplary' }
                ].map((row, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{row.subject}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {row.ca1}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {row.ca2}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-8 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {row.exam}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-8 bg-indigo-600 text-white rounded-full font-bold">
                        {row.total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                        row.grade.includes('A+') ? 'bg-emerald-100 text-emerald-800' :
                        row.grade.includes('A') ? 'bg-green-100 text-green-800' :
                        row.grade.includes('B') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {row.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">{row.position}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        row.remark === 'Exceptional' || row.remark === 'Exemplary' ? 'bg-emerald-100 text-emerald-700' :
                        row.remark === 'Outstanding' || row.remark === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                        row.remark === 'Very Good' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {row.remark}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Cards */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-indigo-600">688</div>
                <div className="text-sm text-gray-600">Total Score</div>
                <div className="text-xs text-gray-500">Out of 800</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">86.0%</div>
                <div className="text-sm text-gray-600">Average</div>
                <div className="text-xs text-gray-500">Class Performance</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">2nd</div>
                <div className="text-sm text-gray-600">Position</div>
                <div className="text-xs text-gray-500">Out of 35</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-purple-600">A</div>
                <div className="text-sm text-gray-600">Overall Grade</div>
                <div className="text-xs text-gray-500">Excellent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Bottom Section - Remarks and Skills */}
      <div className="mx-6 mb-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Enhanced Remarks Section */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Remarks Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4">
                <h3 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Teacher's Assessment
                </h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Head of School Remark */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-500 text-white p-1 rounded-full mr-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Head of School's Remark</h4>
                  </div>
                  <p className="text-gray-700 font-medium italic">"Exceptional performance across all subjects. Ahmad demonstrates outstanding dedication and intellectual curiosity. Keep up the excellent work!"</p>
                </div>

                {/* Class Teacher Remark */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-500 text-white p-1 rounded-full mr-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Class Teacher's Remark</h4>
                  </div>
                  <p className="text-gray-700 font-medium italic">"Ahmad shows remarkable improvement in all areas. His participation in class discussions is commendable. Continue this excellent trajectory."</p>
                </div>

                {/* Signature Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-2">
                        <img
                          src="/EDUOSlogo.png"
                          alt="Head Teacher Signature"
                          className="h-12 mx-auto object-contain"
                        />
                      </div>
                      <div className="text-sm font-semibold text-gray-700">Head of School</div>
                      <div className="text-xs text-gray-500">Dr. Sarah Johnson</div>
                    </div>
                    <div className="text-center">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-2">
                        <div className="h-12 flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">Class Teacher</div>
                      <div className="text-xs text-gray-500">Mrs. Fatima Aliyu</div>
                    </div>
                  </div>
                </div>

                {/* Next Term Info */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Next Term Information</h4>
                      <p className="text-sm text-gray-600">School resumes: January 15, 2024</p>
                      <p className="text-sm text-gray-600">Second Term fees: ₦85,000</p>
                    </div>
                    <div className="bg-orange-500 text-white p-2 rounded-full">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Skills Assessment */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Skills Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-4">
                <h3 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Skills & Attributes
                </h3>
              </div>

              <div className="p-4">
                {/* Skills Grid */}
                <div className="space-y-3">
                  {[
                    { skill: 'Attendance', score: 5, icon: '📅', color: 'bg-blue-500' },
                    { skill: 'Punctuality', score: 5, icon: '⏰', color: 'bg-green-500' },
                    { skill: 'Handwriting', score: 4, icon: '✍️', color: 'bg-purple-500' },
                    { skill: 'Games/Sports', score: 5, icon: '⚽', color: 'bg-orange-500' },
                    { skill: 'Computer Skills', score: 5, icon: '💻', color: 'bg-indigo-500' },
                    { skill: 'Honesty', score: 5, icon: '🤝', color: 'bg-emerald-500' },
                    { skill: 'Leadership', score: 4, icon: '👑', color: 'bg-yellow-500' },
                    { skill: 'Creativity', score: 5, icon: '🎨', color: 'bg-pink-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-3 h-3 rounded-full ${
                                star <= item.score ? item.color : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-800">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills Legend */}
                <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">Rating Scale:</div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>5 - Outstanding</div>
                    <div>4 - Very Good</div>
                    <div>3 - Good</div>
                    <div>2 - Fair</div>
                    <div>1 - Needs Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-4 mt-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Empowering Excellence Through Education</span>
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-xs text-gray-400">This report card is generated electronically and is valid without signature</div>
      </div>
    </div>
  );
};

export default PrimaryTemplate;
