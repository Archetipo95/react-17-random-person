import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

const icons = [
  {
    title: "name",
    icon: <FaUser />,
  },
  {
    title: "email",
    icon: <FaEnvelopeOpen />,
  },
  {
    title: "age",
    icon: <FaCalendarTimes />,
  },
  {
    title: "street",
    icon: <FaMap />,
  },
  {
    title: "phone",
    icon: <FaPhone />,
  },
  {
    title: "password",
    icon: <FaLock />,
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];

    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };

    setPerson(newPerson);
    setTitle("name");
    setValue(newPerson.name);
    setLoading(false);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon") && person) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            {icons.map((item, index) => {
              const { title, icon } = item;
              return (
                <button
                  className="icon"
                  data-label={title}
                  onMouseOver={handleValue}
                  key={index}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          <div className="button btn" type="button" onClick={getPerson}>
            {loading ? "loading" : "Random user"}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
