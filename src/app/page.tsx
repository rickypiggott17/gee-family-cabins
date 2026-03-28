'use client';

import { useState } from 'react';
import Image from 'next/image';
import BookingCalendar from '../components/BookingCalendar';
import PaymentForm from '../components/PaymentForm';
import LogoutButton from '../components/LogoutButton';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

type DateRange = {
  start: Date | null;
  end: Date | null;
};

export default function Home() {
  const [selectedDates, setSelectedDates] = useState<DateRange>({ start: null, end: null });
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleDateSelect = (dates: DateRange, nightCount: number, totalCost: number) => {
    setSelectedDates(dates);
    setNights(nightCount);
    setTotal(totalCost);
  };

  const handleBookingSubmit = (data: any) => {
    setBookingData(data);
    setShowBookingConfirmation(true);
  };

  const resetBooking = () => {
    setSelectedDates({ start: null, end: null });
    setNights(0);
    setTotal(0);
    setShowBookingConfirmation(false);
    setBookingData(null);
  };

  if (showBookingConfirmation && bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                Booking Confirmed!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Thank you, {bookingData.firstName}! Your stay at Gee Family Cabins has been reserved.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">Booking Details</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono font-bold">{bookingData.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guest:</span>
                    <span>{bookingData.firstName} {bookingData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingData.checkIn?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingData.checkOut?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.numberOfGuests}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total Paid:</span>
                    <span className="text-forest-green">${bookingData.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
                <h4 className="font-bold text-blue-800 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Confirmation email sent to {bookingData.email}</li>
                  <li>• We'll contact you 1 week before your arrival</li>
                  <li>• Check-in starts at 3:00 PM on your arrival date</li>
                  <li>• Check-out is by 11:00 AM on departure date</li>
                </ul>
              </div>
              
              <button
                onClick={resetBooking}
                className="btn-primary"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mountain-hero.jpg"
            alt="Beautiful mountain landscape at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
            Gee Family Cabins
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your Mountain Retreat Awaits
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto opacity-90">
            Experience the perfect family getaway in our cozy mountain cabins. 
            Starting at just $100 per night.
          </p>
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg px-8 py-4"
          >
            Book Your Stay
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
              Welcome to the Mountains
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nestled in the heart of breathtaking mountain scenery, Gee Family Cabins offers 
              the perfect escape for families seeking peace, adventure, and quality time together. 
              Our cozy accommodations provide all the comforts of home while immersing you in 
              the natural beauty of the great outdoors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Cozy Accommodations</h3>
                <p className="text-gray-600">Comfortable cabins with all the amenities you need for a perfect family getaway.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Family-Owned</h3>
                <p className="text-gray-600">A warm, personal touch from our family to yours. We treat every guest like family.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Mountain Adventures</h3>
                <p className="text-gray-600">Endless outdoor activities and breathtaking views right outside your door.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Book Your Mountain Getaway
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your dates and secure your family's perfect mountain retreat. 
              Just $100 per night for unforgettable memories.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendar */}
            <div>
              <BookingCalendar onDateSelect={handleDateSelect} />
            </div>

            {/* Payment Form */}
            <div>
              <PaymentForm
                total={total}
                nights={nights}
                checkIn={selectedDates.start}
                checkOut={selectedDates.end}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-300">
                Have questions about your stay? We're here to help make your mountain getaway perfect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <PhoneIcon className="w-8 h-8 text-forest-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-300">(555) 123-CABIN</p>
                <p className="text-gray-300">(555) 123-2224</p>
              </div>
              
              <div>
                <EnvelopeIcon className="w-8 h-8 text-forest-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-300">info@geefamilycabins.com</p>
                <p className="text-gray-300">bookings@geefamilycabins.com</p>
              </div>
              
              <div>
                <MapPinIcon className="w-8 h-8 text-forest-green mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Find Us</h3>
                <p className="text-gray-300">Beautiful Mountain Location</p>
                <p className="text-gray-300">Details provided after booking</p>
              </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-700">
              <p className="text-gray-400 mb-2">
                © 2026 Gee Family Cabins. All rights reserved. 
                Creating mountain memories for families since [Year].
              </p>
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}