// import React from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import { FileText, Users, UserCircle, Building2, Mail, LogOut } from 'lucide-react';
// import '../index.css'
// const menuItems = [
//   { icon: FileText, label: "My Cases", href: "/cases" },
//   { icon: Users, label: "Created Researches", href: "/researches" },
//   { icon: UserCircle, label: "Update Profile details", href: "/update-profile" },
//   { icon: Building2, label: "Your Organizations", href: "/organizations" },
//   { icon: Mail, label: "Contact Us", href: "/contact" },
// ];

// export default function Profile() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      
//       <Card className="mb-6">
//         <CardContent className="p-6">
//           <div className="flex items-center gap-6">
//             <Avatar className="h-24 w-24">
//               <AvatarImage src="/placeholder.svg" alt="Profile" />
//               <AvatarFallback>AK</AvatarFallback>
//             </Avatar>
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-800">Dr Aayush Khirraiyya</h2>
//               <p className="text-gray-600">PhD in Mathematics</p>
//               <p className="text-gray-500 mt-1">Joined: January 2022</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
      
//       <div className="grid gap-6 md:grid-cols-2">
//         {menuItems.map((item, index) => (
//           <Button
//             key={index}
//             variant="outline"
//             className="justify-start gap-3 h-auto py-4"
//           >
//             <item.icon className="w-5 h-5" />
//             <span className="font-medium">{item.label}</span>
//           </Button>
//         ))}
        
//         <Button
//           variant="outline"
//           className="justify-start gap-3 h-auto py-4 text-red-600 hover:text-red-700 hover:bg-red-50"
//         >
//           <LogOut className="w-5 h-5" />
//           <span className="font-medium">Logout</span>
//         </Button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FileText, Users, UserCircle, Building2, Mail, Download } from 'lucide-react';

// Mock data for demonstration
const doctor = {
  name: "Dr. Aayush Khirraiyya",
  specialty: "Cardiologist",
  email: "aayush@example.com",
  contributedCases: 15,
  createdResearch: 3
};

const menuItems = [
  { icon: FileText, label: "My Cases", href: "#cases" },
  { icon: Users, label: "Created Research", href: "#research" },
  { icon: UserCircle, label: "Update Profile", href: "#update-profile" },
  { icon: Building2, label: "My Organizations", href: "#organizations" },
  { icon: Mail, label: "Contact Support", href: "#contact" },
];

export default function Profile() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-500 mt-1">{doctor.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Contributed Cases</h3>
            <p className="text-3xl font-bold">{doctor.contributedCases}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Created Research</h3>
            <p className="text-3xl font-bold">{doctor.createdResearch}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start gap-3 h-auto py-4"
            asChild
          >
            <a href={item.href}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          </Button>
        ))}
        
        <Button
          variant="outline"
          className="justify-start gap-3 h-auto py-4 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Download PDF Report</span>
        </Button>
      </div>
    </div>
  );
}


