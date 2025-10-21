/**
 * Report Card Template Preview Component
 *
 * This component renders different report card templates based on the selected template ID.
 * It supports multiple templates for different school levels.
 *
 * Features:
 * - Multiple template designs (Primary, JSS, Nursery, SSS, Summer)
 * - Professional layouts with school branding
 * - Student information display
 * - Academic performance tables
 * - Teacher and principal remarks
 * - Print-ready designs
 */

import PrimaryTemplate from "./templates/PrimaryTemplate";
import SecondaryJSSTemplate from "./templates/SecondaryJSSTemplate";
import NurseryTemplate from "./templates/NurseryTemplate";
import SecondarySSSTemplate from "./templates/SecondarySSSTemplate";
import SummerTemplate from "./templates/SummerTemplate";

const ReportCardPreview = ({ templateId = "temp1" }) => {
  // Render the appropriate template based on templateId
  const renderTemplate = () => {
    switch (templateId) {
      case "temp1":
        return <PrimaryTemplate />;
      case "temp2":
        return <SecondaryJSSTemplate />;
      case "temp3":
        return <NurseryTemplate />;
      case "temp4":
        return <SecondarySSSTemplate />;
      case "temp5":
        return <SummerTemplate />;
      default:
        return <PrimaryTemplate />;
    }
  };

  return renderTemplate();
};

export default ReportCardPreview;

// Legacy template code below (not exported, kept for potential future use)
// eslint-disable-next-line no-unused-vars
const UnusedLegacyTemplate = () => {
  return (
    <div className="w-full bg-white relative flex flex-col shadow-2xl border border-gray-300">
      {/* APPROVED Stamp - Professional */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 text-sm font-bold rounded-lg shadow-lg z-10 border-2 border-green-500">
        ✓ APPROVED
      </div>

      {/* Enhanced Header with School Info */}
      <div className="mx-6 mt-6 mb-4 border-2 border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white rounded-full p-2 shadow-md">
              <img
                src="/EDUOSlogo.png"
                alt="EDUOS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                EDUOS ACADEMY
              </h1>
              <p className="text-sm text-gray-700 font-medium mb-1">
                Excellence in Education • Quality Learning Experience
              </p>
              <div className="flex flex-col text-sm text-gray-600 space-y-1">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">
                    📞 08163237773, 08123455678
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>📧 admin@eduosacademy.com</span>
                  <span>🌐 www.eduosacademy.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-20 h-24 border-2 border-gray-700 rounded-lg overflow-hidden shadow-md bg-gray-100">
            <img
              src="/profile_photo.png"
              alt="Student Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Report Title */}
      <div className="mx-6 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center py-4 rounded-lg shadow-md flex-shrink-0">
        <h2 className="text-lg font-bold tracking-wide">
          PRIMARY ONE FIRST TERM ACADEMIC REPORT
        </h2>
        <p className="text-sm mt-1 opacity-90">Academic Session: 2024/2025</p>
      </div>

      {/* Enhanced Student Information Tables */}
      <div className="mx-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm flex-shrink-0">
        {/* Enhanced Left Table - Student Information */}
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4">
            <h3 className="font-bold text-sm">STUDENT INFORMATION</h3>
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Student&apos;s Name:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  MUHAMMAD, Ahmad
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Admission Number:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  FCAPFND/CPS/14/263
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Student Class:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  Primary One
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  No. In Class:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">1</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Times School Opened:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">100</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Times Present:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">100</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Times Absent:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Enhanced Right Table - Academic Summary */}
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4">
            <h3 className="font-bold text-sm">ACADEMIC SUMMARY</h3>
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Term:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  FIRST TERM
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Session:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  2024/2025
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Total Obtainable:
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">200</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Total Scored:
                </td>
                <td className="py-3 px-4 text-green-700 font-bold">152</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Class Position:
                </td>
                <td className="py-3 px-4 text-blue-700 font-bold">1st</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Average Score:
                </td>
                <td className="py-3 px-4 text-green-700 font-bold">76%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
                  Grade:
                </td>
                <td className="py-3 px-4 text-green-700 font-bold">
                  EXCELLENT
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Academic Results Section */}
      <div className="mx-6 mt-8 bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex-grow">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4">
          <h3 className="text-sm font-bold text-center">
            📊 FIRST TERM ACADEMIC PERFORMANCE SUMMARY
          </h3>
        </div>

        {/* Enhanced Academic Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-100 to-purple-100">
                <th
                  rowSpan="2"
                  className="border border-gray-300 py-3 px-4 font-bold text-gray-800 bg-gradient-to-b from-indigo-50 to-indigo-100"
                >
                  <div className="font-bold text-sm">SUBJECTS</div>
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  First C.A.
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  Second C.A.
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  Examination
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  Total Score
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  Statistics
                </th>
                <th className="border border-gray-300 py-2 px-3 font-bold text-gray-800">
                  Grade & Remark
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 py-3 px-4 font-bold text-gray-800 bg-gradient-to-b from-green-50 to-green-100"
                >
                  <div className="font-bold text-sm">Psychomotor</div>
                  <div className="font-bold text-sm">Domain</div>
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 py-3 px-4 font-bold text-gray-800 bg-gradient-to-b from-yellow-50 to-yellow-100"
                >
                  <div className="font-bold text-sm">Rating</div>
                </th>
              </tr>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  (20)
                </th>
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  (10)
                </th>
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  (70)
                </th>
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  (100)
                </th>
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  Ave | Max | Min
                </th>
                <th className="border border-gray-300 py-2 px-3 text-sm text-gray-700 font-semibold">
                  Grade & Comment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="border border-gray-300 py-3 px-4 font-bold bg-gradient-to-r from-blue-50 to-blue-100 text-center text-gray-800">
                  📚 Mathematics
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">15</span> / 20
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">8</span> / 10
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">53</span> / 70
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold">
                  <span className="text-green-600 text-lg">76</span> / 100
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700 text-sm">
                  76 | 100 | 76
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    A • Excellent
                  </span>
                </td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-green-50">
                  ✍️ Handwriting
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="border border-gray-300 py-3 px-4 font-bold bg-gradient-to-r from-purple-50 to-purple-100 text-center text-gray-800">
                  📖 English Language
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">17</span> / 20
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">9</span> / 10
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700">
                  <span className="text-blue-600 font-semibold">58</span> / 70
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold">
                  <span className="text-green-600 text-lg">84</span> / 100
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center text-gray-700 text-sm">
                  84 | 100 | 84
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    A • Excellent
                  </span>
                </td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-green-50">
                  🗣️ Verbal Fluency
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-indigo-300">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gradient-to-r from-blue-200 to-indigo-200 text-center font-bold text-gray-800"
                  colSpan="7"
                >
                  📊 <span className="text-green-600">Subjects Passed: 2</span>{" "}
                  |<span className="text-blue-600 ml-2">1st Class: 0</span> |
                  <span className="text-purple-600 ml-2">2nd Class: 2</span> |
                  <span className="text-orange-600 ml-2">3rd Class: 0</span> |
                  <span className="text-red-600 ml-2">Failed: 0</span>
                </td>
                <td className="border border-gray-300 py-2 px-3 text-left text-gray-700 bg-green-50">
                  🏃 Games/Sports
                </td>
                <td className="border border-gray-300 py-2 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-green-300">
                <td className="border border-gray-300 py-3 px-4 font-bold text-center bg-gradient-to-r from-green-200 to-emerald-200 text-gray-800">
                  📚 Total Subjects: 2
                </td>
                <td className="border border-gray-300 py-3 px-4 font-bold text-center bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800">
                  ✅ Subjects Passed: 2
                </td>
                <td className="border border-gray-300 py-3 px-4 font-bold text-center bg-gradient-to-r from-purple-200 to-purple-300 text-gray-800">
                  🎯 Net Score: 160/200
                </td>
                <td
                  className="border border-gray-300 py-3 px-4 font-bold text-center bg-gradient-to-r from-green-300 to-emerald-300 text-gray-800"
                  colSpan="4"
                >
                  🏆 Overall Grade: EXCELLENT
                </td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-green-50">
                  🔧 Handling Tools
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-orange-200 to-yellow-200">
                <td
                  className="border border-gray-300 py-3 px-4 text-center font-bold text-gray-800 bg-gradient-to-r from-orange-300 to-yellow-300"
                  colSpan="7"
                >
                  🎭 AFFECTIVE DOMAIN (Character & Behavior)
                </td>
                <td
                  className="border border-gray-300 py-3 px-4 text-center font-bold text-gray-800 bg-gradient-to-r from-orange-300 to-yellow-300"
                  colSpan="2"
                >
                  🌟 BEHAVIORAL RATINGS
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-yellow-50">
                  ⏰ Punctuality
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-yellow-50">
                  ✨ Neatness
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-yellow-50">
                  🤝 Politeness
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-yellow-50">
                  🤗 Co-operation
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-teal-200 to-cyan-200">
                <td
                  className="border border-gray-300 py-3 px-4 text-center font-bold text-gray-800 bg-gradient-to-r from-teal-300 to-cyan-300"
                  colSpan="7"
                >
                  🏆 CO-CURRICULAR ACTIVITIES (Extra-Curricular)
                </td>
                <td
                  className="border border-gray-300 py-3 px-4 text-center font-bold text-gray-800 bg-gradient-to-r from-teal-300 to-cyan-300"
                  colSpan="2"
                >
                  🎯 ACTIVITY RATINGS
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-teal-50">
                  🏃‍♂️ Athletics
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-teal-50">
                  🏐 Volleyball
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 py-2 px-4 bg-gray-50"
                  colSpan="7"
                ></td>
                <td className="border border-gray-300 py-3 px-3 text-left text-gray-700 bg-teal-50">
                  🏓 Table Tennis
                </td>
                <td className="border border-gray-300 py-3 px-3 text-center font-bold text-green-600">
                  4
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Comments and Signatures Section */}
      <div className="mx-6 mt-6 mb-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4">
          <h3 className="text-sm font-bold text-center">
            💬 REMARKS & SIGNATURES
          </h3>
        </div>

        <div className="grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50">
          <div className="col-span-2 bg-gradient-to-r from-blue-100 to-blue-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
            👨‍💼 Head Teacher&apos;s Remark:
          </div>
          <div className="col-span-3 py-3 px-4 text-gray-700 font-medium">
            Excellent performance. Keep up the good work!
          </div>
        </div>

        <div className="grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50">
          <div className="col-span-2 bg-gradient-to-r from-green-100 to-green-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
            👩‍🏫 Class Teacher&apos;s Remark:
          </div>
          <div className="col-span-3 py-3 px-4 text-gray-700 font-medium">
            Outstanding student with great potential.
          </div>
        </div>

        <div className="grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50">
          <div className="col-span-2 bg-gradient-to-r from-purple-100 to-purple-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
            ✍️ Head Teacher&apos;s Signature:
          </div>
          <div className="col-span-3 py-3 px-4 flex items-center">
            <div className="w-24 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
              <img
                src="/EDUOSlogo.png"
                alt="Signature"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 hover:bg-gray-50">
          <div className="col-span-2 bg-gradient-to-r from-amber-100 to-amber-50 border-r border-gray-300 py-3 px-4 font-semibold text-gray-800">
            📅 Next Term Begins:
          </div>
          <div className="col-span-3 py-3 px-4 text-gray-700 font-medium">
            January 15, 2025
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-6 mb-6 text-center text-xs text-gray-600 flex-shrink-0">
        <p className="font-semibold">
          &ldquo;Education is the most powerful weapon which you can use to
          change the world.&rdquo; - Nelson Mandela
        </p>
        <p className="mt-2 text-gray-500">
          This is a computer-generated report card. For inquiries, contact the
          school administration.
        </p>
      </div>
    </div>
  );
};
