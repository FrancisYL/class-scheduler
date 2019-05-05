import React, { useState, useEffect } from 'react';

const Banner = ({ title }) => (
  <h1 className="title">{ title || '[loading...]' }</h1>
);

const terms = {
  F: 'Fall',
  W: 'Winter',
  S: 'Spring'
};

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const buttonState = selected => (
  selected ? `button is-success is-selected` : `button`
);

const TermSelector = ({ state }) => (
  <div className="field has-addons">
    { Object.values(terms).map(value => 
      <button key={ value }
              className={ buttonState(value === state.term) }
              onClick={ () => state.setTerm(value) } >
        { value }
      </button> ) }
  </div>
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

const daysOverlap = (course1, course2) => (
  days.some(day => course1.days.includes(day) && course2.days.includes(day))
);

const inMinutes = (time) => (
  (([hh, mm]) => hh * 60 + mm * 1) (time.split(':'))
);

const timesOverlap = (course1, course2) => (
  Math.max(inMinutes(course1.start), inMinutes(course2.start))
    < Math.min(inMinutes(course1.end), inMinutes(course2.end))
);

const courseConflict = (course1, course2) => (
  course1 !== course2
  && getCourseTerm(course1) === getCourseTerm(course2)
  && daysOverlap(course1, course2)
  && timesOverlap(course1, course2)
);

const Course = ({ course, state }) => (
  <li className="menu-item">
    <button className={ buttonState(state.selected.includes(course)) }
            onClick={ () => state.toggle(course) }
            disabled={ hasConflict(course, state.selected) } >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </button>
  </li>
);

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected));
  };
  return [selected, toggle];
}

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, toggle] = useSelection();
  const termCourses = courses.filter(course => term === getCourseTerm(course));

  return (
    <React.Fragment>
      <TermSelector state={ { term, setTerm } } />
      <ul className="menu-list buttons">
        { termCourses.map(course => <Course key={ course.id } course={ course } state={ { selected, toggle } } />) }
      </ul>
    </React.Fragment>
  );
};

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
  }, []);

  return (
    <section>
      <div className="container menu">
        <Banner title={ schedule.title } />
        <CourseList courses = { schedule.courses } />
      </div>
    </section>
  );
}

export default App;