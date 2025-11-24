import SchoolHeader from "../../components/school-management/SchoolHeader";
import "../../css/school.css";
import Footer from "../../components/school-management/Footer";
import ScrollToTopButton from "../../components/school-management/ScrollToTopButton";
import SchoolBanner from "../../components/school-management/SchoolBanner";
import SchoolAbout from "../../components/school-management/SchoolAbout";
import { Link } from "react-router-dom";
import { AiOutlineFileProtect } from "react-icons/ai";
import { PiBooks } from "react-icons/pi";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import PropTypes from "prop-types";
import StaffShowcase from "../../components/school-management/StaffShowcase";
import Testimonial from "../../components/school-management/Testimonials";
import AwardsShowcase from "../../components/main-site/AwardsShowcase";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();
  const testimonialRef = useRef(null);

  // Function to scroll to the testimonial section
  const scrollToTestimonial = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.state?.scrollToTestimonial) {
      scrollToTestimonial();
      window.history.replaceState({}, document.title); // Clear state after scrolling
    }
  }, [location]);
  return (
    <>
      <main className="main-school-container">
        <ScrollToTopButton />
        <SchoolHeader scrollToTestimonial={scrollToTestimonial} />
        <SchoolBanner />
        <About />
        <SchoolAbout />
        <Apply />
        <OurFacilities />
        <StudentOfTheYear
          name="Olusola Jeffery Adelana"
          year={2025}
          achievements={[
            "Debate Club Winner",
            "Best Mathematics Student",
            "Student Council President",
          ]}
          image="/backImg.jpg"
        />
        <StaffShowcase />
        <AwardsShowcase />
        <Testimonial ref={testimonialRef} />
        <Footer scrollToTestimonial={scrollToTestimonial} />
      </main>
    </>
  );
};

export default Homepage;

const About = () => {
  return (
    <div className="home-about">
      <h2>Mount Carmel Residential School</h2>
      <p>
        Tmply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been theindustrys standard dummy text ever since the 1500s, when an
        unknown printer took.
      </p>
      <img src="/about_bg.jpg" alt="about" />
    </div>
  );
};

const Apply = () => {
  return (
    <div className="apply-container">
      <div className="apply-item">
        <h3>Apply for Primary Level</h3>
        <p>
          You can now apply for any of primary level classes from primary 1 - 5
          through our online platform here
        </p>
        <Link to={"#"}>
          <button>Apply Now</button>
        </Link>
      </div>
      <div className="apply-item">
        <h3>Apply for Secondary Level</h3>
        <p>
          You can now apply for any of secondary level classes from jss 1 - sss
          2 through our online platform here
        </p>
        <Link to={"#"}>
          <button>Apply Now</button>
        </Link>
      </div>
    </div>
  );
};

const OurFacilities = () => {
  return (
    <div className="facilities">
      <div className="rowk first-row"></div>
      <div className="rowk second-row">
        <div className="overlay">
          <h2>Our Facilities</h2>
          <p>
            State-of-the-art infrastructure for the best learning experience.
          </p>
          <div className="facilities-list">
            <div className="item">
              <AiOutlineFileProtect />
              <div className="word">
                <h4>Government Approved</h4>
                <p>
                  Our school is approved by federal government and registered
                  under CAC.
                </p>
              </div>
            </div>
            <div className="item">
              <PiBooks />
              <div className="word">
                <h4>Books & E-Library</h4>
                <p>
                  There is a convinient reading enviroment for our students for
                  reading both online and in the school Library.
                </p>
              </div>
            </div>
            <div className="item">
              <FaSchoolCircleCheck />
              <div className="word">
                <h4>CBT Centre</h4>
                <p>
                  CBT centre is available for our students to be trained for
                  computer based test exams.CBT centre is available for our
                  students to be trained for computer based test exams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentOfTheYear = ({ name, year, achievements, image }) => {
  return (
    <div className="student-container">
      <h2>Student of the Year {year}</h2>
      <div className="details">
        <div>
          <h3>{name}</h3>
          <ul className="achievement-list">
            {achievements.map((achievement, index) => (
              <li key={index} className="achievement-item">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
        <center>
          {" "}
          <img src={image} alt={name} className="student-image" />
        </center>
      </div>
    </div>
  );
};

// ✅ Prop Validation
StudentOfTheYear.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
};
