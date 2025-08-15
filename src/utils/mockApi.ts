// Mock API for development - simulates real backend responses
import { AirtimePurchaseRequest, BundlePurchaseRequest, TransactionResponse } from '../services/api';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateTransactionId = () => `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

export const mockApiService = {
  purchaseAirtime: async (data: AirtimePurchaseRequest): Promise<TransactionResponse> => {
    await delay(1500); // Simulate network delay
    
    // 🎯 ALWAYS SUCCESSFUL - NO RANDOM FAILURES
    return {
      id: generateTransactionId(),
      reference: `AIR${Date.now()}`,
      status: 'success', // ✅ Always returns 'success'
      message: 'Airtime purchase successful',
      amount: data.amount,
      recipient: data.phoneNumber,
    };
  },

  purchaseBundle: async (data: BundlePurchaseRequest): Promise<TransactionResponse> => {
    await delay(2000); // Simulate network delay
    
    // Mock bundle prices
    const bundlePrices: Record<string, number> = {
      '1gb': 450,
      '2gb': 850,
      '5gb': 2000,
      '10gb': 3800,
      '20gb': 7500,
      '50gb': 18000,
    };
    
    // 🎯 ALWAYS SUCCESSFUL - NO RANDOM FAILURES
    return {
      id: generateTransactionId(),
      reference: `BUN${Date.now()}`,
      status: 'success', // ✅ Always returns 'success'
      message: 'Data bundle purchase successful',
      amount: bundlePrices[data.bundleId] || 1000,
      recipient: data.phoneNumber,
    };
  },

  getNetworkBalances: async () => {
    await delay(500);
    
    return [
      { network: 'MTN', balance: 15420.50, status: 'active' as const },
      { network: 'Airtel', balance: 8750.25, status: 'active' as const },
      { network: 'Glo', balance: 12300.75, status: 'active' as const },
      { network: '9mobile', balance: 5680.00, status: 'active' as const },
      { network: 'Safaricom', balance: 9850.30, status: 'active' as const },
    ];
  },

  verifyPhoneNumber: async (phoneNumber: string, network: string) => {
    await delay(800);
    
    // Simple phone number validation logic - normalize network names
    const prefixes: Record<string, string[]> = {
      'mtn': ['0803', '0806', '0813', '0816', '0903', '0906', '0913', '0916'],
      'airtel': ['0802', '0808', '0812', '0901', '0902', '0907', '0912'],
      'glo': ['0805', '0807', '0815', '0811', '0905', '0915'],
      '9mobile': ['0809', '0817', '0818', '0908', '0909'],
      'safaricom': ['0710', '0711', '0712', '0713', '0714', '0715', '0716', '0717', '0718', '0719', '0720', '0721', '0722', '0723', '0724', '0725', '0726', '0727', '0728', '0729', '0701', '0702', '0703', '0704', '0705', '0706', '0707', '0708', '0709'],
    };
    
    const phonePrefix = phoneNumber.substring(0, 4);
    const normalizedNetwork = network.toLowerCase();
    let actualCarrier = '';
    let actualCarrierDisplay = '';
    
    // Map network IDs to display names
    const networkDisplayNames: Record<string, string> = {
      'mtn': 'MTN',
      'airtel': 'Airtel', 
      'glo': 'Glo',
      '9mobile': '9mobile',
      'safaricom': 'Safaricom'
    };
    
    for (const [carrierKey, carrierPrefixes] of Object.entries(prefixes)) {
      if (carrierPrefixes.includes(phonePrefix)) {
        actualCarrier = carrierKey;
        actualCarrierDisplay = networkDisplayNames[carrierKey] || carrierKey;
        break;
      }
    }
    
    // Allow cross-network purchases but validate phone number format
    const isValidFormat = phoneNumber.length === 11 && /^0\d{10}$/.test(phoneNumber);
    const hasValidCarrier = actualCarrier !== '';
    
    return {
      valid: isValidFormat && hasValidCarrier,
      carrier: actualCarrierDisplay,
    };
  },

  getTransactionHistory: async () => {
    await delay(1000);
    
    return {
      transactions: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  },

  getCurrentPricing: async () => {
    await delay(500);
    
    return {
      airtime: {
        basic: { discount: 2, minAmount: 100 },
        premium: { discount: 5, minAmount: 500 },
        vip: { discount: 8, minAmount: 1000 },
      },
      bundles: [
        { id: '1gb', size: '1GB', originalPrice: 500, discountedPrice: 450 },
        { id: '2gb', size: '2GB', originalPrice: 1000, discountedPrice: 850 },
        // ... more bundles
      ],
    };
  },
};

// Override API service in development
if (process.env.NODE_ENV === 'development') {
  // You can uncomment this to use mock API in development
  // Object.assign(apiService, mockApiService);
}