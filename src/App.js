import React from 'react';

const schedule = {
  title: "CS Courses for 2018-2019",
  courses: [
    {
      "id": "F101",
      "title": "Computer Science: Concepts, Philosophy, and Connections",
      "days": "MWF",
      "start": "11:00",
      "end": "11:50"
    },
    {
      "id": "F110",
      "title": "Intro Programming for non-majors",
      "days": "MWF",
      "start": "10:00",
      "end": "10:50"
    },
    {
      "id": "F111",
      "title": "Fundamentals of Computer Programming I",
      "days": "MWF",
      "start": "13:00",
      "end": "13:50"
    },
    {
      "id": "F211",
      "title": "Fundamentals of Computer Programming II",
      "days": "TuTh",
      "start": "12:30",
      "end": "13:50"
    }
  ]
};

const terms = {
  F: 'Fall',
  W: 'Winter',
  S: 'Spring'
};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const Banner = ({ title }) => (
  <h1 className="title">{ title }</h1>
);

const Course = ({ course }) => (
  <li className="menu-item">
    <button className="button">
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </button>
  </li>
);

const CourseList = ({ courses }) => (
  <ul className="menu-list buttons">
    { courses.map(course => <Course key={ course.id } course={ course } />) }
  </ul>
);

const App = () => (
  <section>
    <div className="container menu">
      <Banner title={ schedule.title } />
      <CourseList courses = { schedule.courses } />
    </div>
  </section>
);

export default App;