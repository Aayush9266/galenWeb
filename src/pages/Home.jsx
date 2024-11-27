import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useStudies } from '../contexts/StudiesContext';

export default function Home() {
  const { studies } = useStudies();

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Research Studies</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Search by Study Title" 
          className="pl-10 pr-4 py-2 w-full max-w-md"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <Card key={study.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <Link to={`/research/${study.id}`} className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-800">{study.title}</h3>
                <p className="text-sm text-gray-600">{study.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{study.creator}</span>
                  <span>{study.caseCount} cases</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
