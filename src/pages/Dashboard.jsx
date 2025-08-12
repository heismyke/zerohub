import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PlusIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

// Mock data
const stats = [
  { name: 'Total Clients', value: '156', icon: UsersIcon, color: 'bg-blue-500' },
  { name: "Today's Appointments", value: '8', icon: CalendarDaysIcon, color: 'bg-green-500' },
  { name: 'Monthly Revenue', value: '$2,840', icon: CurrencyDollarIcon, color: 'bg-purple-500' },
  { name: 'Pending', value: '3', icon: ClockIcon, color: 'bg-orange-500' },
];

const upcomingAppointments = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Haircut & Style',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Emma Davis',
    service: 'Hair Coloring',
    time: '2:30 PM',
    status: 'confirmed',
  },
  {
    id: '3',
    clientName: 'Lisa Chen',
    service: 'Hair Treatment',
    time: '4:00 PM',
    status: 'pending',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening at Zero Hub today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                <button
                  onClick={() => navigate('/booking')}
                  className="btn-primary flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Booking
                </button>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700">
                              {appointment.clientName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {appointment.clientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.service} • {appointment.time}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new booking.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => navigate('/booking')}
                      className="btn-primary"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/booking')}
                className="w-full btn-primary flex items-center justify-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Booking
              </button>
              <button
                onClick={() => navigate('/schedule')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <CalendarDaysIcon className="h-4 w-4 mr-2" />
                View Schedule
              </button>
              <button
                onClick={() => navigate('/calendar')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 