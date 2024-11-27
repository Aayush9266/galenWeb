import React, { createContext, useState, useContext } from 'react';

const StudiesContext = createContext();

export const useStudies = () => useContext(StudiesContext);

export const StudiesProvider = ({ children }) => {
  const [studies, setStudies] = useState([
    {
      id: 1,
      title: "Effects of Diet on Cardiovascular Health",
      description: "Investigating the relationship between dietary habits and cardiovascular health outcomes.",
      creator: "Dr. Jane Smith",
      caseCount: 24,
      parameters: [
        { name: "Age", type: "number" },
        { name: "Diet Type", type: "text" },
        { name: "Blood Pressure", type: "text" }
      ]
    },
    {
      id: 2,
      title: "Genetic Factors in Longevity",
      description: "Exploring genetic markers associated with increased lifespan in diverse populations.",
      creator: "Dr. John Doe",
      caseCount: 56,
      parameters: [
        { name: "Age", type: "number" },
        { name: "Diet Type", type: "text" },
        { name: "Blood Pressure", type: "text" }
      ]
    },
    {
      id: 3,
      title: "Impact of Exercise on Mental Health",
      description: "Assessing the effects of regular physical activity on various mental health indicators.",
      creator: "Dr. Emily Brown",
      caseCount: 89,
      parameters: [
        { name: "Age", type: "number" },
        { name: "Diet Type", type: "text" },
        { name: "Blood Pressure", type: "text" }
      ]
    },
   
  ]);

  const addStudy = (newStudy) => {
    setStudies(prevStudies => [...prevStudies, { ...newStudy, id: prevStudies.length + 1, caseCount: 0 }]);
  };

  return (
    <StudiesContext.Provider value={{ studies, addStudy }}>
      {children}
    </StudiesContext.Provider>
  );
};

