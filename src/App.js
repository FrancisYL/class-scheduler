import React, { useState, useEffect } from 'react';

const Banner = ({ title }) => (
  <h1 className="title">{ title || '[loading...]' }</h1>
);

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

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const url = 'https://www.cs.northwestern.edu/academics/courses/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, [])

  return (
    <section>
      <div className="container menu">
        <Banner title={ schedule.title } />
        <CourseList courses = { schedule.courses } />
      </div>
    </section>
  )
}

export default App;