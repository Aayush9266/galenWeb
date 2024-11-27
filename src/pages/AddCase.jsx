import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import '../index.css'
import { CaseList } from '../components/CaseList';

export default function AddCase() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Add Case</h1>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
      </header>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Search by Study Title" 
          className="pl-10 pr-4 py-2 w-full max-w-md"
        />
      </div>
      <CaseList />
    </div>
  );
}

