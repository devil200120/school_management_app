/**
 * Nursery Level Report Card Template
 * Mind-blowing, playful design with cartoon elements, bright colors, and child-friendly animations
 * Features rainbow themes, cute characters, and interactive visual elements
 */

const NurseryTemplate = () => {
  return (
    <div className="w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative flex flex-col overflow-hidden" style={{ fontFamily: 'Comic Sans MS, cursive, system-ui' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-pink-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-10 w-14 h-14 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Decorative Stars */}
        <div className="absolute top-20 left-1/3 text-4xl text-yellow-400 opacity-70 animate-pulse">⭐</div>
        <div className="absolute top-40 right-1/4 text-3xl text-pink-400 opacity-60 animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
        <div className="absolute bottom-32 left-1/2 text-3xl text-purple-400 opacity-50 animate-pulse" style={{ animationDelay: '2s' }}>✨</div>
      </div>

      {/* Super Colorful Header with Rainbow Theme */}
      <div className="relative bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 text-white shadow-xl" style={{ 
        background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        {/* Playful Header Content */}
        <div className="relative p-4">
          {/* Fun Decorative Elements */}
          <div className="absolute top-2 left-5 text-2xl animate-bounce">🎈</div>
          <div className="absolute top-3 right-8 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎨</div>
          <div className="absolute bottom-2 left-20 text-xl animate-bounce" style={{ animationDelay: '1s' }}>🌈</div>
          <div className="absolute bottom-3 right-20 text-xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎪</div>
          
          <div className="flex items-center justify-between">
            {/* School Identity with Fun Elements */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/EDUOSlogo.png"
                  alt="EDUOS Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold tracking-wide text-white drop-shadow-lg">
                  🏫 LITTLE STARS ACADEMY 🌟
                </div>
                <div className="text-lg text-yellow-200 font-semibold mt-1">
                  🎭 Where Learning is Fun & Magical! 🎪
                </div>
                <div className="text-white text-xs mt-2 bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block">
                  📞 08160327173 | 📧 littlestars@eduos.edu.ng
                </div>
              </div>
            </div>
            
            {/* Super Fun Status Badge */}
            <div className="flex flex-col items-end space-y-3">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-pulse flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span>SUPERSTAR!</span>
                <span className="text-2xl">✨</span>
              </div>
              <div className="bg-white bg-opacity-90 text-purple-600 px-4 py-2 rounded-full text-sm font-bold">
                🎓 Nursery Session 2023/2024 🎓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Magical Student Information Card */}
      <div className="mx-8 mt-8 mb-6">
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-rainbow overflow-hidden relative" style={{
          border: '6px solid',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff) 1',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 30px rgba(255,107,107,0.3)'
        }}>
          {/* Playful Header */}
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 px-8 py-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="text-6xl absolute top-0 left-10 animate-pulse">🎨</div>
              <div className="text-4xl absolute top-5 right-20 animate-bounce">🌈</div>
            </div>
            <h3 className="text-2xl font-bold text-white relative z-10 flex items-center justify-center">
              <span className="text-3xl mr-3">👶</span>
              Little Star Information
              <span className="text-3xl ml-3">⭐</span>
            </h3>
          </div>
          
          {/* Student Details in Fun Layout */}
          <div className="p-8 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
            <div className="grid grid-cols-12 gap-8">
              {/* Cute Photo Section */}
              <div className="col-span-4">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-40 h-48 mx-auto border-8 border-rainbow rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-pink-200 to-purple-200 relative" style={{
                      border: '8px solid',
                      borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) 1'
                    }}>
                      <img
                        src="/profile_photo.png"
                        alt="Little Star"
                        className="w-full h-full object-cover"
                      />
                      {/* Fun Frame Decorations */}
                      <div className="absolute -top-3 -left-3 text-2xl animate-bounce">🎈</div>
                      <div className="absolute -top-3 -right-3 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎀</div>
                      <div className="absolute -bottom-3 -left-3 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🧸</div>
                      <div className="absolute -bottom-3 -right-3 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌟</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                    🎪 Nursery One Superstar! 🎪
                  </div>
                  <div className="mt-3 flex justify-center space-x-2">
                    <span className="text-2xl animate-bounce">🌟</span>
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</span>
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🌟</span>
                  </div>
                </div>
              </div>
              
              {/* Colorful Information Cards */}
              <div className="col-span-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-red-200 to-pink-300 rounded-2xl p-4 shadow-lg border-4 border-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">🎫</span>
                      <label className="text-sm font-bold text-red-700 uppercase">Admission Number</label>
                    </div>
                    <div className="text-xl font-bold text-red-800">Fcapt/nd/cps/14/263</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl p-4 shadow-lg border-4 border-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">🏠</span>
                      <label className="text-sm font-bold text-blue-700 uppercase">Sport House</label>
                    </div>
                    <div className="text-xl font-bold text-blue-800">Rainbow House</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl p-4 shadow-lg border-4 border-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">👶</span>
                      <label className="text-sm font-bold text-green-700 uppercase">Little Star's Name</label>
                    </div>
                    <div className="text-xl font-bold text-green-800">MUHAMMAD Ahmad</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-200 to-pink-300 rounded-2xl p-4 shadow-lg border-4 border-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">📅</span>
                      <label className="text-sm font-bold text-purple-700 uppercase">Learning Year</label>
                    </div>
                    <div className="text-xl font-bold text-purple-800">2023/2024</div>
                  </div>
                </div>
                
                {/* Fun Achievement Banner */}
                <div className="mt-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-2xl p-4 border-4 border-white shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="text-6xl absolute -top-5 left-5 rotate-12">🎪</div>
                    <div className="text-4xl absolute top-2 right-10 -rotate-12">🎨</div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <span className="text-lg font-bold text-orange-800">First Term Learning Adventure Report!</span>
                    <span className="text-2xl ml-3">🎊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spectacular Learning Progress Section */}
      <div className="mx-8 mb-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
          border: '8px solid',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd) 1'
        }}>
          {/* Magical Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="text-8xl absolute -top-5 left-10 rotate-12 animate-pulse">📚</div>
              <div className="text-6xl absolute top-5 right-20 -rotate-12 animate-bounce">🎨</div>
              <div className="text-4xl absolute bottom-0 left-1/2 animate-pulse">⭐</div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full animate-spin" style={{ animationDuration: '4s' }}>
                  <span className="text-3xl">🌟</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">🎪 Amazing Learning Adventure! 🎪</h2>
                  <p className="text-purple-200 text-lg mt-1">First Term Fun & Discovery Report</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-200">Total Subjects</div>
                <div className="text-4xl font-bold">6</div>
                <div className="text-xs text-purple-300">Learning Adventures!</div>
              </div>
            </div>
          </div>

          {/* Fun Learning Table */}
          <div className="overflow-x-auto bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
            <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
              <thead>
                <tr className="bg-gradient-to-r from-rainbow">
                  <th className="px-6 py-4 text-left font-bold text-white bg-red-400 rounded-l-2xl">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">📖</span>
                      <span className="text-lg">Learning Subject</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-orange-400">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🎯</span>
                      <span className="text-sm">First Try</span>
                      <span className="text-xs">(20%)</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-yellow-400">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🎪</span>
                      <span className="text-sm">Second Try</span>
                      <span className="text-xs">(10%)</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-green-400">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🏆</span>
                      <span className="text-sm">Big Test</span>
                      <span className="text-xs">(70%)</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-blue-400">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">✨</span>
                      <span className="text-sm">Total Stars</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-indigo-400">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🎖️</span>
                      <span className="text-sm">Grade</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-white bg-purple-400 rounded-r-2xl">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🌈</span>
                      <span className="text-sm">Teacher Says</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: '🔢 Number Fun', ca1: 18, ca2: 9, exam: 65, total: 92, grade: 'A+', remark: 'Amazing!', color: 'from-red-200 to-pink-200', emoji: '🔢' },
                  { subject: '📝 Letter Magic', ca1: 17, ca2: 8, exam: 62, total: 87, grade: 'A', remark: 'Excellent!', color: 'from-orange-200 to-yellow-200', emoji: '📝' },
                  { subject: '🎨 Art & Craft', ca1: 19, ca2: 10, exam: 68, total: 97, grade: 'A+', remark: 'Creative Genius!', color: 'from-yellow-200 to-green-200', emoji: '🎨' },
                  { subject: '🎵 Music & Rhymes', ca1: 18, ca2: 9, exam: 66, total: 93, grade: 'A+', remark: 'Musical Star!', color: 'from-green-200 to-blue-200', emoji: '🎵' },
                  { subject: '🏃 Play & Exercise', ca1: 20, ca2: 10, exam: 70, total: 100, grade: 'A+', remark: 'Super Active!', color: 'from-blue-200 to-indigo-200', emoji: '🏃' },
                  { subject: '🌱 Nature Study', ca1: 16, ca2: 8, exam: 58, total: 82, grade: 'A', remark: 'Nature Lover!', color: 'from-indigo-200 to-purple-200', emoji: '🌱' }
                ].map((row, index) => (
                  <tr key={index} className={`transform hover:scale-105 transition-all duration-300`}>
                    <td className={`px-6 py-4 font-bold text-gray-800 bg-gradient-to-r ${row.color} rounded-l-2xl shadow-lg`}>
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{row.emoji}</span>
                        <span className="text-lg">{row.subject}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-800 rounded-full text-lg font-bold border-4 border-orange-200">
                        {row.ca1}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-800 rounded-full text-lg font-bold border-4 border-yellow-200">
                        {row.ca2}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-800 rounded-full text-lg font-bold border-4 border-green-200">
                        {row.exam}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xl font-bold shadow-lg">
                        {row.total}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold shadow-lg ${
                        row.grade === 'A+' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                        row.grade === 'A' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                        'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                      }`}>
                        {row.grade}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center bg-white rounded-r-lg shadow-md">
                      <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-bold ${
                        row.remark.includes('Amazing') || row.remark.includes('Genius') ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800' :
                        row.remark.includes('Excellent') || row.remark.includes('Star') ? 'bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-800' :
                        'bg-gradient-to-r from-green-200 to-emerald-200 text-green-800'
                      }`}>
                        {row.remark}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Super Fun Summary Cards */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-8">
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-red-200 text-center transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-red-600">551</div>
                <div className="text-sm text-red-500 font-semibold">Total Stars</div>
                <div className="text-xs text-gray-500">Out of 600</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-yellow-200 text-center transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-yellow-600">91.8%</div>
                <div className="text-sm text-yellow-500 font-semibold">Super Score</div>
                <div className="text-xs text-gray-500">Amazing Progress!</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-green-200 text-center transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-3xl font-bold text-green-600">1st</div>
                <div className="text-sm text-green-500 font-semibold">Position</div>
                <div className="text-xs text-gray-500">Out of 25</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-purple-200 text-center transform hover:scale-110 transition-transform">
                <div className="text-4xl mb-2">🌟</div>
                <div className="text-3xl font-bold text-purple-600">A+</div>
                <div className="text-sm text-purple-500 font-semibold">Overall Grade</div>
                <div className="text-xs text-gray-500">Superstar!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Magical Teacher Comments & Fun Skills Section */}
      <div className="mx-8 mb-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Enhanced Teacher Love Notes */}
          <div className="col-span-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
              border: '8px solid',
              borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) 1'
            }}>
              {/* Colorful Header */}
              <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="text-6xl absolute top-0 left-5 animate-pulse">💝</div>
                  <div className="text-4xl absolute top-8 right-10 animate-bounce">🌈</div>
                </div>
                <h3 className="text-2xl font-bold relative z-10 flex items-center justify-center">
                  <span className="text-3xl mr-3">💌</span>
                  Teacher's Love Notes
                  <span className="text-3xl ml-3">💕</span>
                </h3>
              </div>

              <div className="p-8 space-y-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
                {/* Head Teacher Love Note */}
                <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-3xl p-6 border-4 border-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-3xl animate-bounce">🎪</div>
                  <div className="absolute bottom-2 left-2 text-2xl animate-pulse">⭐</div>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-3 rounded-full mr-4">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h4 className="font-bold text-xl text-purple-800">Principal's Special Message</h4>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-purple-200">
                    <p className="text-purple-700 font-bold text-lg italic text-center">
                      "🌟 Ahmad is our little SUPERSTAR! His bright smile and curious mind make every day magical. 
                      Keep shining, little one! You're destined for greatness! 🚀✨"
                    </p>
                  </div>
                </div>

                {/* Class Teacher Love Note */}
                <div className="bg-gradient-to-r from-green-200 via-blue-200 to-teal-200 rounded-3xl p-6 border-4 border-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎨</div>
                  <div className="absolute bottom-2 left-2 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌈</div>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full mr-4">
                      <span className="text-2xl">👩‍🏫</span>
                    </div>
                    <h4 className="font-bold text-xl text-blue-800">Teacher's Heart Message</h4>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-200">
                    <p className="text-blue-700 font-bold text-lg italic text-center">
                      "💖 Ahmad is such a joy to teach! His creativity in art class and enthusiasm for learning 
                      brightens up our classroom every single day! Keep being amazing! 🎊🌺"
                    </p>
                  </div>
                </div>

                {/* Fun Signature Section */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl p-4 border-4 border-white shadow-lg text-center">
                    <div className="bg-white rounded-xl p-4 mb-3 border-4 border-dashed border-yellow-400">
                      <div className="text-4xl mb-2">👑</div>
                      <img
                        src="/EDUOSlogo.png"
                        alt="Principal Signature"
                        className="h-8 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-sm font-bold text-orange-700">Dr. Rainbow Johnson</div>
                    <div className="text-xs text-orange-600">🌟 Principal 🌟</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl p-4 border-4 border-white shadow-lg text-center">
                    <div className="bg-white rounded-xl p-4 mb-3 border-4 border-dashed border-blue-400">
                      <div className="text-4xl mb-2">👩‍🏫</div>
                      <div className="h-8 flex items-center justify-center text-blue-400">
                        <span className="text-2xl">✨</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-purple-700">Ms. Sunshine Peters</div>
                    <div className="text-xs text-purple-600">🎨 Class Teacher 🎨</div>
                  </div>
                </div>

                {/* Next Term Fun Info */}
                <div className="bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 rounded-3xl p-6 border-4 border-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-5 text-4xl animate-spin" style={{ animationDuration: '3s' }}>🎠</div>
                  <div className="absolute bottom-0 right-8 text-3xl animate-bounce">🎁</div>
                  <div className="text-center relative z-10">
                    <h4 className="font-bold text-2xl text-orange-800 mb-4">🎪 Next Term Adventure Awaits! 🎪</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <div className="text-2xl mb-2">📅</div>
                        <div className="font-bold text-orange-700">Back to Fun:</div>
                        <div className="text-sm text-orange-600">January 15, 2024</div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="font-bold text-orange-700">Adventure Fee:</div>
                        <div className="text-sm text-orange-600">₦45,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spectacular Skills Showcase */}
          <div className="col-span-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
              border: '8px solid',
              borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff) 1'
            }}>
              {/* Playful Skills Header */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="text-6xl absolute -top-2 left-2 rotate-12 animate-pulse">🎯</div>
                  <div className="text-4xl absolute top-5 right-5 -rotate-12 animate-bounce">🏆</div>
                </div>
                <h3 className="text-xl font-bold relative z-10 text-center">
                  <span className="text-2xl block mb-1">🌟</span>
                  Super Skills Showcase
                  <span className="text-2xl block mt-1">🎪</span>
                </h3>
              </div>

              <div className="p-6 bg-gradient-to-br from-rainbow-light">
                {/* Incredible Skills Grid */}
                <div className="space-y-4">
                  {[
                    { skill: 'Daily Attendance', score: 5, icon: '📅', color: 'from-blue-400 to-cyan-400', bg: 'bg-blue-100' },
                    { skill: 'Always On Time', score: 5, icon: '⏰', color: 'from-green-400 to-emerald-400', bg: 'bg-green-100' },
                    { skill: 'Beautiful Writing', score: 4, icon: '✍️', color: 'from-purple-400 to-pink-400', bg: 'bg-purple-100' },
                    { skill: 'Sports Champion', score: 5, icon: '⚽', color: 'from-orange-400 to-red-400', bg: 'bg-orange-100' },
                    { skill: 'Tech Wizard', score: 5, icon: '💻', color: 'from-indigo-400 to-purple-400', bg: 'bg-indigo-100' },
                    { skill: 'Honest Heart', score: 5, icon: '💝', color: 'from-pink-400 to-rose-400', bg: 'bg-pink-100' },
                    { skill: 'Natural Leader', score: 4, icon: '👑', color: 'from-yellow-400 to-orange-400', bg: 'bg-yellow-100' },
                    { skill: 'Creative Genius', score: 5, icon: '🎨', color: 'from-teal-400 to-cyan-400', bg: 'bg-teal-100' }
                  ].map((item, index) => (
                    <div key={index} className={`${item.bg} rounded-2xl p-4 shadow-lg border-4 border-white transform hover:scale-105 transition-all duration-300`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-xl shadow-lg`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-700">{item.skill}</div>
                            <div className="flex space-x-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`w-4 h-4 rounded-full ${
                                    star <= item.score ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-300'
                                  } shadow-sm`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={`text-xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fun Skills Legend */}
                <div className="mt-6 bg-gradient-to-r from-rainbow-soft rounded-2xl p-4 border-4 border-white shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-700 mb-3">🌈 Star Rating Guide 🌈</div>
                    <div className="grid grid-cols-1 gap-2 text-xs text-purple-600 font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <span>⭐⭐⭐⭐⭐</span>
                        <span>AMAZING!</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>⭐⭐⭐⭐</span>
                        <span>GREAT JOB!</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>⭐⭐⭐</span>
                        <span>GOOD WORK!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spectacular Rainbow Footer */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-indigo-600 text-white text-center py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="text-8xl absolute top-0 left-10 animate-bounce">🎪</div>
          <div className="text-6xl absolute top-5 right-20 animate-pulse">🌟</div>
          <div className="text-4xl absolute bottom-2 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
          <div className="text-5xl absolute bottom-0 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}>🌈</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-3xl animate-bounce">🎭</span>
            <span className="text-xl font-bold">🌟 Creating Future Stars Through Joyful Learning! 🌟</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎪</span>
          </div>
          <div className="text-sm text-purple-200 font-medium">
            This magical report card is created with love and verified electronically ✨
          </div>
          <div className="mt-3 flex justify-center space-x-2">
            <span className="text-2xl animate-pulse">💖</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>💜</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>💙</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '0.9s' }}>💚</span>
            <span className="text-2xl animate-pulse" style={{ animationDelay: '1.2s' }}>💛</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseryTemplate;
