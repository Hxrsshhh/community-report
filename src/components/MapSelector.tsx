import React, { useState, useCallback } from 'react';
import { MapPin, Search } from 'lucide-react';

interface Location {
  address: string;
  coordinates: [number, number];
}

interface MapSelectorProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect, initialLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate geocoding API call
    setTimeout(() => {
      const mockLocation: Location = {
        address: searchQuery,
        coordinates: [40.7128 + (Math.random() - 0.5) * 0.1, -74.0060 + (Math.random() - 0.5) * 0.1]
      };
      
      setSelectedLocation(mockLocation);
      onLocationSelect(mockLocation);
      setIsSearching(false);
    }, 1000);
  }, [searchQuery, onLocationSelect]);

  const handleMapClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click coordinates to lat/lng (mock calculation)
    const lat = 40.7128 + ((rect.height / 2 - y) / rect.height) * 0.1;
    const lng = -74.0060 + ((x - rect.width / 2) / rect.width) * 0.1;
    
    const location: Location = {
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      coordinates: [lat, lng]
    };
    
    setSelectedLocation(location);
    onLocationSelect(location);
  }, [onLocationSelect]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for an address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div
        className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 relative cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path
                d="M50,150 Q100,100 150,150 T250,150 Q300,100 350,150"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0,200 Q50,180 100,200 T200,200 Q250,180 300,200 T400,200"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
        
        {selectedLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            <MapPin className="h-8 w-8 text-red-600 drop-shadow-lg" />
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">Click on the map to select a location</p>
        </div>
      </div>

      {selectedLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Selected Location</p>
              <p className="text-sm text-blue-700">{selectedLocation.address}</p>
              <p className="text-xs text-blue-600">
                {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;