import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const studies = [
  {
    id: 1,
    title: "New Study on Cognitive Behavior",
    author: "Dr Aayush Khirraiyya",
    status: "0 / 0",
    tags: ["Psychology", "Behavior"]
  },
  {
    id: 2,
    title: "Problem-solving Techniques in Mathematics",
    author: "Dr Rohan Deshmukh",
    status: "0 / 1",
    tags: ["Mathematics", "Education"]
  },
  {
    id: 3,
    title: "Effects of Climate Change on Biodiversity",
    author: "Dr Rohan Deshmukh",
    status: "No Access",
    tags: ["Environment", "Biology"]
  },
  {
    id: 4,
    title: "Genetic Factors in Longevity",
    author: "Dr Aayush Khirraiyya",
    status: "0 / 0",
    tags: ["Genetics", "Health"]
  }
];

export function StudyList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <Card key={study.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <Link to={`/study/${study.id}`} className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-800">{study.title}</h3>
              <p className="text-sm text-gray-600">{study.author}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{study.status}</p>
                <div className="flex gap-2">
                  {study.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

