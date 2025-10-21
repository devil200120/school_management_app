/**
 * SSS Secondary Level Report Card Template
 * Senior Secondary School professional design with detailed analysis
 */

const SecondarySSSTemplate = () => {
  return (
    <div className="w-full bg-white relative flex flex-col shadow-2xl border-2 border-gray-800 pb-0">
      {/* Official Seal */}
      <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
        <div className="text-center text-white">
          <div className="text-xs font-bold">OFFICIAL</div>
          <div className="text-lg font-bold">A</div>
          <div className="text-xs">SEAL</div>
        </div>
      </div>

      {/* Formal Header */}
      <div className="border-b-4 border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 border-4 border-gray-800 rounded-lg p-2 bg-white">
              <img
                src="/EDUOSlogo.png"
                alt="School Crest"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                EDUOS ACADEMY
              </h1>
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Senior Secondary School Division
              </p>
              <div className="mt-2 text-xs text-gray-600">
                <p>123 Education Avenue, Lagos State</p>
                <p>Tel: 08163237773 | Email: info@eduosacademy.com</p>
              </div>
            </div>
          </div>
          <div className="w-28 h-32 border-4 border-gray-800 rounded-md overflow-hidden bg-gray-200">
            <img
              src="/profile_photo.png"
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Report Title */}
      <div className="bg-gray-900 text-white text-center py-4 border-b-2 border-gray-800">
        <h2 className="text-xl font-bold uppercase tracking-wider">
          Terminal Academic Report Card
        </h2>
        <p className="text-sm mt-1">Senior Secondary School Class 3 • First Term 2024/2025</p>
      </div>

      {/* Student Particulars */}
      <div className="mx-8 mt-6 mb-4 border-2 border-gray-800">
        <div className="bg-gray-200 border-b-2 border-gray-800 py-2 px-4">
          <h3 className="font-bold uppercase text-sm">Student Particulars</h3>
        </div>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-2 px-4 font-semibold bg-gray-50 border-r border-gray-300 w-1/4">
                Full Name:
              </td>
              <td className="py-2 px-4 font-bold">OKONKWO, Chidinma Excellence</td>
              <td className="py-2 px-4 font-semibold bg-gray-50 border-l border-r border-gray-300 w-1/4">
                Admission No:
              </td>
              <td className="py-2 px-4 font-bold">SSS/2022/145</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-2 px-4 font-semibold bg-gray-50 border-r border-gray-300">
                Class:
              </td>
              <td className="py-2 px-4 font-bold">SS 3 Science</td>
              <td className="py-2 px-4 font-semibold bg-gray-50 border-l border-r border-gray-300">
                Gender:
              </td>
              <td className="py-2 px-4 font-bold">Female</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold bg-gray-50 border-r border-gray-300">
                Session:
              </td>
              <td className="py-2 px-4 font-bold">2024/2025</td>
              <td className="py-2 px-4 font-semibold bg-gray-50 border-l border-r border-gray-300">
                Term:
              </td>
              <td className="py-2 px-4 font-bold">First Term</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Academic Performance */}
      <div className="mx-8 mb-4 border-2 border-gray-800">
        <div className="bg-gray-900 text-white py-2 px-4 border-b-2 border-gray-800">
          <h3 className="font-bold uppercase text-sm">Academic Performance Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 py-2 px-3 text-left font-bold">SUBJECT</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">1ST TEST<br />(10)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">2ND TEST<br />(10)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">ASSIGNMENT<br />(10)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">PROJECT<br />(10)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">EXAM<br />(60)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">TOTAL<br />(100)</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">CLASS<br />AVG</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">POSITION</th>
                <th className="border border-gray-800 py-2 px-2 font-bold">GRADE</th>
                <th className="border border-gray-800 py-2 px-3 font-bold">REMARK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-800 py-2 px-3 font-semibold">Mathematics</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">8</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">10</td>
                <td className="border border-gray-800 py-2 px-2 text-center">56</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">92</td>
                <td className="border border-gray-800 py-2 px-2 text-center">78</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">1/45</td>
                <td className="border border-gray-800 py-2 px-2 text-center">
                  <span className="bg-green-700 text-white px-2 py-1 rounded font-bold">A1</span>
                </td>
                <td className="border border-gray-800 py-2 px-3 text-center">Excellent</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-800 py-2 px-3 font-semibold">Physics</td>
                <td className="border border-gray-800 py-2 px-2 text-center">8</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">8</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">54</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">88</td>
                <td className="border border-gray-800 py-2 px-2 text-center">75</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">2/45</td>
                <td className="border border-gray-800 py-2 px-2 text-center">
                  <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">A1</span>
                </td>
                <td className="border border-gray-800 py-2 px-3 text-center">Excellent</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-800 py-2 px-3 font-semibold">Chemistry</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">8</td>
                <td className="border border-gray-800 py-2 px-2 text-center">9</td>
                <td className="border border-gray-800 py-2 px-2 text-center">8</td>
                <td className="border border-gray-800 py-2 px-2 text-center">52</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">86</td>
                <td className="border border-gray-800 py-2 px-2 text-center">74</td>
                <td className="border border-gray-800 py-2 px-2 text-center font-bold">3/45</td>
                <td className="border border-gray-800 py-2 px-2 text-center">
                  <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">A1</span>
                </td>
                <td className="border border-gray-800 py-2 px-3 text-center">Excellent</td>
              </tr>
              <tr className="bg-gray-800 text-white font-bold">
                <td className="border border-gray-800 py-2 px-3" colSpan="5">CUMULATIVE ANALYSIS</td>
                <td className="border border-gray-800 py-2 px-2 text-center">266</td>
                <td className="border border-gray-800 py-2 px-2 text-center">75.7</td>
                <td className="border border-gray-800 py-2 px-2 text-center">1/45</td>
                <td className="border border-gray-800 py-2 px-2 text-center">A1</td>
                <td className="border border-gray-800 py-2 px-3 text-center">Outstanding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary & Attendance */}
      <div className="mx-8 mb-4 grid grid-cols-2 gap-4">
        <div className="border-2 border-gray-800">
          <div className="bg-gray-200 border-b-2 border-gray-800 py-2 px-4">
            <h3 className="font-bold uppercase text-xs">Performance Summary</h3>
          </div>
          <div className="p-3 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Total Score Obtainable:</span>
              <span className="font-bold">300</span>
            </div>
            <div className="flex justify-between">
              <span>Total Score Obtained:</span>
              <span className="font-bold text-green-700">266</span>
            </div>
            <div className="flex justify-between">
              <span>Percentage:</span>
              <span className="font-bold text-green-700">88.67%</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Overall Position:</span>
              <span className="font-bold text-blue-700">1st / 45 Students</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-800">
          <div className="bg-gray-200 border-b-2 border-gray-800 py-2 px-4">
            <h3 className="font-bold uppercase text-xs">Attendance Record</h3>
          </div>
          <div className="p-3 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Number of Times School Opened:</span>
              <span className="font-bold">98</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Times Present:</span>
              <span className="font-bold text-green-700">97</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Times Absent:</span>
              <span className="font-bold text-red-700">1</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Attendance Rate:</span>
              <span className="font-bold text-green-700">98.98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Remarks */}
      <div className="mx-8 mb-0 border-2 border-gray-800">
        <div className="bg-gray-900 text-white py-2 px-4 border-b-2 border-gray-800">
          <h3 className="font-bold uppercase text-sm">Official Remarks & Endorsements</h3>
        </div>
        <div className="divide-y divide-gray-300">
          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="font-semibold">Class Teacher's Remark:</div>
            <div className="col-span-3 italic">
              An exceptional student with outstanding academic performance and exemplary conduct. Continue this excellent trajectory.
            </div>
          </div>
          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="font-semibold">Principal's Comment:</div>
            <div className="col-span-3 italic">
              Excellent all-round performance. A role model for other students. Well done!
            </div>
          </div>
          <div className="p-4 grid grid-cols-4 gap-4 bg-gray-50">
            <div className="font-semibold">Next Term Begins:</div>
            <div className="col-span-3 font-bold text-red-700">
              Monday, January 8, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white text-center py-3 text-xs mt-auto">
        <p>This is an official document of EDUOS Academy • Issued on: December 20, 2024</p>
      </div>
    </div>
  );
};

export default SecondarySSSTemplate;
