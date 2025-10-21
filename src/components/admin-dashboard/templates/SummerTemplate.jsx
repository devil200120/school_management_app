/**
 * Summer/Extended Report Card Template
 * Comprehensive design with all academic and co-curricular details
 * Green border theme with detailed performance tracking
 */

const SummerTemplate = () => {
  return (
    <div className="w-full bg-white relative flex flex-col border-8 border-green-600 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b-4 border-black">
        {/* Left - Logo and School Info */}
        <div className="flex items-center gap-4">
          <img
            src="/src/pages/admin/report-card/Eduos.png"
            alt="EDUOS Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="text-center font-bold">
              <div className="text-xl">EDUOS</div>
              <div className="text-red-500 text-xs">We Serve You Better We Serve You Better</div>
              <div className="text-sm">08160327173, 0812345678 Email : admin@yourdomain.com</div>
            </div>
          </div>
        </div>

        {/* Center - EDUOS Title */}
        <div className="text-center font-bold text-2xl">EDUOS</div>

        {/* Right - Student Photo and APPROVED */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-32 border-4 border-gray-400 bg-gray-100">
              <img
                src="/src/pages/admin/report-card/profile_photo.png"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 font-bold text-sm border-2 border-yellow-500">
              APPROVED
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center font-bold text-lg mb-4 pb-2 border-b-2 border-gray-400">
        PRIMARY ONE FIRST TERM ACADEMIC REPORTS
      </div>

      {/* Main Content Grid - 2 columns */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Left Column - Student Info and Academic Performance */}
        <div className="col-span-2">
          {/* Student Information Table */}
          <div className="border-2 border-blue-500 mb-4 overflow-hidden">
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold w-1/3">Student&apos;s Name:</td>
                  <td className="p-2 bg-white">MUHAMMAD, Ahmad</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold w-1/4">Term</td>
                  <td className="p-2 bg-white">FIRST TERM</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Admission Number :</td>
                  <td className="p-2 bg-white">Fcapt/nd/cps/14/263</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Session</td>
                  <td className="p-2 bg-white">2023/2024</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Student Class :</td>
                  <td className="p-2 bg-white">Primary One</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Total Marks Obtainable</td>
                  <td className="p-2 bg-white font-bold">200</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">No. In Class :</td>
                  <td className="p-2 bg-white">1</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Total Scored</td>
                  <td className="p-2 bg-white font-bold">152</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">No. of Times School Opened :</td>
                  <td className="p-2 bg-white">100</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Class Position</td>
                  <td className="p-2 bg-white font-bold">1st</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">No. of Times Present :</td>
                  <td className="p-2 bg-white">100</td>
                  <td className="border-l-2 border-blue-500 border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Students Average</td>
                  <td className="p-2 bg-white font-bold">76%</td>
                </tr>
                <tr>
                  <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">No. of Times Absent :</td>
                  <td className="p-2 bg-white">0</td>
                  <td colSpan="2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Academic Performance Table */}
          <div className="border-2 border-blue-500 overflow-hidden">
            <div className="bg-blue-50 text-center py-2 border-b-2 border-blue-500 font-bold text-xs">
              Summary of the First Term Work
            </div>
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="border-b-2 border-blue-500 bg-blue-50">
                  <th className="border-r-2 border-blue-500 p-1 font-bold">SUBJECT</th>
                  <th colSpan="3" className="border-r-2 border-blue-500 p-1 font-bold">First C.A.</th>
                  <th colSpan="3" className="border-r-2 border-blue-500 p-1 font-bold">Second C.A.</th>
                  <th colSpan="3" className="border-r-2 border-blue-500 p-1 font-bold">Examination</th>
                  <th colSpan="2" className="border-r-2 border-blue-500 p-1 font-bold">Total Score</th>
                  <th colSpan="2" className="border-r-2 border-blue-500 p-1 font-bold">Class Statistics</th>
                  <th className="p-1 font-bold">Inference</th>
                </tr>
                <tr className="border-b-2 border-blue-500 bg-blue-50 text-[9px]">
                  <th className="border-r-2 border-blue-500 p-1"></th>
                  <th className="border-r border-blue-500 p-1">O.</th>
                  <th className="border-r border-blue-500 p-1">M.</th>
                  <th className="border-r-2 border-blue-500 p-1">%</th>
                  <th className="border-r border-blue-500 p-1">O.</th>
                  <th className="border-r border-blue-500 p-1">M.</th>
                  <th className="border-r-2 border-blue-500 p-1">%</th>
                  <th className="border-r border-blue-500 p-1">O.</th>
                  <th className="border-r border-blue-500 p-1">M.</th>
                  <th className="border-r-2 border-blue-500 p-1">%</th>
                  <th className="border-r border-blue-500 p-1">O.</th>
                  <th className="border-r-2 border-blue-500 p-1">M.</th>
                  <th className="border-r border-blue-500 p-1">Highest</th>
                  <th className="border-r-2 border-blue-500 p-1">Lowest</th>
                  <th className="p-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 p-1 font-semibold bg-blue-50">Mathematics</td>
                  <td className="border-r border-blue-500 p-1 text-center">20</td>
                  <td className="border-r border-blue-500 p-1 text-center">15</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">10</td>
                  <td className="border-r border-blue-500 p-1 text-center">12</td>
                  <td className="border-r border-blue-500 p-1 text-center">70</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">49</td>
                  <td className="border-r border-blue-500 p-1 text-center">100</td>
                  <td className="border-r border-blue-500 p-1 text-center">76</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center font-bold">76.00</td>
                  <td className="border-r border-blue-500 p-1 text-center font-bold">76.00</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">B2</td>
                  <td className="border-r border-blue-500 p-1 text-center">76</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center"></td>
                  <td className="p-1 text-center">Very Good</td>
                </tr>
                <tr className="border-b-2 border-blue-500">
                  <td className="border-r-2 border-blue-500 p-1 font-semibold bg-blue-50">English Language</td>
                  <td className="border-r border-blue-500 p-1 text-center">20</td>
                  <td className="border-r border-blue-500 p-1 text-center">15</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">10</td>
                  <td className="border-r border-blue-500 p-1 text-center">12</td>
                  <td className="border-r border-blue-500 p-1 text-center">70</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">49</td>
                  <td className="border-r border-blue-500 p-1 text-center">100</td>
                  <td className="border-r border-blue-500 p-1 text-center">76</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center font-bold">76.00</td>
                  <td className="border-r border-blue-500 p-1 text-center font-bold">76.00</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center">B2</td>
                  <td className="border-r border-blue-500 p-1 text-center">76</td>
                  <td className="border-r-2 border-blue-500 p-1 text-center"></td>
                  <td className="p-1 text-center">Very Good</td>
                </tr>
                <tr className="bg-blue-50 font-bold text-xs">
                  <td className="border-r-2 border-blue-500 p-1" colSpan="2">Total of Subjects Offered: 2</td>
                  <td className="border-r-2 border-blue-500 p-1" colSpan="2">Total of Subjects Pass: 2</td>
                  <td className="border-r-2 border-blue-500 p-1" colSpan="4">Net Score: 152/200</td>
                  <td className="border-r-2 border-blue-500 p-1" colSpan="3">Not Grade: Very Good</td>
                  <td className="border-r-2 border-blue-500 p-1" colSpan="2">76%</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Remarks Section */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border-2 border-blue-500 overflow-hidden">
              <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
                Head of School&apos;s Remark :
              </div>
              <div className="p-3 text-xs text-center bg-white border-b-2 border-blue-500 h-12 flex items-center justify-center">
                You Are Get Credit
              </div>
              
              <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
                Class Teacher&apos;s Remark :
              </div>
              <div className="p-3 text-xs text-center bg-white border-b-2 border-blue-500 h-12 flex items-center justify-center">
                You Get Credit
              </div>

              <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
                Head of School&apos;s Signature :
              </div>
              <div className="p-2 text-center bg-white border-b-2 border-blue-500 h-20 flex items-center justify-center">
                <img
                  src="/src/pages/admin/report-card/signature.png"
                  alt="Signature"
                  className="h-full object-contain"
                />
              </div>

              <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
                Next Term School Fees :
              </div>
              <div className="p-3 bg-white text-xs"></div>

              <div className="bg-blue-50 p-2 font-semibold text-xs">
                NOTE :
              </div>
            </div>

            {/* NOTE section with image placeholder */}
            <div className="border-2 border-blue-500 flex flex-col items-center justify-center bg-white p-4">
              <div className="w-24 h-24 rounded-full border-4 border-red-600 bg-gradient-to-br from-yellow-300 to-red-500 flex items-center justify-center shadow-lg">
                <div className="text-4xl">🏅</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Psychomotor & Co-curricular */}
        <div className="col-span-1">
          {/* Psychomotor Domain */}
          <div className="border-2 border-blue-500 mb-4 overflow-hidden">
            <div className="bg-blue-50 p-2 border-b-2 border-blue-500 text-center font-bold text-xs">
              Psychomotor<br/>Domain
            </div>
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Handwriting', score: '4' },
                  { label: 'Verbal Fluency', score: '4' },
                  { label: 'Game/Sports', score: '4' },
                  { label: 'Handling Tools', score: '4' },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-blue-500">
                    <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold text-xs">{item.label}</td>
                    <td className="p-1 text-center font-bold bg-white">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Affective Domain */}
          <div className="border-2 border-blue-500 mb-4 overflow-hidden">
            <div className="bg-blue-50 p-2 border-b-2 border-blue-500 text-center font-bold text-xs">
              Affective<br/>Domain
            </div>
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Punctuality', score: '4' },
                  { label: 'Neatness', score: '4' },
                  { label: 'Politeness', score: '4' },
                  { label: 'Co-operation', score: '4' },
                  { label: 'Attentiveness', score: '4' },
                  { label: 'Carrying Out of Assignment', score: '4' },
                  { label: 'Leadership Skill', score: '4' },
                  { label: 'Elocution', score: '4' },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-blue-500">
                    <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold text-xs text-left">{item.label}</td>
                    <td className="p-1 text-center font-bold bg-white">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Co-curricular Activities */}
          <div className="border-2 border-blue-500 overflow-hidden">
            <div className="bg-blue-50 p-2 border-b-2 border-blue-500 text-center font-bold text-xs">
              Co-curricular<br/>Activities
            </div>
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Athletics', score: '4' },
                  { label: 'Volley Ball', score: '4' },
                  { label: 'Table Tennis', score: '4' },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-blue-500">
                    <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold text-xs">{item.label}</td>
                    <td className="p-1 text-center font-bold bg-white">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Key to Rate */}
            <div className="border-t-2 border-blue-500">
              <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  <tr className="border-b border-blue-500">
                    <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-bold">Key To Rate</td>
                    <td className="p-1 bg-white text-center text-xs">Observable<br/>Point</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-bold">0 -</td>
                    <td className="p-1 bg-white text-xs">Poor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerTemplate;
