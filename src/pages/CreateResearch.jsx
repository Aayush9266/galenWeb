// import React, { useState } from 'react';
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";

// export default function CreateResearch() {
//   const [parameters, setParameters] = useState([{ name: '', type: 'text' }]);

//   const addParameter = () => {
//     setParameters([...parameters, { name: '', type: 'text' }]);
//   };

//   const handleParameterChange = (index, field, value) => {
//     const newParameters = [...parameters];
//     newParameters[index][field] = value;
//     setParameters(newParameters);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send this data to your backend
//     console.log('Research form submitted:', {
//       title: e.target.title.value,
//       description: e.target.description.value,
//       parameters
//     });
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Research</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Research Title</label>
//           <Input name="title" placeholder="Enter the title of your research" required />
//         </div>
        
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Research Description</label>
//           <Textarea name="description" placeholder="Describe your research" className="min-h-[100px]" required />
//         </div>
        
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Parameters</label>
//           {parameters.map((param, index) => (
//             <div key={index} className="flex gap-2">
//               <Input
//                 placeholder="Parameter name"
//                 value={param.name}
//                 onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
//                 required
//               />
//               <select
//                 className="border rounded px-2 py-1"
//                 value={param.type}
//                 onChange={(e) => handleParameterChange(index, 'type', e.target.value)}
//               >
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="date">Date</option>
//               </select>
//             </div>
//           ))}
//           <Button type="button" onClick={addParameter} variant="outline">Add Parameter</Button>
//         </div>
        
//         <Button type="submit">Create Research</Button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useStudies } from '../contexts/StudiesContext';

export default function CreateResearch() {
  const [parameters, setParameters] = useState([{ name: '', type: 'text' }]);
  const { addStudy } = useStudies();
  const navigate = useNavigate();

  const addParameter = () => {
    setParameters([...parameters, { name: '', type: 'text' }]);
  };

  const handleParameterChange = (index, field, value) => {
    const newParameters = [...parameters];
    newParameters[index][field] = value;
    setParameters(newParameters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudy = {
      title: e.target.title.value,
      description: e.target.description.value,
      creator: "Dr. Current User", // This would typically come from authentication
      parameters
    };
    addStudy(newStudy);
    navigate('/'); // Redirect to home page after creating study
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Research</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Research Title</label>
          <Input name="title" placeholder="Enter the title of your research" required />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Research Description</label>
          <Textarea name="description" placeholder="Describe your research" className="min-h-[100px]" required />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Parameters</label>
          {parameters.map((param, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Parameter name"
                value={param.name}
                onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                required
              />
              <select
                className="border rounded px-2 py-1"
                value={param.type}
                onChange={(e) => handleParameterChange(index, 'type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
            </div>
          ))}
          <Button type="button" onClick={addParameter} variant="outline">Add Parameter</Button>
        </div>
        
        <Button type="submit">Create Research</Button>
      </form>
    </div>
  );
}

