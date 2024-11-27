// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, PlusCircle, User, BarChart2 } from 'lucide-react';

const links = [
  { href: "/home", label: "Research Listings", icon: BookOpen },
  { href: "/create-research", label: "Create Research", icon: PlusCircle },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin", label: "Dashboard", icon: BarChart2 },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-teal-100 border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Galen</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link 
                to={href}
                className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                  location.pathname === href ? 'bg-gray-200' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

