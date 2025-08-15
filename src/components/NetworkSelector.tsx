import React, { useState } from 'react';
import { networksByCountry, countries } from '../data/networks';
import { ChevronDown, Globe } from 'lucide-react';

interface NetworkSelectorProps {
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ selectedNetwork, onNetworkChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const getSelectedStyles = (color: string) => {
    const styles = {
      yellow: 'border-yellow-500 bg-yellow-50 shadow-md',
      red: 'border-red-500 bg-red-50 shadow-md',
      green: 'border-green-500 bg-green-50 shadow-md',
      emerald: 'border-emerald-500 bg-emerald-50 shadow-md',
      blue: 'border-blue-500 bg-blue-50 shadow-md',
      purple: 'border-purple-500 bg-purple-50 shadow-md',
      orange: 'border-orange-500 bg-orange-50 shadow-md'
    };
    return styles[color as keyof typeof styles] || styles.yellow;
  };

  const getIconStyles = (color: string) => {
    const styles = {
      yellow: 'bg-yellow-100',
      red: 'bg-red-100',
      green: 'bg-green-100',
      emerald: 'bg-emerald-100',
      blue: 'bg-blue-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100'
    };
    return styles[color as keyof typeof styles] || styles.yellow;
  };

  const getTextStyles = (color: string) => {
    const styles = {
      yellow: 'text-yellow-600',
      red: 'text-red-600',
      green: 'text-green-600',
      emerald: 'text-emerald-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return styles[color as keyof typeof styles] || styles.yellow;
  };

  const currentCountry = countries.find(c => c.name === selectedCountry);
  const currentNetworks = networksByCountry[selectedCountry as keyof typeof networksByCountry] || [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Country & Network Provider
      </label>
      
      {/* Country Selector */}
      <div className="relative mb-4">
        <button
          type="button"
          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        >
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="text-2xl">{currentCountry?.flag}</span>
            <span className="font-medium text-gray-800">{selectedCountry}</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isCountryDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(country.name);
                  setIsCountryDropdownOpen(false);
                  onNetworkChange(''); // Reset network selection when country changes
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium text-gray-800">{country.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Network Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentNetworks.map((network) => (
          <button
            key={network.id}
            type="button"
            onClick={() => onNetworkChange(network.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedNetwork === network.id
                ? getSelectedStyles(network.color)
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full ${getIconStyles(network.color)} flex items-center justify-center`}>
                <span className={`${getTextStyles(network.color)} font-bold text-lg`}>
                  {network.name.charAt(0)}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700 block">{network.name}</span>
                <span className="text-xs text-gray-500">{network.country}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {currentNetworks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No network providers available for {selectedCountry}</p>
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;