/**
 * Nursery Level Report Card Template
 * Professional compact design matching primary template format
 * Green border theme with organized tabular layout
 */

const NurseryTemplate = () => {
  return (
    <div className="w-full bg-white relative flex flex-col border-8 border-green-600" style={{ padding: 0 }}>
      {/* Header Section */}
      <div className="bg-white p-4 border-b-2 border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src="/EDUOSlogo.png"
              alt="EDUOS Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-red-500 text-xs font-semibold">We Serve You Better We Serve You Better</div>
              <div className="font-bold text-lg text-gray-900">EDUOS</div>
              <div className="text-xs text-gray-700">08160327173, 0812345678 Email : admin@yourdomain.com</div>
            </div>
          </div>
          <div className="bg-yellow-400 text-gray-900 px-3 py-1 font-bold text-sm border-2 border-yellow-500">
            APPROVED
          </div>
        </div>
      </div>

      {/* Student Information and Details */}
      <div className="border-2 border-blue-500 m-4 overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr className="border-b-2 border-blue-500">
              {/* Student Photo */}
              <td rowSpan="3" className="border-r-2 border-blue-500 p-2 bg-white text-center">
                <div className="w-20 h-24 border-2 border-gray-400 bg-gray-100 mx-auto">
                  <img
                    src="/profile_photo.png"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Admission Number :</td>
              <td className="border-r-2 border-blue-500 p-2 bg-white">Fcapt/nd/cps/14/263</td>
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Sport House:</td>
              <td className="p-2 bg-white"></td>
            </tr>
            <tr className="border-b-2 border-blue-500">
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">SurName:</td>
              <td className="border-r-2 border-blue-500 p-2 bg-white">MUHAMMAD</td>
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">OtherName:</td>
              <td className="p-2 bg-white">Ahmad</td>
            </tr>
            <tr>
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Session :</td>
              <td className="border-r-2 border-blue-500 p-2 bg-white">2023/2024</td>
              <td className="border-r-2 border-blue-500 bg-blue-50 p-2 font-semibold">Class :</td>
              <td className="p-2 bg-white">Nursery One</td>
            </tr>
            <tr>
              <td colSpan="5" className="border-t-2 border-blue-500 bg-blue-50 p-2 font-semibold text-xs">NOTE :</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Report Title */}
      <div className="text-center font-bold text-lg py-2 mx-4 border-b-2 border-gray-400 mb-2">
        NURSERY ONE FIRST TERM ACADEMIC REPORTS
      </div>

      {/* Academic Table */}
      <div className="mx-4 mb-4 border-2 border-blue-500 overflow-hidden">
        <div className="bg-blue-50 text-center py-2 border-b-2 border-blue-500 font-bold text-xs">
          Summary of the First Term Work
        </div>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="border-b-2 border-blue-500">
              <th rowSpan="2" className="border-r-2 border-blue-500 p-2 font-bold bg-white">SUBJECT</th>
              <th colSpan="4" className="border-r-2 border-b border-blue-500 p-1 font-bold bg-blue-50">First C.A.</th>
              <th colSpan="4" className="border-r-2 border-b border-blue-500 p-1 font-bold bg-blue-50">Second C.A.</th>
              <th colSpan="4" className="border-r-2 border-b border-blue-500 p-1 font-bold bg-blue-50">Examination</th>
              <th colSpan="2" className="border-r-2 border-b border-blue-500 p-1 font-bold bg-blue-50">Total Score</th>
              <th colSpan="2" className="border-r-2 border-b border-blue-500 p-1 font-bold bg-blue-50">Class Statistics</th>
              <th rowSpan="2" className="border-blue-500 p-1 font-bold bg-blue-50">Inference</th>
            </tr>
            <tr className="border-b-2 border-blue-500 text-[9px]">
              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtainable</th>
              <th className="border-r border-blue-500 p-1 bg-white">(20%)</th>
              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtained</th>
              <th className="border-r-2 border-blue-500 p-1 bg-white">mrk(%)</th>

              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtainable</th>
              <th className="border-r border-blue-500 p-1 bg-white">(10%)</th>
              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtained</th>
              <th className="border-r-2 border-blue-500 p-1 bg-white">mrk(%)</th>

              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtainable</th>
              <th className="border-r border-blue-500 p-1 bg-white">(70%)</th>
              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>obtained</th>
              <th className="border-r-2 border-blue-500 p-1 bg-white">mrk(%)</th>

              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Highest</th>
              <th className="border-r-2 border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>score</th>

              <th className="border-r border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Lowest</th>
              <th className="border-r-2 border-blue-500 p-1 bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-blue-500">
              <td className="border-r-2 border-blue-500 p-2 font-semibold bg-white">Mathematics</td>
              <td className="border-r border-blue-500 p-1 text-center">20</td>
              <td className="border-r border-blue-500 p-1 text-center">15</td>
              <td className="border-r border-blue-500 p-1 text-center">10</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">12</td>

              <td className="border-r border-blue-500 p-1 text-center">70</td>
              <td className="border-r border-blue-500 p-1 text-center">49</td>
              <td className="border-r border-blue-500 p-1 text-center">100</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">76</td>

              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r-2 border-blue-500 p-1 text-center"></td>

              <td className="border-r border-blue-500 p-1 text-center">76.00</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">76.00</td>

              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r-2 border-blue-500 p-1 text-center"></td>

              <td className="p-1 text-center">Very Good</td>
            </tr>
            <tr className="border-b-2 border-blue-500">
              <td className="border-r-2 border-blue-500 p-2 font-semibold bg-white">English Language</td>
              <td className="border-r border-blue-500 p-1 text-center">20</td>
              <td className="border-r border-blue-500 p-1 text-center">15</td>
              <td className="border-r border-blue-500 p-1 text-center">10</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">12</td>

              <td className="border-r border-blue-500 p-1 text-center">70</td>
              <td className="border-r border-blue-500 p-1 text-center">49</td>
              <td className="border-r border-blue-500 p-1 text-center">100</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">76</td>

              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r-2 border-blue-500 p-1 text-center"></td>

              <td className="border-r border-blue-500 p-1 text-center"></td>
              <td className="border-r-2 border-blue-500 p-1 text-center"></td>

              <td className="border-r border-blue-500 p-1 text-center">76.00</td>
              <td className="border-r-2 border-blue-500 p-1 text-center">76.00</td>

              <td className="p-1 text-center">Very Good</td>
            </tr>

            {/* Summary Row */}
            <tr className="bg-blue-50 font-semibold border-b-2 border-blue-500 text-xs">
              <td className="border-r-2 border-blue-500 p-2" colSpan="2">Total of Subjects Offered: 2</td>
              <td className="border-r-2 border-blue-500 p-2" colSpan="3">Total of Subjects Pass: 2</td>
              <td className="border-r-2 border-blue-500 p-2" colSpan="6">Net Score: 152/200</td>
              <td className="border-r-2 border-blue-500 p-2" colSpan="4">Class Position: A</td>
              <td className="p-2" colSpan="4">76%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Section - Remarks and Attributes */}
      <div className="grid grid-cols-12 gap-0 mx-4 mb-4">
        {/* Left Column - Remarks (span 8) */}
        <div className="col-span-8 border-2 border-blue-500 overflow-hidden">
          <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
            Head of School&apos;s Remark :
          </div>
          <div className="p-2 text-xs text-center border-b-2 border-blue-500 bg-white h-8 flex items-center justify-center">
            You Are Get Credit
          </div>

          <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
            Class Teacher&apos;s Remark :
          </div>
          <div className="p-2 text-xs text-center border-b-2 border-blue-500 bg-white h-8 flex items-center justify-center">
            You Get Credit
          </div>

          <div className="bg-blue-50 p-2 border-b-2 border-blue-500 font-semibold text-xs">
            Head of School&apos;s Signature :
          </div>
          <div className="p-2 text-center border-b-2 border-blue-500 bg-white h-12 flex items-center justify-center">
            <img
              src="/EDUOSlogo.png"
              alt="Signature"
              className="h-full object-contain"
            />
          </div>

          <div className="bg-blue-50 p-2 font-semibold text-xs">
            Next Term School Fees :
          </div>
        </div>

        {/* Right Column - Affective Attributes (span 4) */}
        <div className="col-span-4 border-2 border-blue-500 overflow-hidden">
          <div className="bg-blue-50 p-2 text-center border-b-2 border-blue-500 font-semibold text-xs">
            AFFECTIVE ATTRIBUTES & SKILLS
          </div>
          <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr className="border-b border-blue-500">
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">ATTENDANCE</td>
                <td className="border-r-2 border-blue-500 p-1 text-center font-bold bg-white">5</td>
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">HANDWRITING</td>
                <td className="p-1 text-center font-bold bg-white">3</td>
              </tr>
              <tr className="border-b border-blue-500">
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">GAMES/SPORTS</td>
                <td className="border-r-2 border-blue-500 p-1 text-center font-bold bg-white">5</td>
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">HONESTY</td>
                <td className="p-1 text-center font-bold bg-white">4</td>
              </tr>
              <tr>
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">HANDLING COMPUTER</td>
                <td className="border-r-2 border-blue-500 p-1 text-center font-bold bg-white">5</td>
                <td className="border-r-2 border-blue-500 p-1 bg-blue-50 font-semibold">LEADERSHIP</td>
                <td className="p-1 text-center font-bold bg-white">4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NurseryTemplate;
