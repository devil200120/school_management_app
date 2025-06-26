/**
 * @typedef {'student' | 'admin' | 'teacher' | 'accountant'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string} [profilePicture]
 */

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} text
 * @property {string[]} options
 * @property {number} correctAnswer
 */

/**
 * @typedef {Object} Assignment
 * @property {string} id
 * @property {string} subject
 * @property {string} description
 * @property {string} class
 * @property {string} timeToSpend
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} markContained
 * @property {'active' | 'inactive' | 'completed'} status
 * @property {Question[]} questions
 */

/**
 * @typedef {Object} Exam
 * @property {string} id
 * @property {string} subject
 * @property {string} class
 * @property {string} timeToSpend
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} examType
 * @property {string} markContained
 * @property {'active' | 'inactive' | 'completed'} [status]
 */

/**
 * @typedef {Object} ExamScore
 * @property {string} id
 * @property {string} studentName
 * @property {string} admissionNo
 * @property {string} examScore
 * @property {string} class
 * @property {string} subject
 * @property {string} date
 */

/**
 * @typedef {Object} ResultChecker
 * @property {string} id
 * @property {string} resultClass
 * @property {string} resultTerms
 * @property {string} session
 * @property {string} resultChecker
 */

/**
 * @typedef {Object} PaymentRecord
 * @property {string} id
 * @property {string} transactionId
 * @property {string} terms
 * @property {string} amount
 * @property {'Paid' | 'Pending' | 'Failed'} status
 * @property {string} date
 */

/**
 * @typedef {Object} Quiz
 * @property {string} id
 * @property {string} title
 * @property {string} subject
 * @property {string} class
 * @property {string} duration
 * @property {number} totalQuestions
 * @property {string} startDate
 * @property {string} endDate
 * @property {'active' | 'inactive' | 'completed'} status
 * @property {string} description
 * @property {string} [category]
 * @property {'Easy' | 'Medium' | 'Hard'} [difficulty]
 * @property {number} timeLimit
 * @property {any[]} questions
 * @property {boolean} [attempted]
 * @property {string} [completedDate]
 * @property {number} [score]
 */

/**
 * @typedef {Object} TimeTableEntry
 * @property {string} [id]
 * @property {string} day
 * @property {number} period
 * @property {string} subject
 * @property {string} teacher
 * @property {string} [time]
 * @property {string} [class]
 * @property {string} [section]
 * @property {string} room
 */
