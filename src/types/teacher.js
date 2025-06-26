// teacherTypes.jsx

/**
 * @typedef {Object} LessonPlan
 * @property {string} id
 * @property {string} title
 * @property {string} subject
 * @property {string} class
 * @property {string} section
 * @property {string} date
 * @property {string} duration
 * @property {string[]} objectives
 * @property {string[]} materials
 * @property {string[]} activities
 * @property {string} assessment
 * @property {string} homework
 * @property {string} notes
 * @property {'planned' | 'completed' | 'cancelled'} status
 */

/**
 * @typedef {Object} TeacherAttendance
 * @property {string} id
 * @property {string} date
 * @property {'present' | 'absent' | 'late' | 'leave'} status
 * @property {string} [checkInTime]
 * @property {string} [checkOutTime]
 * @property {string} [reason]
 */

/**
 * @typedef {Object} Leave
 * @property {string} id
 * @property {string} teacherId
 * @property {string} startDate
 * @property {string} endDate
 * @property {'sick' | 'casual' | 'emergency' | 'other'} leaveType
 * @property {string} reason
 * @property {'pending' | 'approved' | 'rejected'} status
 * @property {string} appliedOn
 * @property {string} [approvedBy]
 * @property {string} [approvedOn]
 */

/**
 * @typedef {Object} StudentAttendanceRecord
 * @property {string} id
 * @property {string} studentId
 * @property {string} studentName
 * @property {string} date
 * @property {'present' | 'absent' | 'late'} status
 * @property {string} class
 * @property {string} section
 * @property {string} subject
 * @property {string} [remarks]
 */

/**
 * @typedef {Object} AssignmentSubmission
 * @property {string} id
 * @property {string} assignmentId
 * @property {string} studentId
 * @property {string} studentName
 * @property {string} submissionDate
 * @property {'submitted' | 'graded' | 'late'} status
 * @property {string[]} [attachments]
 * @property {number} [marks]
 * @property {string} [feedback]
 */

/**
 * @typedef {Object} Assignment
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} subject
 * @property {string} class
 * @property {string} section
 * @property {string} dueDate
 * @property {number} maxMarks
 * @property {'active' | 'inactive'} status
 * @property {string[]} [attachments]
 * @property {AssignmentSubmission[]} [submissions]
 */

/**
 * @typedef {Object} LiveClass
 * @property {string} id
 * @property {string} title
 * @property {string} subject
 * @property {string} class
 * @property {string} section
 * @property {string} date
 * @property {string} startTime
 * @property {string} endTime
 * @property {'zoom' | 'google-meet' | 'microsoft-teams' | 'other'} platform
 * @property {string} meetingLink
 * @property {string} [meetingId]
 * @property {string} [passcode]
 * @property {string} [description]
 * @property {'upcoming' | 'ongoing' | 'completed' | 'cancelled'} status
 */

/**
 * @typedef {Object} TeacherQuiz
 * @property {string} id
 * @property {string} title
 * @property {string} subject
 * @property {string} class
 * @property {string} duration
 * @property {number} totalQuestions
 * @property {string} startDate
 * @property {string} endDate
 * @property {'active' | 'inactive' | 'completed'} status
 * @property {string} createdBy
 * @property {string} createdOn
 * @property {number} [submissions]
 * @property {number} [averageScore]
 * @property {string} [description]
 * @property {string} [category]
 * @property {'Easy' | 'Medium' | 'Hard'} [difficulty]
 * @property {number} [timeLimit]
 * @property {any[]} [questions]
 * @property {boolean} [attempted]
 * @property {string} [completedDate]
 * @property {number} [score]
 */
