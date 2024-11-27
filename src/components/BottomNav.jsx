import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookText, PlusCircle, FileSpreadsheet, Settings } from 'lucide-react';
import { cn } from "../lib/utils";

const links = [
  { href: "/", label: "Studies", icon: BookText },
  { href: "/add-case", label: "Add Case", icon: PlusCircle },
  { href: "/add-study", label: "Add Study", icon: FileSpreadsheet },
  { href: "/profile", label: "Profile", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <nav className="mx-auto max-w-2xl">
        <ul className="flex justify-around p-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link 
                to={href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 text-sm text-gray-600 hover:text-gray-900",
                  location.pathname === href && "text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

