import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useStudies } from '../contexts/StudiesContext';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  caseTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  caseData: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// PDF Document component
const MyDocument = ({ research, cases }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{research.title}</Text>
        <Text>{research.description}</Text>
        {cases.map((caseItem, index) => (
          <View key={caseItem.id}>
            <Text style={styles.caseTitle}>Case {index + 1}</Text>
            {Object.entries(caseItem.data).map(([key, value]) => (
              <Text key={key} style={styles.caseData}>
                {key}: {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function ResearchDetails() {
  const { id } = useParams();
  const { studies } = useStudies();
  const [research, setResearch] = useState(null);
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({});

  useEffect(() => {
    const foundResearch = studies.find(study => study.id === parseInt(id));
    if (foundResearch) {
      setResearch(foundResearch);
      // Initialize with dummy cases
      setCases([
        { id: 1, data: { Age: '45', 'Diet Type': 'Mediterranean', 'Blood Pressure': '120/80' } },
        { id: 2, data: { Age: '60', 'Diet Type': 'Vegan', 'Blood Pressure': '130/85' } },
      ]);
    }
  }, [id, studies]);

  const handleInputChange = (param, value) => {
    setNewCase(prev => ({ ...prev, [param]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCaseWithId = {
      id: cases.length + 1,
      data: newCase
    };
    setCases(prevCases => [...prevCases, newCaseWithId]);
    setNewCase({});
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cases.map(caseItem => caseItem.data));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cases');
    XLSX.writeFile(wb, `${research.title.replace(/\s+/g, '_')}_data.xlsx`);
  };

  if (!research) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{research.title}</h1>
      <p className="text-gray-600 mb-6">{research.description}</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contribute a Case</h2>
        <div className="space-x-4">
          <PDFDownloadLink
            document={<MyDocument research={research} cases={cases} />}
            fileName={`${research.title.replace(/\s+/g, '_')}_data.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <Button disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download Data (PDF)'}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={downloadExcel}>Download Data (Excel)</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {research.parameters && research.parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{param.name}</label>
            {param.type === 'text' ? (
              <Input
                type="text"
                value={newCase[param.name] || ''}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                required
              />
            ) : param.type === 'number' ? (
              <Input
                type="number"
                value={newCase[param.name] || ''}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                required
              />
            ) : (
              <Input
                type="date"
                value={newCase[param.name] || ''}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                required
              />
            )}
          </div>
        ))}
        <Button type="submit">Submit Case</Button>
      </form>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Cases</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardContent className="p-4">
              {Object.entries(caseItem.data).map(([key, value]) => (
                <p key={key} className="text-sm">
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
