import React, { useState } from 'react';
import { Wifi, CreditCard } from 'lucide-react';
import NetworkSelector from './NetworkSelector';
import BundleSelector from './BundleSelector';
import PhoneNumberValidator from './PhoneNumberValidator';
import { Transaction } from '../types';
import { bundleOptions } from '../data/bundles';
import { useTransactions } from '../hooks/useTransactions';
import { useStore } from '../store/useStore';

interface BundleFormProps {
  onTransaction?: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

const BundleForm: React.FC<BundleFormProps> = ({ onTransaction }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBundle, setSelectedBundle] = useState(bundleOptions[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneCarrier, setPhoneCarrier] = useState('');
  
  const { purchaseBundle, isPurchasingBundle } = useTransactions();
  const { updateTotalSavings } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNetwork || !phoneNumber || !isPhoneValid) return;

    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Calculate savings for user feedback
    const savings = selectedBundle.originalPrice - selectedBundle.discountedPrice;

    purchaseBundle({
      network: selectedNetwork,
      phoneNumber,
      bundleId: selectedBundle.id,
    });

    // Update total savings in store
    updateTotalSavings(savings);

    setShowSuccess(true);
    setPhoneNumber('');
    setIsPhoneValid(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePhoneValidation = (valid: boolean, carrier?: string) => {
    setIsPhoneValid(valid);
    setPhoneCarrier(carrier || '');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Wifi className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Buy Data Bundle</h2>
          <p className="text-gray-600">High-speed data at discounted prices</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <NetworkSelector 
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />

        <BundleSelector 
          selectedBundle={selectedBundle}
          onBundleChange={setSelectedBundle}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <PhoneNumberValidator
            phoneNumber={phoneNumber}
            selectedNetwork={selectedNetwork}
            onValidationChange={handlePhoneValidation}
          />
          {phoneCarrier && phoneCarrier !== selectedNetwork && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              Warning: Phone number belongs to {phoneCarrier}, but {selectedNetwork} is selected
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Bundle Size:</span>
            <span className="font-medium">{selectedBundle.size}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Validity:</span>
            <span className="font-medium">{selectedBundle.validity}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 line-through">Original Price:</span>
            <span className="text-gray-500 line-through">₦{selectedBundle.originalPrice}</span>
          </div>
          <div className="flex items-center justify-between border-t border-blue-200 pt-2">
            <span className="text-gray-800 font-semibold">Discounted Price:</span>
            <span className="text-blue-600 font-bold text-lg">₦{selectedBundle.discountedPrice}</span>
          </div>
          <p className="text-sm text-blue-600 mt-2">{selectedBundle.description}</p>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Data bundle activated! {selectedBundle.size} sent to {phoneNumber}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPurchasingBundle || !selectedNetwork || !phoneNumber || !isPhoneValid}
          className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            isPurchasingBundle || !selectedNetwork || !phoneNumber || !isPhoneValid
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-75'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isPurchasingBundle ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : !selectedNetwork ? (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Select Network Provider First</span>
            </>
          ) : !phoneNumber ? (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Enter Phone Number</span>
            </>
          ) : !isPhoneValid ? (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Invalid Phone Number</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Buy {selectedBundle.size} - ₦{selectedBundle.discountedPrice}</span>
            </>
          )}
        </button>
        
        {/* Helper text for better UX */}
        {(!selectedNetwork || !phoneNumber || !isPhoneValid) && (
          <div className="mt-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-medium text-blue-800 mb-1">Complete these steps to purchase:</p>
            <ul className="space-y-1 text-blue-700">
              {!selectedNetwork && <li>• Select a network provider (MTN, Airtel, Glo, or 9mobile)</li>}
              {!phoneNumber && <li>• Enter your phone number</li>}
              {phoneNumber && !isPhoneValid && <li>• Enter a valid phone number</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default BundleForm;