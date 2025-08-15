import { NetworkProvider } from '../types';

export const networkProviders: NetworkProvider[] = [
  // Nigeria
  {
    id: 'mtn-ng',
    name: 'MTN Nigeria',
    logo: '/mtn-logo.png',
    color: 'yellow',
    country: 'Nigeria',
    countryCode: 'NG'
  },
  {
    id: 'airtel-ng',
    name: 'Airtel Nigeria',
    logo: '/airtel-logo.png',
    color: 'red',
    country: 'Nigeria',
    countryCode: 'NG'
  },
  {
    id: 'glo-ng',
    name: 'Glo Nigeria',
    logo: '/glo-logo.png',
    color: 'green',
    country: 'Nigeria',
    countryCode: 'NG'
  },
  {
    id: '9mobile-ng',
    name: '9mobile Nigeria',
    logo: '/9mobile-logo.png',
    color: 'emerald',
    country: 'Nigeria',
    countryCode: 'NG'
  },

  // Kenya
  {
    id: 'safaricom-ke',
    name: 'Safaricom Kenya',
    logo: '/safaricom-logo.png',
    color: 'green',
    country: 'Kenya',
    countryCode: 'KE'
  },
  {
    id: 'airtel-ke',
    name: 'Airtel Kenya',
    logo: '/airtel-logo.png',
    color: 'red',
    country: 'Kenya',
    countryCode: 'KE'
  },
  {
    id: 'telkom-ke',
    name: 'Telkom Kenya',
    logo: '/telkom-logo.png',
    color: 'blue',
    country: 'Kenya',
    countryCode: 'KE'
  },

  // Uganda
  {
    id: 'mtn-ug',
    name: 'MTN Uganda',
    logo: '/mtn-logo.png',
    color: 'yellow',
    country: 'Uganda',
    countryCode: 'UG'
  },
  {
    id: 'airtel-ug',
    name: 'Airtel Uganda',
    logo: '/airtel-logo.png',
    color: 'red',
    country: 'Uganda',
    countryCode: 'UG'
  },
  {
    id: 'africell-ug',
    name: 'Africell Uganda',
    logo: '/africell-logo.png',
    color: 'purple',
    country: 'Uganda',
    countryCode: 'UG'
  },
  {
    id: 'utl-ug',
    name: 'UTL Uganda',
    logo: '/utl-logo.png',
    color: 'orange',
    country: 'Uganda',
    countryCode: 'UG'
  },

  // Tanzania
  {
    id: 'vodacom-tz',
    name: 'Vodacom Tanzania',
    logo: '/vodacom-logo.png',
    color: 'red',
    country: 'Tanzania',
    countryCode: 'TZ'
  },
  {
    id: 'airtel-tz',
    name: 'Airtel Tanzania',
    logo: '/airtel-logo.png',
    color: 'red',
    country: 'Tanzania',
    countryCode: 'TZ'
  },
  {
    id: 'tigo-tz',
    name: 'Tigo Tanzania',
    logo: '/tigo-logo.png',
    color: 'blue',
    country: 'Tanzania',
    countryCode: 'TZ'
  },
  {
    id: 'halotel-tz',
    name: 'Halotel Tanzania',
    logo: '/halotel-logo.png',
    color: 'purple',
    country: 'Tanzania',
    countryCode: 'TZ'
  },

  // Sudan
  {
    id: 'zain-sd',
    name: 'Zain Sudan',
    logo: '/zain-logo.png',
    color: 'purple',
    country: 'Sudan',
    countryCode: 'SD'
  },
  {
    id: 'mtn-sd',
    name: 'MTN Sudan',
    logo: '/mtn-logo.png',
    color: 'yellow',
    country: 'Sudan',
    countryCode: 'SD'
  },
  {
    id: 'sudani-sd',
    name: 'Sudani One',
    logo: '/sudani-logo.png',
    color: 'blue',
    country: 'Sudan',
    countryCode: 'SD'
  },

  // Morocco
  {
    id: 'maroc-telecom-ma',
    name: 'Maroc Telecom',
    logo: '/maroc-telecom-logo.png',
    color: 'red',
    country: 'Morocco',
    countryCode: 'MA'
  },
  {
    id: 'orange-ma',
    name: 'Orange Morocco',
    logo: '/orange-logo.png',
    color: 'orange',
    country: 'Morocco',
    countryCode: 'MA'
  },
  {
    id: 'inwi-ma',
    name: 'inwi Morocco',
    logo: '/inwi-logo.png',
    color: 'green',
    country: 'Morocco',
    countryCode: 'MA'
  },

  // Ethiopia
  {
    id: 'ethio-telecom-et',
    name: 'Ethio Telecom',
    logo: '/ethio-telecom-logo.png',
    color: 'green',
    country: 'Ethiopia',
    countryCode: 'ET'
  },
  {
    id: 'safaricom-et',
    name: 'Safaricom Ethiopia',
    logo: '/safaricom-logo.png',
    color: 'green',
    country: 'Ethiopia',
    countryCode: 'ET'
  }
];

// Group networks by country for easier selection
export const networksByCountry = {
  'Nigeria': networkProviders.filter(n => n.countryCode === 'NG'),
  'Kenya': networkProviders.filter(n => n.countryCode === 'KE'),
  'Uganda': networkProviders.filter(n => n.countryCode === 'UG'),
  'Tanzania': networkProviders.filter(n => n.countryCode === 'TZ'),
  'Sudan': networkProviders.filter(n => n.countryCode === 'SD'),
  'Morocco': networkProviders.filter(n => n.countryCode === 'MA'),
  'Ethiopia': networkProviders.filter(n => n.countryCode === 'ET'),
};

export const countries = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
];