'use client';

import { useState } from 'react';
import { CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface PaymentFormProps {
  total: number;
  nights: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onSubmit: (bookingData: any) => void;
}

export default function PaymentForm({ total, nights, checkIn, checkOut, onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    // Guest Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Additional Information
    specialRequests: '',
    numberOfGuests: '2'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) { // 16 digits + 3 spaces
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length <= 5) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
      return;
    }
    
    // Limit CVV to 4 digits
    if (name === 'cvv') {
      const numericValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bookingData = {
      ...formData,
      checkIn,
      checkOut,
      nights,
      total,
      bookingId: `GFC-${Date.now()}`,
      bookingDate: new Date()
    };

    onSubmit(bookingData);
    setIsProcessing(false);
  };

  const isFormValid = () => {
    return formData.firstName &&
           formData.lastName &&
           formData.email &&
           formData.phone &&
           formData.cardNumber.length === 19 && // 16 digits + 3 spaces
           formData.expiryDate.length === 5 &&
           formData.cvv.length >= 3 &&
           formData.cardholderName;
  };

  if (!checkIn || !checkOut || total === 0) {
    return (
      <div className="card text-center py-8">
        <CreditCardIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-serif font-bold text-gray-600 mb-2">
          Select Your Dates First
        </h3>
        <p className="text-gray-500">
          Choose your check-in and check-out dates to proceed with booking.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Booking Summary */}
      <div className="card bg-forest-green text-white">
        <h3 className="text-xl font-serif font-bold mb-4">Booking Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Gee Family Cabins</span>
            <span>{nights} night{nights !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span>Rate per night:</span>
            <span>$100</span>
          </div>
          <div className="border-t border-green-400 pt-2 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Guest Information */}
      <div className="card">
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
          Guest Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Guests
            </label>
            <select
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              className="input-field"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCardIcon className="w-6 h-6 text-forest-green" />
          <h3 className="text-xl font-serif font-bold text-gray-800">
            Payment Information
          </h3>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-center">
            <LockClosedIcon className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-700">
              <strong>Demo Mode:</strong> This is a mock payment form. No actual charges will be made. 
              Real payment processing will be connected later.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Name as it appears on card"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="input-field"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="input-field"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className="input-field"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="card">
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
          Special Requests
        </h3>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          rows={3}
          className="input-field"
          placeholder="Any special requests or notes for your stay? (Optional)"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid() || isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
          isFormValid() && !isProcessing
            ? 'btn-primary'
            : 'bg-gray-400 text-white cursor-not-allowed'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Booking...
          </span>
        ) : (
          `Book Your Stay - $${total}`
        )}
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        By clicking "Book Your Stay", you agree to our terms and conditions. 
        This is currently a demo - no actual payment will be processed.
      </p>
    </form>
  );
}