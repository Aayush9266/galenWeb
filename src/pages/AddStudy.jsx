import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import '../index.css'
export default function AddStudy() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">Add New Study</h1>
      </header>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Study Title</label>
          <Input placeholder="Enter the name of the Study" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Research Question</label>
          <Textarea placeholder="Enter the research question" className="min-h-[100px]" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Publish to</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="org1">Organization 1</SelectItem>
              <SelectItem value="org2">Organization 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4">
          <Button className="flex-1" variant="outline">Add Parameter</Button>
          <Button className="flex-1">Select Contributors</Button>
        </div>
        
        <Button className="w-full" variant="default">Create Study</Button>
      </form>
    </div>
  );
}

