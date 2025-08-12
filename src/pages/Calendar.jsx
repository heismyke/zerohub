import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

// Mock data
const appointments = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Haircut & Style',
    date: '2024-01-15',
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Emma Davis',
    service: 'Hair Coloring',
    date: '2024-01-15',
    status: 'confirmed',
  },
  {
    id: '3',
    clientName: 'Lisa Chen',
    service: 'Hair Treatment',
    date: '2024-01-16',
    status: 'pending',
  },
  {
    id: '4',
    clientName: 'Maria Garcia',
    service: 'Blow Dry & Style',
    date: '2024-01-17',
    status: 'confirmed',
  },
  {
    id: '5',
    clientName: 'Anna Wilson',
    service: 'Hair Extensions',
    date: '2024-01-18',
    status: 'confirmed',
  },
  {
    id: '6',
    clientName: 'Jessica Brown',
    service: 'Haircut & Style',
    date: '2024-01-20',
    status: 'pending',
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAppointmentsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handleMonthChange = (direction) => {
    switch (direction) {
      case 'prev':
        setCurrentDate(prev => {
          const newDate = new Date(prev);
          newDate.setMonth(prev.getMonth() - 1);
          return newDate;
        });
        break;
      case 'next':
        setCurrentDate(prev => {
          const newDate = new Date(prev);
          newDate.setMonth(prev.getMonth() + 1);
          return newDate;
        });
        break;
      case 'today':
        setCurrentDate(new Date());
        break;
      default:
        break;
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    if (!date) return false;
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getMonthlyStats = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const monthAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= monthStart && aptDate <= monthEnd;
    });

    return {
      total: monthAppointments.length,
      confirmed: monthAppointments.filter(apt => apt.status === 'confirmed').length,
      pending: monthAppointments.filter(apt => apt.status === 'pending').length,
      revenue: monthAppointments.reduce((total, apt) => {
        // Mock pricing - in real app this would come from service data
        const basePrice = apt.service.includes('Coloring') ? 120 : 
                         apt.service.includes('Extensions') ? 200 : 
                         apt.service.includes('Treatment') ? 80 : 45;
        return total + basePrice;
      }, 0),
    };
  };

  const days = getDaysInMonth(currentDate);
  const stats = getMonthlyStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Calendar View</h1>
        <p className="mt-2 text-gray-600">Monthly overview of all appointments</p>
      </div>

      {/* Month Navigation */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleMonthChange('prev')}
              className="btn-secondary flex items-center"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Previous Month
            </button>
            
            <button
              onClick={() => handleMonthChange('today')}
              className="btn-secondary"
            >
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Today
            </button>
            
            <button
              onClick={() => handleMonthChange('next')}
              className="btn-secondary flex items-center"
            >
              Next Month
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900">
            {formatMonthYear(currentDate)}
          </h2>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Appointments</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
          <div className="text-sm text-gray-500">Confirmed</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">${stats.revenue}</div>
          <div className="text-sm text-gray-500">Monthly Revenue</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card">
        <div className="p-6">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center">
                <span className="text-sm font-medium text-gray-500">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayAppointments = day ? getAppointmentsForDate(day) : [];
              const hasAppointments = dayAppointments.length > 0;
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-100 ${
                    isCurrentMonth(day) ? 'bg-white' : 'bg-gray-50'
                  } ${isToday(day) ? 'ring-2 ring-primary-500' : ''}`}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          isToday(day) 
                            ? 'text-primary-600' 
                            : isCurrentMonth(day) 
                              ? 'text-gray-900' 
                              : 'text-gray-400'
                        }`}>
                          {day.getDate()}
                        </span>
                        {hasAppointments && (
                          <div className="flex space-x-1">
                            {dayAppointments.slice(0, 3).map((apt, aptIndex) => (
                              <div
                                key={aptIndex}
                                className={`w-2 h-2 rounded-full ${getStatusColor(apt.status)}`}
                                title={`${apt.clientName} - ${apt.service}`}
                              />
                            ))}
                            {dayAppointments.length > 3 && (
                              <div className="w-2 h-2 rounded-full bg-gray-400" title={`+${dayAppointments.length - 3} more`} />
                            )}
                          </div>
                        )}
                      </div>
                      
                      {hasAppointments && (
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div
                              key={apt.id}
                              className="text-xs p-1 bg-gray-100 rounded truncate"
                              title={`${apt.clientName} - ${apt.service}`}
                            >
                              <div className="font-medium text-gray-900 truncate">
                                {apt.clientName}
                              </div>
                              <div className="text-gray-500 truncate">
                                {apt.service}
                              </div>
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 