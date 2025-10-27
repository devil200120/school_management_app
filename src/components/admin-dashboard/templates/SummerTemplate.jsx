/**
 * Summer Lesson Report Card Template
 * Mind-blowing tropical summer design with beach vibes, palm trees, and vibrant animations
 * Features sunset gradients, wave patterns, and stunning summer-themed visual effects
 */

const SummerTemplate = () => {
  return (
    <div className="w-full bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 relative flex flex-col overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Animated Tropical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Tropical Elements */}
        <div className="absolute top-10 left-5 text-6xl opacity-70 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}>🌴</div>
        <div className="absolute top-20 right-10 text-5xl opacity-60 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>🏖️</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>🌺</div>
        <div className="absolute top-1/2 right-20 text-5xl opacity-40 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>🦩</div>
        <div className="absolute bottom-20 right-1/4 text-4xl opacity-60 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>🏄‍♂️</div>
        
        {/* Floating Summer Icons */}
        <div className="absolute top-32 left-1/3 text-4xl opacity-50 animate-pulse">☀️</div>
        <div className="absolute top-48 right-1/3 text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>🍉</div>
        <div className="absolute bottom-40 left-1/2 text-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}>🌊</div>
        <div className="absolute top-64 left-10 text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}>🐚</div>

        {/* Ocean Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" className="text-white animate-pulse"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" className="text-cyan-300"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" className="text-blue-200"></path>
          </svg>
        </div>
      </div>

      {/* Spectacular Summer Header */}
      <div className="relative bg-gradient-to-r from-orange-400 via-pink-500 via-red-500 via-yellow-400 to-orange-500 text-white shadow-2xl overflow-hidden" style={{
        background: 'linear-gradient(45deg, #ff9a56, #ff6b9d, #ff416c, #ffdd59, #ff9a56)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}>
        {/* Tropical Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="text-8xl absolute top-0 left-10 rotate-12 animate-pulse">🌴</div>
          <div className="text-6xl absolute top-5 right-20 -rotate-12 animate-bounce">☀️</div>
          <div className="text-5xl absolute bottom-2 left-1/3 animate-pulse" style={{ animationDelay: '1s' }}>🏄‍♂️</div>
          <div className="text-4xl absolute bottom-0 right-1/4 animate-bounce" style={{ animationDelay: '0.5s' }}>🌺</div>
        </div>
        
        <div className="relative p-4 z-10">
          <div className="flex items-center justify-between">
            {/* Tropical School Identity */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500 border-4 border-yellow-300">
                <img
                  src="/EDUOSlogo.png"
                  alt="EDUOS Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold tracking-wide text-white drop-shadow-xl flex items-center">
                  <span className="mr-2">🏖️</span>
                  TROPICAL PARADISE ACADEMY
                  <span className="ml-2">🌺</span>
                </div>
                <div className="text-lg text-yellow-200 font-semibold mt-1 flex items-center">
                  <span className="mr-2">🌊</span>
                  Summer Learning Adventure - Where Education Meets Paradise!
                  <span className="ml-2">🏄‍♂️</span>
                </div>
                <div className="text-white text-sm mt-3 bg-white bg-opacity-30 rounded-full px-4 py-2 inline-flex items-center">
                  <span className="mr-2">📞</span>
                  08160327173 | 
                  <span className="mx-2">🏝️</span>
                  📧 paradise@eduos.edu.ng
                </div>
              </div>
            </div>
            
            {/* Summer Achievement Badge */}
            <div className="flex flex-col items-end space-y-4">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl animate-pulse flex items-center space-x-3 border-4 border-white">
                <span className="text-3xl animate-bounce">🏆</span>
                <span>SUMMER CHAMPION!</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</span>
              </div>
              <div className="bg-white bg-opacity-95 text-orange-600 px-6 py-3 rounded-full text-lg font-bold shadow-lg flex items-center">
                <span className="mr-2">🌴</span>
                Summer Session 2023/2024
                <span className="ml-2">☀️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paradise Student Information Island */}
      <div className="mx-8 mt-8 mb-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
          border: '8px solid',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd) 1',
          boxShadow: '0 25px 50px rgba(0,0,0,0.2), inset 0 0 30px rgba(255,255,255,0.1)'
        }}>
          {/* Tropical Header */}
          <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="text-8xl absolute -top-5 left-10 rotate-12 animate-pulse">🏝️</div>
              <div className="text-6xl absolute top-5 right-20 -rotate-12 animate-bounce">🌺</div>
              <div className="text-4xl absolute bottom-0 left-1/2 animate-pulse" style={{ animationDelay: '1s' }}>🐚</div>
            </div>
            <h3 className="text-3xl font-bold text-white relative z-10 flex items-center justify-center">
              <span className="text-4xl mr-4">🏄‍♂️</span>
              Paradise Student Profile
              <span className="text-4xl ml-4">🌴</span>
            </h3>
          </div>
          
          {/* Student Details in Tropical Layout */}
          <div className="p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
            <div className="grid grid-cols-12 gap-8">
              {/* Beach Photo Section */}
              <div className="col-span-4">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-48 h-56 mx-auto border-8 border-rainbow rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-200 to-blue-300 relative" style={{
                      border: '10px solid',
                      borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) 1'
                    }}>
                      <img
                        src="/profile_photo.png"
                        alt="Summer Student"
                        className="w-full h-full object-cover"
                      />
                      {/* Tropical Frame Decorations */}
                      <div className="absolute -top-4 -left-4 text-3xl animate-bounce">🌺</div>
                      <div className="absolute -top-4 -right-4 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🏖️</div>
                      <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🐚</div>
                      <div className="absolute -bottom-4 -right-4 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>☀️</div>
                    </div>
                  </div>
                  <div className="mt-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 text-white px-8 py-3 rounded-full text-xl font-bold shadow-xl">
                    🏄‍♂️ Summer Explorer - Primary One! 🌊
                  </div>
                  <div className="mt-4 flex justify-center space-x-3">
                    <span className="text-3xl animate-bounce">🌴</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>🌺</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>🏖️</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '0.9s' }}>☀️</span>
                  </div>
                </div>
              </div>
              
              {/* Tropical Information Cards */}
              <div className="col-span-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-200 via-yellow-200 to-red-200 rounded-3xl p-6 shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🎫</span>
                      <label className="text-lg font-bold text-orange-700 uppercase">Beach Pass Number</label>
                    </div>
                    <div className="text-2xl font-bold text-orange-800">Fcapt/nd/cps/14/263</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-200 via-blue-200 to-teal-200 rounded-3xl p-6 shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🏖️</span>
                      <label className="text-lg font-bold text-cyan-700 uppercase">Paradise House</label>
                    </div>
                    <div className="text-2xl font-bold text-cyan-800">Sunset Beach Villa</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 rounded-3xl p-6 shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🌊</span>
                      <label className="text-lg font-bold text-green-700 uppercase">Beach Explorer's Name</label>
                    </div>
                    <div className="text-2xl font-bold text-green-800">MUHAMMAD Ahmad</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 rounded-3xl p-6 shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🗓️</span>
                      <label className="text-lg font-bold text-purple-700 uppercase">Paradise Season</label>
                    </div>
                    <div className="text-2xl font-bold text-purple-800">Summer 2023/2024</div>
                  </div>
                </div>
                
                {/* Beach Achievement Banner */}
                <div className="mt-8 bg-gradient-to-r from-yellow-300 via-orange-300 via-red-300 to-pink-300 rounded-3xl p-6 border-4 border-white shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="text-8xl absolute -top-8 left-5 rotate-12 animate-pulse">🏄‍♂️</div>
                    <div className="text-6xl absolute top-2 right-10 -rotate-12 animate-bounce">🌺</div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-3xl mr-4">🏆</span>
                    <span className="text-2xl font-bold text-orange-800">First Term Summer Learning Adventure Report!</span>
                    <span className="text-3xl ml-4">🎊</span>
                  </div>
                </div>

                {/* Summer Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl p-4 text-center shadow-lg border-4 border-white">
                    <div className="text-2xl mb-1">🏖️</div>
                    <div className="text-lg font-bold text-blue-700">100</div>
                    <div className="text-sm text-blue-600">Beach Days</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl p-4 text-center shadow-lg border-4 border-white">
                    <div className="text-2xl mb-1">🌊</div>
                    <div className="text-lg font-bold text-green-700">100</div>
                    <div className="text-sm text-green-600">Surf Sessions</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl p-4 text-center shadow-lg border-4 border-white">
                    <div className="text-2xl mb-1">🏄‍♂️</div>
                    <div className="text-lg font-bold text-orange-700">0</div>
                    <div className="text-sm text-orange-600">Waves Missed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spectacular Summer Learning Performance */}
      <div className="mx-8 mb-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
          border: '10px solid',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd) 1'
        }}>
          {/* Beach Learning Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-red-500 text-white px-8 py-8 relative overflow-hidden">
            <div className="absolute inset0 opacity-30">
              <div className="text-9xl absolute -top-8 left-10 rotate-12 animate-pulse">🏄‍♂️</div>
              <div className="text-7xl absolute top-5 right-20 -rotate-12 animate-bounce">🌊</div>
              <div className="text-5xl absolute bottom-0 left-1/2 animate-pulse" style={{ animationDelay: '1s' }}>🏖️</div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-white bg-opacity-30 p-4 rounded-full animate-spin" style={{ animationDuration: '5s' }}>
                  <span className="text-4xl">🌊</span>
                </div>
                <div>
                  <h2 className="text-4xl font-bold">🏄‍♂️ Summer Learning Surf Report! 🌊</h2>
                  <p className="text-pink-200 text-xl mt-2">First Term Beach Academy Performance</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg text-pink-200">Total Beach Activities</div>
                <div className="text-5xl font-bold">8</div>
                <div className="text-sm text-pink-300">Learning Adventures!</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
            {/* Academic Surf Board */}
            <div className="col-span-8">
              {/* Fun Learning Table */}
              <div className="overflow-x-auto bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-6 border-4 border-white shadow-xl">
                <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-l-2xl">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🏖️</span>
                          <span className="text-lg">Beach Subject</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-orange-500 to-yellow-500">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🏄‍♂️</span>
                          <span className="text-sm">First Wave</span>
                          <span className="text-xs">(20%)</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-yellow-500 to-green-500">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🌊</span>
                          <span className="text-sm">Second Wave</span>
                          <span className="text-xs">(10%)</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-green-500 to-blue-500">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🏆</span>
                          <span className="text-sm">Big Kahuna</span>
                          <span className="text-xs">(70%)</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">⭐</span>
                          <span className="text-sm">Total Surf</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🏅</span>
                          <span className="text-sm">Beach Rank</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-2xl">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🌺</span>
                          <span className="text-sm">Surf Master Says</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: '🧮 Beach Math Adventure', ca1: 18, ca2: 9, exam: 65, total: 92, grade: 'A+', remark: 'Surf Legend!', color: 'from-red-200 to-orange-200', emoji: '🧮' },
                      { subject: '📚 Ocean Story Time', ca1: 17, ca2: 8, exam: 62, total: 87, grade: 'A', remark: 'Wave Rider!', color: 'from-orange-200 to-yellow-200', emoji: '📚' },
                      { subject: '🎨 Sand Castle Art', ca1: 19, ca2: 10, exam: 68, total: 97, grade: 'A+', remark: 'Beach Artist!', color: 'from-yellow-200 to-green-200', emoji: '🎨' },
                      { subject: '🔬 Seashell Science', ca1: 16, ca2: 8, exam: 58, total: 82, grade: 'A', remark: 'Ocean Explorer!', color: 'from-green-200 to-blue-200', emoji: '🔬' },
                      { subject: '🌍 Tropical Geography', ca1: 18, ca2: 9, exam: 66, total: 93, grade: 'A+', remark: 'Island Navigator!', color: 'from-blue-200 to-indigo-200', emoji: '🌍' },
                      { subject: '🏃‍♂️ Beach Olympics', ca1: 20, ca2: 10, exam: 70, total: 100, grade: 'A+', remark: 'Surf Champion!', color: 'from-indigo-200 to-purple-200', emoji: '🏃‍♂️' },
                      { subject: '🎵 Ocean Sounds Music', ca1: 17, ca2: 9, exam: 64, total: 90, grade: 'A+', remark: 'Wave Maestro!', color: 'from-purple-200 to-pink-200', emoji: '🎵' },
                      { subject: '💻 Digital Surfing', ca1: 19, ca2: 9, exam: 67, total: 95, grade: 'A+', remark: 'Cyber Surfer!', color: 'from-pink-200 to-red-200', emoji: '💻' }
                    ].map((row, index) => (
                      <tr key={index} className="transform hover:scale-105 transition-all duration-300">
                        <td className={`px-6 py-4 font-bold text-gray-800 bg-gradient-to-r ${row.color} rounded-l-2xl shadow-lg`}>
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{row.emoji}</span>
                            <span className="text-lg">{row.subject}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-800 rounded-full text-lg font-bold border-4 border-orange-300">
                            {row.ca1}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                          <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-100 text-yellow-800 rounded-full text-lg font-bold border-4 border-yellow-300">
                            {row.ca2}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 text-green-800 rounded-full text-lg font-bold border-4 border-green-300">
                            {row.exam}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                          <div className="inline-flex items-center justify-center w-16 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xl font-bold shadow-lg">
                            {row.total}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-lg shadow-md">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold shadow-lg ${
                            row.grade === 'A+' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                            row.grade === 'A' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' :
                            'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          }`}>
                            {row.grade}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center bg-white rounded-r-lg shadow-md">
                          <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-bold ${
                            row.remark.includes('Legend') || row.remark.includes('Champion') ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800' :
                            row.remark.includes('Artist') || row.remark.includes('Maestro') ? 'bg-gradient-to-r from-orange-200 to-red-200 text-red-800' :
                            'bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-800'
                          }`}>
                            {row.remark}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Beach Performance Summary */}
              <div className="mt-8 grid grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-orange-200 text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl mb-3">🏄‍♂️</div>
                  <div className="text-3xl font-bold text-orange-600">736</div>
                  <div className="text-sm text-orange-500 font-semibold">Total Waves Caught</div>
                  <div className="text-xs text-gray-500">Out of 800</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-blue-200 text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl mb-3">📊</div>
                  <div className="text-3xl font-bold text-blue-600">92.0%</div>
                  <div className="text-sm text-blue-500 font-semibold">Surf Score</div>
                  <div className="text-xs text-gray-500">Epic Performance!</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-green-200 text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl mb-3">🏆</div>
                  <div className="text-3xl font-bold text-green-600">1st</div>
                  <div className="text-sm text-green-500 font-semibold">Beach Rank</div>
                  <div className="text-xs text-gray-500">Out of 35</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-purple-200 text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl mb-3">🌟</div>
                  <div className="text-3xl font-bold text-purple-600">A+</div>
                  <div className="text-sm text-purple-500 font-semibold">Overall Grade</div>
                  <div className="text-xs text-gray-500">Surf Legend!</div>
                </div>
              </div>
            </div>

            {/* Tropical Skills Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Beach Skills */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-6 border-rainbow" style={{
                border: '6px solid',
                borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) 1'
              }}>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4">
                  <h3 className="text-xl font-bold text-center flex items-center justify-center">
                    <span className="text-2xl mr-2">🏄‍♂️</span>
                    Beach Skills Mastery
                    <span className="text-2xl ml-2">🌊</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { skill: 'Wave Riding', score: 5, icon: '🏄‍♂️', color: 'from-blue-400 to-cyan-400' },
                    { skill: 'Shell Collecting', score: 5, icon: '🐚', color: 'from-orange-400 to-yellow-400' },
                    { skill: 'Sand Art', score: 4, icon: '🏖️', color: 'from-yellow-400 to-orange-400' },
                    { skill: 'Ocean Swimming', score: 5, icon: '🏊‍♂️', color: 'from-blue-400 to-teal-400' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 shadow-md border-3 border-white transform hover:scale-105 transition-all duration-300">
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
              </div>

              {/* Summer Activities */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-6 border-rainbow" style={{
                border: '6px solid',
                borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) 1'
              }}>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4">
                  <h3 className="text-xl font-bold text-center flex items-center justify-center">
                    <span className="text-2xl mr-2">🌺</span>
                    Tropical Activities
                    <span className="text-2xl ml-2">🏖️</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { activity: 'Beach Volleyball', score: 5, icon: '🏐' },
                    { activity: 'Surfboard Training', score: 4, icon: '🏄‍♂️' },
                    { activity: 'Coconut Climbing', score: 5, icon: '🥥' },
                    { activity: 'Paradise Dancing', score: 4, icon: '💃' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-3 shadow-md border-3 border-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-sm font-semibold text-gray-700">{item.activity}</span>
                        </div>
                        <div className="text-lg font-bold text-orange-600">{item.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tropical Teacher Messages & Summer Vibes Section */}
      <div className="mx-8 mb-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-rainbow relative" style={{
          border: '10px solid',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd) 1'
        }}>
          {/* Beach Vibes Header */}
          <div className="bg-gradient-to-r from-emerald-400 via-teal-500 via-cyan-500 to-blue-500 text-white px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="text-8xl absolute top-0 left-5 animate-pulse">🏄‍♂️</div>
              <div className="text-6xl absolute top-8 right-10 animate-bounce">🌺</div>
              <div className="text-5xl absolute bottom-2 left-1/3 animate-pulse" style={{ animationDelay: '1s' }}>🏖️</div>
            </div>
            <h3 className="text-3xl font-bold relative z-10 flex items-center justify-center">
              <span className="text-4xl mr-4">🌊</span>
              Beach Master's Summer Reports
              <span className="text-4xl ml-4">🏄‍♂️</span>
            </h3>
          </div>

          <div className="p-8 space-y-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
            {/* Principal's Beach Message */}
            <div className="bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 rounded-3xl p-8 border-4 border-white shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3 text-4xl animate-bounce">🏖️</div>
              <div className="absolute bottom-3 left-3 text-3xl animate-pulse">🌺</div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-full mr-6">
                  <span className="text-3xl">🏄‍♂️</span>
                </div>
                <h4 className="font-bold text-2xl text-orange-800">Principal Beach Master's Message</h4>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-orange-200">
                <p className="text-orange-700 font-bold text-xl italic text-center">
                  "🌟 Ahmad is our ULTIMATE SUMMER CHAMPION! His surfing skills in academics and 
                  his sunny disposition make every beach day brighter. You're riding the perfect wave to success! 
                  Keep conquering those academic swells, champion! 🏆🌊✨"
                </p>
              </div>
            </div>

            {/* Beach Teacher's Message */}
            <div className="bg-gradient-to-r from-cyan-200 via-blue-200 to-teal-200 rounded-3xl p-8 border-4 border-white shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌊</div>
              <div className="absolute bottom-3 left-3 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>🐚</div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-4 rounded-full mr-6">
                  <span className="text-3xl">🏊‍♀️</span>
                </div>
                <h4 className="font-bold text-2xl text-blue-800">Surf Instructor's Paradise Note</h4>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-blue-200">
                <p className="text-blue-700 font-bold text-xl italic text-center">
                  "🏄‍♂️ Ahmad catches every learning wave with perfect form! His enthusiasm for beach math 
                  and ocean storytelling creates tsunami-sized joy in our classroom. You're our little surf legend! 
                  Keep riding those knowledge waves to paradise! 🌺🏖️💫"
                </p>
              </div>
            </div>

            {/* Beach Staff Signatures */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl p-6 border-4 border-white shadow-xl text-center">
                <div className="bg-white rounded-2xl p-6 mb-4 border-4 border-dashed border-yellow-400">
                  <div className="text-5xl mb-3">🏄‍♂️</div>
                  <img
                    src="/EDUOSlogo.png"
                    alt="Beach Master Signature"
                    className="h-10 mx-auto object-contain"
                  />
                </div>
                <div className="text-lg font-bold text-orange-700">Captain Sunshine Rodriguez</div>
                <div className="text-sm text-orange-600">🌊 Beach Academy Principal 🏖️</div>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl p-6 border-4 border-white shadow-xl text-center">
                <div className="bg-white rounded-2xl p-6 mb-4 border-4 border-dashed border-blue-400">
                  <div className="text-5xl mb-3">🏊‍♀️</div>
                  <div className="h-10 flex items-center justify-center text-blue-400">
                    <span className="text-3xl">🌊</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-purple-700">Mermaid Marina Waves</div>
                <div className="text-sm text-purple-600">🏄‍♀️ Surf Instructor 🌺</div>
              </div>
            </div>

            {/* Next Summer Adventure Info */}
            <div className="bg-gradient-to-r from-pink-300 via-orange-300 via-yellow-300 to-red-300 rounded-3xl p-8 border-4 border-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-8 text-5xl animate-spin" style={{ animationDuration: '4s' }}>🏄‍♂️</div>
              <div className="absolute bottom-0 right-12 text-4xl animate-bounce">🌺</div>
              <div className="text-center relative z-10">
                <h4 className="font-bold text-3xl text-orange-800 mb-6 flex items-center justify-center">
                  <span className="mr-3">🏖️</span>
                  Next Summer Paradise Adventure!
                  <span className="ml-3">🌊</span>
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-orange-200">
                    <div className="text-3xl mb-3">🗓️</div>
                    <div className="font-bold text-xl text-orange-700">Beach Return:</div>
                    <div className="text-lg text-orange-600">January 15, 2024</div>
                    <div className="text-sm text-orange-500 mt-2">🌴 New adventures await! 🏄‍♂️</div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-orange-200">
                    <div className="text-3xl mb-3">💰</div>
                    <div className="font-bold text-xl text-orange-700">Paradise Pass:</div>
                    <div className="text-lg text-orange-600">₦95,000</div>
                    <div className="text-sm text-orange-500 mt-2">🏖️ All-inclusive beach learning! 🌺</div>
                  </div>
                </div>
                
                {/* Summer Goals */}
                <div className="mt-6 bg-white rounded-3xl p-6 border-4 border-yellow-200 shadow-lg">
                  <h5 className="font-bold text-lg text-yellow-700 mb-3 flex items-center justify-center">
                    <span className="mr-2">🎯</span>
                    Summer Learning Goals
                    <span className="ml-2">🏆</span>
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏄‍♂️</div>
                      <div className="text-sm font-semibold text-yellow-600">Master Advanced Surfing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🌊</div>
                      <div className="text-sm font-semibold text-blue-600">Ocean Science Explorer</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏖️</div>
                      <div className="text-sm font-semibold text-orange-600">Beach Art Champion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Epic Tropical Footer */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 via-pink-500 via-purple-500 via-blue-500 via-teal-500 to-green-500 text-white text-center py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="text-9xl absolute top-0 left-10 animate-bounce">🏄‍♂️</div>
          <div className="text-7xl absolute top-5 right-20 animate-pulse">🌊</div>
          <div className="text-5xl absolute bottom-3 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>🏖️</div>
          <div className="text-6xl absolute bottom-0 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}>🌺</div>
          <div className="text-4xl absolute top-1/2 left-1/2 animate-bounce" style={{ animationDelay: '1.5s' }}>🐚</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <span className="text-4xl animate-bounce">🏄‍♂️</span>
            <span className="text-2xl font-bold">🌊 Surf Your Way to Academic Paradise - Where Learning Meets Adventure! 🏖️</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌺</span>
          </div>
          <div className="text-lg text-orange-200 font-medium mb-4">
            This tropical report card is verified with summer magic and ocean vibes ✨
          </div>
          <div className="flex justify-center space-x-4">
            <span className="text-3xl animate-pulse">🏄‍♂️</span>
            <span className="text-3xl animate-pulse" style={{ animationDelay: '0.3s' }}>🌊</span>
            <span className="text-3xl animate-pulse" style={{ animationDelay: '0.6s' }}>🏖️</span>
            <span className="text-3xl animate-pulse" style={{ animationDelay: '0.9s' }}>🌺</span>
            <span className="text-3xl animate-pulse" style={{ animationDelay: '1.2s' }}>☀️</span>
            <span className="text-3xl animate-pulse" style={{ animationDelay: '1.5s' }}>🐚</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerTemplate;
