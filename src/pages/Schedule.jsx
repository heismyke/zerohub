import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

// Mock data
const appointments = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Haircut & Style',
    startTime: '9:00',
    endTime: '10:00',
    status: 'confirmed',
    notes: 'Prefers natural look',
    client: {
      email: 'sarah@email.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: '2',
    clientName: 'Emma Davis',
    service: 'Hair Coloring',
    startTime: '10:30',
    endTime: '12:30',
    status: 'confirmed',
    notes: 'Balayage highlights',
    client: {
      email: 'emma@email.com',
      phone: '+1 (555) 234-5678',
    },
  },
  {
    id: '3',
    clientName: 'Lisa Chen',
    service: 'Hair Treatment',
    startTime: '2:00',
    endTime: '3:30',
    status: 'pending',
    notes: 'Deep conditioning treatment',
    client: {
      email: 'lisa@email.com',
      phone: '+1 (555) 345-6789',
    },
  },
  {
    id: '4',
    clientName: 'Maria Garcia',
    service: 'Blow Dry & Style',
    startTime: '4:00',
    endTime: '4:45',
    status: 'confirmed',
    notes: 'For special event',
    client: {
      email: 'maria@email.com',
      phone: '+1 (555) 456-7890',
    },
  },
];

const timeSlots = [
  '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30',
  '4:00', '4:30', '5:00', '5:30', '6:00', '6:30',
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentsForTimeSlot = (time) => {
    return appointments.filter(apt => apt.startTime === time);
  };

  const handleDateChange = (direction) => {
    switch (direction) {
      case 'prev':
        setSelectedDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(prev.getDate() - 1);
          return newDate;
        });
        break;
      case 'next':
        setSelectedDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(prev.getDate() + 1);
          return newDate;
        });
        break;
      case 'today':
        setSelectedDate(new Date());
        break;
      default:
        break;
    }
  };

  const formatTimeDisplay = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    if (hourNum === 0) return '12:00 AM';
    if (hourNum < 12) return `${hourNum}:${minute} AM`;
    if (hourNum === 12) return `12:${minute} PM`;
    return `${hourNum - 12}:${minute} PM`;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Daily Schedule</h1>
        <p className="mt-2 text-gray-600">
          View and manage appointments for {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Date Navigation */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDateChange('prev')}
              className="btn-secondary flex items-center"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Previous Day
            </button>
            
            <button
              onClick={() => handleDateChange('today')}
              className={`btn-secondary ${isToday(selectedDate) ? 'bg-primary-100 text-primary-700 border-primary-300' : ''}`}
            >
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Today
            </button>
            
            <button
              onClick={() => handleDateChange('next')}
              className="btn-secondary flex items-center"
            >
              Next Day
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
          
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="input-field w-auto"
          />
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="card">
        <div className="overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 border-b border-gray-200">
            <div className="col-span-3 p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">Time</h3>
            </div>
            <div className="col-span-9 p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">Appointments</h3>
            </div>
          </div>

          {/* Time Slots */}
          {timeSlots.map((time) => {
            const timeAppointments = getAppointmentsForTimeSlot(time);
            const hasAppointments = timeAppointments.length > 0;

            return (
              <div key={time} className="grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50">
                {/* Time */}
                <div className="col-span-3 p-4 bg-gray-50 flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {formatTimeDisplay(time)}
                  </span>
                </div>
                
                {/* Appointments */}
                <div className="col-span-9 p-4">
                  {hasAppointments ? (
                    <div className="space-y-3">
                      {timeAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-primary-700">
                                  {appointment.clientName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{appointment.clientName}</h4>
                                <p className="text-sm text-gray-500">{appointment.service}</p>
                                <p className="text-sm text-gray-400">{appointment.startTime} - {appointment.endTime}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status}
                              </span>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <p className="mt-3 text-sm text-gray-600 italic">
                              "{appointment.notes}"
                            </p>
                          )}
                          
                          <div className="mt-3 flex items-center space-x-4">
                            <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                              <PhoneIcon className="h-4 w-4 mr-1" />
                              {appointment.client.phone}
                            </button>
                            <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
                              <EnvelopeIcon className="h-4 w-4 mr-1" />
                              {appointment.client.email}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-16 flex items-center">
                      <span className="text-sm text-gray-400">Available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Day Summary</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{appointments.length}</div>
            <div className="text-sm text-gray-500">Total Appointments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {appointments.filter(apt => apt.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {appointments.reduce((total, apt) => {
                const [startHour] = apt.startTime.split(':');
                const [endHour] = apt.endTime.split(':');
                return total + (parseInt(endHour) - parseInt(startHour));
              }, 0)}h
            </div>
            <div className="text-sm text-gray-500">Total Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 