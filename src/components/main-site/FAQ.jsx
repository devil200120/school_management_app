// React Component
import { useState } from "react";
import "../../css/FAQ.css";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import AosInit from "../AosInit";

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleAccordion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

const faqData = [
	{
		question: "What is EDUOS?",
		answer:
			"EDUOS is a modern and complete school management system with a website component that digitalizes all your school operations.",
	},
	{
		question: "What operations can EDUOS handle?",
		answer:
			"EDUOS can manage student admissions, assessment tools, online classes, online exams, result processing, and checking, among other school operations.",
	},


	{
		question: "Can EDUOS integrate with existing systems?",
		answer:
			"Yes, EDUOS is designed to integrate with other systems, ensuring smooth data flow and interoperability.",
	},
	{
		question: "Is there technical support available for EDUOS?",
		answer:
			"Yes, EDUOS offers dedicated technical support to ensure that schools can maximize the system's benefits.",
	},
	{
		question: "Is the EDUOS system secure?",
		answer:
			"Yes, EDUOS employs robust security measures to protect sensitive school data and ensure safe online interactions.",
	},
];


	return (
		<div className="faq-container" data-aos="zoom-in-up">
			<AosInit/>
			<center>
				<div className="anime">F.A.Q</div>
			</center>

			<h2 className="faq-heading">Frequently Asked Questions</h2>
			<div className="faq">
				{faqData.map((item, index) => (
					<div key={index} className="faq-item">
						<button
							className="faq-question"
							onClick={() => toggleAccordion(index)}
						>
							<span>
								<FaRegCircleQuestion /> {item.question}
							</span>

							{openIndex === index ? (
								<HiChevronDown className="faq-icon" />
							) : (
								<HiChevronRight className="faq-icon" />
							)}
						</button>
						<div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
							<p>{item.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQ;
