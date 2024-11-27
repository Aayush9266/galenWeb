import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate('/payment'); // Redirect to payment page
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">No Access</h1>
      <p className="text-lg text-gray-600 mb-6">
        To access the dashboard, you need to subscribe to a plan.
      </p>
      <Button 
        onClick={handlePaymentRedirect} 
        className="bg-teal-500 text-white hover:bg-blue-600 px-6 py-3"
      >
        Buy Subscription
      </Button>
    </div>
  );
}
