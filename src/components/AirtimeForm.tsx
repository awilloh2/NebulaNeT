import React, { useState } from 'react';
import { Phone, CreditCard, Zap } from 'lucide-react';
import NetworkSelector from './NetworkSelector';
import TierSelector from './TierSelector';
import PhoneNumberValidator from './PhoneNumberValidator';
import { Transaction } from '../types';
import { airtimeTiers } from '../data/tiers';
import { useTransactions } from '../hooks/useTransactions';
import { useStore } from '../store/useStore';

interface AirtimeFormProps {
  onTransaction?: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

const AirtimeForm: React.FC<AirtimeFormProps> = ({ onTransaction }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(airtimeTiers[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneCarrier, setPhoneCarrier] = useState('');
  
  const { purchaseAirtime, isPurchasingAirtime } = useTransactions();
  const { updateTotalSavings } = useStore();

  const calculateDiscountedAmount = () => {
    const baseAmount = parseFloat(amount) || 0;
    const discount = (baseAmount * selectedTier.discount) / 100;
    return baseAmount - discount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNetwork || !phoneNumber || !amount || !isPhoneValid) return;

    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Calculate savings for user feedback
    const originalAmount = parseFloat(amount);
    const discountedAmount = calculateDiscountedAmount();
    const savings = originalAmount - discountedAmount;

    purchaseAirtime({
      network: selectedNetwork,
      phoneNumber,
      amount: discountedAmount,
      tier: selectedTier.name,
    });

    // Update total savings in store
    updateTotalSavings(savings);

    setShowSuccess(true);
    setPhoneNumber('');
    setAmount('');
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
        <div className="bg-purple-100 p-3 rounded-lg">
          <Phone className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Buy Airtime</h2>
          <p className="text-gray-600">Instant airtime top-up with great discounts</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <NetworkSelector 
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />

        <TierSelector 
          selectedTier={selectedTier}
          onTierChange={setSelectedTier}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 0710-2156-15 or 07102156150"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <PhoneNumberValidator
            phoneNumber={phoneNumber}
            selectedNetwork={selectedNetwork}
            onValidationChange={handlePhoneValidation}
          />
          {phoneCarrier && phoneCarrier !== selectedNetwork && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              Info: Phone number belongs to {phoneCarrier}. Cross-network purchases are supported.
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min={selectedTier.minAmount}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum amount: ₦{selectedTier.minAmount}
          </p>
        </div>

        {amount && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Original Amount:</span>
              <span className="font-medium">₦{amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Discount ({selectedTier.discount}%):</span>
              <span className="text-green-600 font-medium">-₦{((parseFloat(amount) || 0) * selectedTier.discount / 100).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-green-200 pt-2 mt-2">
              <span className="text-gray-800 font-semibold">You Pay:</span>
              <span className="text-green-600 font-bold text-lg">₦{calculateDiscountedAmount().toFixed(2)}</span>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Airtime purchase successful! ₦{calculateDiscountedAmount().toFixed(2)} credited to {phoneNumber}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPurchasingAirtime || !selectedNetwork || !phoneNumber || !amount || !isPhoneValid}
          className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            isPurchasingAirtime || !selectedNetwork || !phoneNumber || !amount || !isPhoneValid
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-75'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isPurchasingAirtime ? (
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
          ) : !amount ? (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Enter Amount</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Buy Airtime - ₦{amount ? calculateDiscountedAmount().toFixed(2) : '0.00'}</span>
            </>
          )}
        </button>
        
        {/* Helper text for better UX */}
        {(!selectedNetwork || !phoneNumber || !amount || !isPhoneValid) && (
          <div className="mt-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-medium text-blue-800 mb-1">Complete these steps to purchase:</p>
            <ul className="space-y-1 text-blue-700">
              {!selectedNetwork && <li>• Select a network provider (MTN, Airtel, Glo, or 9mobile)</li>}
              {!phoneNumber && <li>• Enter your phone number</li>}
              {phoneNumber && !isPhoneValid && <li>• Enter a valid phone number</li>}
              {!amount && <li>• Enter the amount you want to purchase</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default AirtimeForm;