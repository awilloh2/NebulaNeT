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
      { network: 'MTN Nigeria', balance: 15420.50, status: 'active' as const },
      { network: 'Airtel Nigeria', balance: 8750.25, status: 'active' as const },
      { network: 'Glo Nigeria', balance: 12300.75, status: 'active' as const },
      { network: '9mobile Nigeria', balance: 5680.00, status: 'active' as const },
      { network: 'Safaricom Kenya', balance: 9850.30, status: 'active' as const },
      { network: 'Airtel Kenya', balance: 7200.45, status: 'active' as const },
      { network: 'Telkom Kenya', balance: 4500.80, status: 'active' as const },
      { network: 'MTN Uganda', balance: 6800.90, status: 'active' as const },
      { network: 'Airtel Uganda', balance: 5400.60, status: 'active' as const },
      { network: 'Vodacom Tanzania', balance: 8900.75, status: 'active' as const },
      { network: 'Airtel Tanzania', balance: 6700.40, status: 'active' as const },
      { network: 'Zain Sudan', balance: 3200.25, status: 'active' as const },
      { network: 'MTN Sudan', balance: 4100.85, status: 'active' as const },
      { network: 'Maroc Telecom', balance: 7800.95, status: 'active' as const },
      { network: 'Orange Morocco', balance: 5900.70, status: 'active' as const },
      { network: 'Ethio Telecom', balance: 4600.55, status: 'active' as const },
      { network: 'Safaricom Ethiopia', balance: 3800.40, status: 'active' as const },
    ];
  },

  verifyPhoneNumber: async (phoneNumber: string, network: string) => {
    await delay(800);
    
    // International phone number validation logic
    const prefixes: Record<string, string[]> = {
      // Nigeria
      'mtn-ng': ['0803', '0806', '0813', '0816', '0903', '0906', '0913', '0916'],
      'airtel-ng': ['0802', '0808', '0812', '0901', '0902', '0907', '0912'],
      'glo-ng': ['0805', '0807', '0815', '0811', '0905', '0915'],
      '9mobile-ng': ['0809', '0817', '0818', '0908', '0909'],
      
      // Kenya
      'safaricom-ke': ['0710', '0711', '0712', '0713', '0714', '0715', '0716', '0717', '0718', '0719', '0720', '0721', '0722', '0723', '0724', '0725', '0726', '0727', '0728', '0729', '0701', '0702', '0703', '0704', '0705', '0706', '0707', '0708', '0709'],
      'airtel-ke': ['0730', '0731', '0732', '0733', '0734', '0735', '0736', '0737', '0738', '0739'],
      'telkom-ke': ['0770', '0771', '0772', '0773', '0774', '0775', '0776', '0777', '0778', '0779'],
      
      // Uganda
      'mtn-ug': ['0772', '0773', '0774', '0775', '0776', '0777', '0778', '0779'],
      'airtel-ug': ['0700', '0701', '0702', '0703', '0704', '0705', '0706', '0707', '0708', '0709'],
      'africell-ug': ['0790', '0791', '0792', '0793', '0794', '0795', '0796', '0797', '0798', '0799'],
      'utl-ug': ['0712', '0713', '0714', '0715', '0716', '0717', '0718', '0719'],
      
      // Tanzania
      'vodacom-tz': ['0754', '0755', '0756', '0757', '0758', '0759'],
      'airtel-tz': ['0784', '0785', '0786', '0787', '0788', '0789'],
      'tigo-tz': ['0771', '0772', '0773', '0774', '0775', '0776'],
      'halotel-tz': ['0621', '0622', '0623', '0624', '0625', '0626'],
      
      // Sudan
      'zain-sd': ['0912', '0913', '0914', '0915', '0916', '0917'],
      'mtn-sd': ['0918', '0919', '0920', '0921', '0922', '0923'],
      'sudani-sd': ['0901', '0902', '0903', '0904', '0905', '0906'],
      
      // Morocco
      'maroc-telecom-ma': ['0661', '0662', '0663', '0664', '0665', '0666'],
      'orange-ma': ['0698', '0699', '0600', '0601', '0602', '0603'],
      'inwi-ma': ['0650', '0651', '0652', '0653', '0654', '0655'],
      
      // Ethiopia
      'ethio-telecom-et': ['0911', '0912', '0913', '0914', '0915', '0916'],
      'safaricom-et': ['0960', '0961', '0962', '0963', '0964', '0965'],
    };
    
    const phonePrefix = phoneNumber.substring(0, 4);
    let actualCarrier = '';
    let actualCarrierDisplay = '';
    
    // Map network IDs to display names - updated for international networks
    const networkDisplayNames: Record<string, string> = {
      // Nigeria
      'mtn-ng': 'MTN Nigeria',
      'airtel-ng': 'Airtel Nigeria', 
      'glo-ng': 'Glo Nigeria',
      '9mobile-ng': '9mobile Nigeria',
      
      // Kenya
      'safaricom-ke': 'Safaricom Kenya',
      'airtel-ke': 'Airtel Kenya',
      'telkom-ke': 'Telkom Kenya',
      
      // Uganda
      'mtn-ug': 'MTN Uganda',
      'airtel-ug': 'Airtel Uganda',
      'africell-ug': 'Africell Uganda',
      'utl-ug': 'UTL Uganda',
      
      // Tanzania
      'vodacom-tz': 'Vodacom Tanzania',
      'airtel-tz': 'Airtel Tanzania',
      'tigo-tz': 'Tigo Tanzania',
      'halotel-tz': 'Halotel Tanzania',
      
      // Sudan
      'zain-sd': 'Zain Sudan',
      'mtn-sd': 'MTN Sudan',
      'sudani-sd': 'Sudani One',
      
      // Morocco
      'maroc-telecom-ma': 'Maroc Telecom',
      'orange-ma': 'Orange Morocco',
      'inwi-ma': 'inwi Morocco',
      
      // Ethiopia
      'ethio-telecom-et': 'Ethio Telecom',
      'safaricom-et': 'Safaricom Ethiopia'
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