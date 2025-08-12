import React, { useState } from 'react';
import {
  PlusIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

// Mock data
const services = [
  { id: '1', name: 'Haircut & Style', duration: 60, price: 45, category: 'haircut' },
  { id: '2', name: 'Hair Coloring', duration: 120, price: 120, category: 'coloring' },
  { id: '3', name: 'Hair Treatment', duration: 90, price: 80, category: 'treatment' },
  { id: '4', name: 'Blow Dry & Style', duration: 45, price: 35, category: 'styling' },
  { id: '5', name: 'Hair Extensions', duration: 180, price: 200, category: 'styling' },
];

const clients = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 (555) 123-4567' },
  { id: '2', name: 'Emma Davis', email: 'emma@email.com', phone: '+1 (555) 234-5678' },
  { id: '3', name: 'Lisa Chen', email: 'lisa@email.com', phone: '+1 (555) 345-6789' },
  { id: '4', name: 'Maria Garcia', email: 'maria@email.com', phone: '+1 (555) 456-7890' },
];

const timeSlots = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
  '3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
];

const steps = ['Select Client', 'Choose Service', 'Pick Date & Time', 'Confirm Booking'];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClientSubmit = () => {
    if (newClient.name && newClient.email && newClient.phone) {
      const client = {
        id: Date.now().toString(),
        ...newClient,
        createdAt: new Date(),
      };
      setSelectedClient(client);
      setNewClient({ name: '', email: '', phone: '' });
      handleNext();
    }
  };

  const handleBookingSubmit = () => {
    console.log('Booking submitted:', {
      client: selectedClient,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      notes,
    });
    
    setActiveStep(0);
    setSelectedClient(null);
    setSelectedService(null);
    setSelectedDate(new Date());
    setSelectedTime('');
    setNotes('');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Select an existing client or add a new one</h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Existing Clients */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Existing Clients</h4>
                <div className="space-y-2">
                  {clients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedClient?.id === client.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.email} • {client.phone}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add New Client */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Client</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="input-field"
                  />
                  <button
                    onClick={handleClientSubmit}
                    disabled={!newClient.name || !newClient.email || !newClient.phone}
                    className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="h-4 w-4 mr-2 inline" />
                    Add Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Choose a service for your appointment</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedService?.id === service.id
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{service.duration} min • ${service.price}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {service.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Select date and time for your appointment</h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              
              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedService && selectedTime && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Duration:</strong> {selectedService.duration} minutes<br />
                  <strong>End Time:</strong> {selectedTime} - {(() => {
                    const [hour, minute] = selectedTime.split(':');
                    const endHour = parseInt(hour) + Math.floor(selectedService.duration / 60);
                    const endMinute = (parseInt(minute) + (selectedService.duration % 60)) % 60;
                    return `${endHour}:${endMinute.toString().padStart(2, '0')}`;
                  })()}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review and confirm your booking</h3>
            
            <div className="card p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Client</h4>
                  <p className="text-gray-900 mb-4">{selectedClient?.name}</p>
                  
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Service</h4>
                  <p className="text-gray-900">{selectedService?.name} - ${selectedService?.price}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Date & Time</h4>
                  <p className="text-gray-900 mb-4">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br />
                    {selectedTime}
                  </p>
                  
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Duration</h4>
                  <p className="text-gray-900">{selectedService?.duration} minutes</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or notes for this appointment..."
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Book Appointment</h1>
        <p className="mt-2 text-gray-600">Schedule a new appointment for your client</p>
      </div>

      <div className="card">
        <div className="p-6">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    index <= activeStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < activeStep ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    index <= activeStep ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      index < activeStep ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {getStepContent(activeStep)}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            {activeStep === steps.length - 1 ? (
              <button
                onClick={handleBookingSubmit}
                className="btn-primary"
              >
                Confirm Booking
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !selectedClient) ||
                  (activeStep === 1 && !selectedService) ||
                  (activeStep === 2 && (!selectedDate || !selectedTime))
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 