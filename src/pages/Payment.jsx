import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PaymentOptions = () => {
  const [name, setName] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const validateUPI = (upi) => {
    // UPI ID format: example@upi
    const regex = /^[a-zA-Z0-9._%+-]+@upi$/;
    return regex.test(upi);
  };

  const validateCardNumber = (cardNumber) => {
    // Credit Card should be 16 digits
    const regex = /^\d{16}$/;
    return regex.test(cardNumber);
  };

  const validateCVV = (cvv) => {
    // CVV should be 3 digits
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  const validateExpiryDate = (expiry) => {
    // Expiry date should be in MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiry)) {
      return false;
    }
    const [month, year] = expiry.split("/");
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year

    // Check if expiry date is in the future
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return false;
    }

    return true;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 297, "F");
  
    // Draw a border around the page
    doc.setDrawColor(0, 0, 0); // Black border
    doc.setLineWidth(1); // Thickness of the border
    doc.rect(10, 10, 190, 277); // x, y, width, height (margin 10px)
  
    // Title section
    doc.setFontSize(22);
    doc.setTextColor("#007BFF");
    doc.setFont("helvetica", "bold");
    doc.text("Payment Confirmation", 105, 30, null, null, "center");
  
    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor("#333");
    doc.setFont("helvetica", "normal");
    doc.text("You Are Subscribed to Dashboard!", 105, 45, null, null, "center");
  
    // Payment details section
    doc.setFontSize(14);
    doc.text("Payment Details", 20, 70);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Status:", 20, 90);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Done", 70, 90);
    
    doc.setFont("helvetica", "bold");
    doc.text("Amount Paid:", 20, 105);
    doc.setFont("helvetica", "normal");
    doc.text(`₹${amount}`, 70, 105);
  
    doc.setFont("helvetica", "bold");
    doc.text("Payment Method:", 20, 120);
    doc.setFont("helvetica", "normal");
    doc.text(paymentMode === "upi" ? "UPI" : "Credit/Debit Card", 70, 120);
  
    // Footer section
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 150, 190, 150); // Add separator line
  
    doc.setFontSize(12);
    doc.setTextColor("#555");
    doc.text("Thank you for your payment!", 105, 170, null, null, "center");
  
    doc.setTextColor("#777");
    doc.setFontSize(10);
    doc.text("For any queries, contact support@example.com", 105, 185, null, null, "center");
  
    // Save PDF
    doc.save("payment_confirmation.pdf");
  };

  const handlePay = () => {
    // Validate UPI ID or Card Details based on payment mode
    if (!name || !amount || !paymentMode) {
      alert("Please fill in all the details.");
      return;
    }

    if (paymentMode === "upi" && !validateUPI(upiId)) {
      alert("Please enter a valid UPI ID in the format example@upi.");
      return;
    }

    if (paymentMode === "card") {
      if (!validateCardNumber(cardDetails.number)) {
        alert("Please enter a valid 16-digit card number.");
        return;
      }
      if (!validateCVV(cardDetails.cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
      }
      if (!validateExpiryDate(cardDetails.expiry)) {
        alert("Please enter a valid expiry date in MM/YY format, and ensure it's a future date.");
        return;
      }
    }

    setPaymentStatus("Payment Done");
    generatePDF();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
        className="space-y-4"
      >
        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your name"
          />
        </div>

        {/* Payment Mode Selection */}
        <div>
          <label className="block mb-1 font-medium">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select Payment Mode
            </option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        {/* Dynamic Fields */}
        {paymentMode === "upi" && (
          <>
            <div>
              <label className="block mb-1 font-medium">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter UPI ID"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter amount"
              />
            </div>
          </>
        )}

        {paymentMode === "card" && (
          <>
            <div>
              <label className="block mb-1 font-medium">Card Number</label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter card number"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter CVV"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter amount"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit Payment
        </button>
      </form>
      {paymentStatus && (
        <p className="mt-4 text-green-500">{paymentStatus}</p>
      )}
    </div>
  );
};

export default PaymentOptions;
