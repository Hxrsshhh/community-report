import React from 'react';
import { MapPin, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  location: {
    address: string;
    coordinates: [number, number];
  };
  images: string[];
  createdAt: string;
  author: {
    name: string;
  };
}

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {report.images.length > 0 && (
        <div className="h-48 overflow-hidden">
          <img
            src={report.images[0]}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {report.title}
          </h3>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
            {getStatusIcon(report.status)}
            <span className="capitalize">{report.status.replace('-', ' ')}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {report.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{report.location.address}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>By {report.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(report.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {report.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;