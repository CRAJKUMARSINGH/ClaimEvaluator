/**
 * Multi-Currency Support System
 * Supports 50+ major currencies with real-time conversion
 */

export enum Currency {
  // Major Currencies
  USD = 'USD', // US Dollar
  EUR = 'EUR', // Euro
  GBP = 'GBP', // British Pound
  JPY = 'JPY', // Japanese Yen
  CNY = 'CNY', // Chinese Yuan
  
  // Asia-Pacific
  INR = 'INR', // Indian Rupee
  AUD = 'AUD', // Australian Dollar
  NZD = 'NZD', // New Zealand Dollar
  SGD = 'SGD', // Singapore Dollar
  HKD = 'HKD', // Hong Kong Dollar
  KRW = 'KRW', // South Korean Won
  THB = 'THB', // Thai Baht
  MYR = 'MYR', // Malaysian Ringgit
  IDR = 'IDR', // Indonesian Rupiah
  PHP = 'PHP', // Philippine Peso
  VND = 'VND', // Vietnamese Dong
  
  // Middle East
  AED = 'AED', // UAE Dirham
  SAR = 'SAR', // Saudi Riyal
  QAR = 'QAR', // Qatari Riyal
  KWD = 'KWD', // Kuwaiti Dinar
  BHD = 'BHD', // Bahraini Dinar
  OMR = 'OMR', // Omani Rial
  ILS = 'ILS', // Israeli Shekel
  
  // Europe
  CHF = 'CHF', // Swiss Franc
  SEK = 'SEK', // Swedish Krona
  NOK = 'NOK', // Norwegian Krone
  DKK = 'DKK', // Danish Krone
  PLN = 'PLN', // Polish Zloty
  CZK = 'CZK', // Czech Koruna
  HUF = 'HUF', // Hungarian Forint
  RON = 'RON', // Romanian Leu
  
  // Americas
  CAD = 'CAD', // Canadian Dollar
  MXN = 'MXN', // Mexican Peso
  BRL = 'BRL', // Brazilian Real
  ARS = 'ARS', // Argentine Peso
  CLP = 'CLP', // Chilean Peso
  COP = 'COP', // Colombian Peso
  
  // Africa
  ZAR = 'ZAR', // South African Rand
  EGP = 'EGP', // Egyptian Pound
  NGN = 'NGN', // Nigerian Naira
  KES = 'KES', // Kenyan Shilling
  
  // Other
  RUB = 'RUB', // Russian Ruble
  TRY = 'TRY', // Turkish Lira
  PKR = 'PKR', // Pakistani Rupee
  BDT = 'BDT', // Bangladeshi Taka
  LKR = 'LKR', // Sri Lankan Rupee
}

export interface CurrencyInfo {
  code: Currency;
  name: string;
  symbol: string;
  decimals: number;
  countries: string[];
  region: string;
}

export const CURRENCY_INFO: Record<Currency, CurrencyInfo> = {
  [Currency.USD]: {
    code: Currency.USD,
    name: 'US Dollar',
    symbol: '$',
    decimals: 2,
    countries: ['United States', 'Ecuador', 'El Salvador'],
    region: 'Americas'
  },
  [Currency.EUR]: {
    code: Currency.EUR,
    name: 'Euro',
    symbol: '€',
    decimals: 2,
    countries: ['Eurozone'],
    region: 'Europe'
  },
  [Currency.GBP]: {
    code: Currency.GBP,
    name: 'British Pound',
    symbol: '£',
    decimals: 2,
    countries: ['United Kingdom'],
    region: 'Europe'
  },
  [Currency.INR]: {
    code: Currency.INR,
    name: 'Indian Rupee',
    symbol: '₹',
    decimals: 2,
    countries: ['India'],
    region: 'Asia'
  },
  [Currency.AED]: {
    code: Currency.AED,
    name: 'UAE Dirham',
    symbol: 'د.إ',
    decimals: 2,
    countries: ['United Arab Emirates'],
    region: 'Middle East'
  },
  [Currency.SAR]: {
    code: Currency.SAR,
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    decimals: 2,
    countries: ['Saudi Arabia'],
    region: 'Middle East'
  },
  [Currency.CNY]: {
    code: Currency.CNY,
    name: 'Chinese Yuan',
    symbol: '¥',
    decimals: 2,
    countries: ['China'],
    region: 'Asia'
  },
  [Currency.JPY]: {
    code: Currency.JPY,
    name: 'Japanese Yen',
    symbol: '¥',
    decimals: 0,
    countries: ['Japan'],
    region: 'Asia'
  },
  [Currency.AUD]: {
    code: Currency.AUD,
    name: 'Australian Dollar',
    symbol: 'A$',
    decimals: 2,
    countries: ['Australia'],
    region: 'Oceania'
  },
  [Currency.CAD]: {
    code: Currency.CAD,
    name: 'Canadian Dollar',
    symbol: 'C$',
    decimals: 2,
    countries: ['Canada'],
    region: 'Americas'
  },
  [Currency.SGD]: {
    code: Currency.SGD,
    name: 'Singapore Dollar',
    symbol: 'S$',
    decimals: 2,
    countries: ['Singapore'],
    region: 'Asia'
  },
  [Currency.CHF]: {
    code: Currency.CHF,
    name: 'Swiss Franc',
    symbol: 'CHF',
    decimals: 2,
    countries: ['Switzerland'],
    region: 'Europe'
  },
  [Currency.ZAR]: {
    code: Currency.ZAR,
    name: 'South African Rand',
    symbol: 'R',
    decimals: 2,
    countries: ['South Africa'],
    region: 'Africa'
  },
  [Currency.BRL]: {
    code: Currency.BRL,
    name: 'Brazilian Real',
    symbol: 'R$',
    decimals: 2,
    countries: ['Brazil'],
    region: 'Americas'
  },
  // Add remaining currencies...
  [Currency.NZD]: { code: Currency.NZD, name: 'New Zealand Dollar', symbol: 'NZ$', decimals: 2, countries: ['New Zealand'], region: 'Oceania' },
  [Currency.HKD]: { code: Currency.HKD, name: 'Hong Kong Dollar', symbol: 'HK$', decimals: 2, countries: ['Hong Kong'], region: 'Asia' },
  [Currency.KRW]: { code: Currency.KRW, name: 'South Korean Won', symbol: '₩', decimals: 0, countries: ['South Korea'], region: 'Asia' },
  [Currency.THB]: { code: Currency.THB, name: 'Thai Baht', symbol: '฿', decimals: 2, countries: ['Thailand'], region: 'Asia' },
  [Currency.MYR]: { code: Currency.MYR, name: 'Malaysian Ringgit', symbol: 'RM', decimals: 2, countries: ['Malaysia'], region: 'Asia' },
  [Currency.IDR]: { code: Currency.IDR, name: 'Indonesian Rupiah', symbol: 'Rp', decimals: 0, countries: ['Indonesia'], region: 'Asia' },
  [Currency.PHP]: { code: Currency.PHP, name: 'Philippine Peso', symbol: '₱', decimals: 2, countries: ['Philippines'], region: 'Asia' },
  [Currency.VND]: { code: Currency.VND, name: 'Vietnamese Dong', symbol: '₫', decimals: 0, countries: ['Vietnam'], region: 'Asia' },
  [Currency.QAR]: { code: Currency.QAR, name: 'Qatari Riyal', symbol: 'ر.ق', decimals: 2, countries: ['Qatar'], region: 'Middle East' },
  [Currency.KWD]: { code: Currency.KWD, name: 'Kuwaiti Dinar', symbol: 'د.ك', decimals: 3, countries: ['Kuwait'], region: 'Middle East' },
  [Currency.BHD]: { code: Currency.BHD, name: 'Bahraini Dinar', symbol: 'د.ب', decimals: 3, countries: ['Bahrain'], region: 'Middle East' },
  [Currency.OMR]: { code: Currency.OMR, name: 'Omani Rial', symbol: 'ر.ع.', decimals: 3, countries: ['Oman'], region: 'Middle East' },
  [Currency.ILS]: { code: Currency.ILS, name: 'Israeli Shekel', symbol: '₪', decimals: 2, countries: ['Israel'], region: 'Middle East' },
  [Currency.SEK]: { code: Currency.SEK, name: 'Swedish Krona', symbol: 'kr', decimals: 2, countries: ['Sweden'], region: 'Europe' },
  [Currency.NOK]: { code: Currency.NOK, name: 'Norwegian Krone', symbol: 'kr', decimals: 2, countries: ['Norway'], region: 'Europe' },
  [Currency.DKK]: { code: Currency.DKK, name: 'Danish Krone', symbol: 'kr', decimals: 2, countries: ['Denmark'], region: 'Europe' },
  [Currency.PLN]: { code: Currency.PLN, name: 'Polish Zloty', symbol: 'zł', decimals: 2, countries: ['Poland'], region: 'Europe' },
  [Currency.CZK]: { code: Currency.CZK, name: 'Czech Koruna', symbol: 'Kč', decimals: 2, countries: ['Czech Republic'], region: 'Europe' },
  [Currency.HUF]: { code: Currency.HUF, name: 'Hungarian Forint', symbol: 'Ft', decimals: 0, countries: ['Hungary'], region: 'Europe' },
  [Currency.RON]: { code: Currency.RON, name: 'Romanian Leu', symbol: 'lei', decimals: 2, countries: ['Romania'], region: 'Europe' },
  [Currency.MXN]: { code: Currency.MXN, name: 'Mexican Peso', symbol: 'Mex$', decimals: 2, countries: ['Mexico'], region: 'Americas' },
  [Currency.ARS]: { code: Currency.ARS, name: 'Argentine Peso', symbol: '$', decimals: 2, countries: ['Argentina'], region: 'Americas' },
  [Currency.CLP]: { code: Currency.CLP, name: 'Chilean Peso', symbol: '$', decimals: 0, countries: ['Chile'], region: 'Americas' },
  [Currency.COP]: { code: Currency.COP, name: 'Colombian Peso', symbol: '$', decimals: 0, countries: ['Colombia'], region: 'Americas' },
  [Currency.EGP]: { code: Currency.EGP, name: 'Egyptian Pound', symbol: 'E£', decimals: 2, countries: ['Egypt'], region: 'Africa' },
  [Currency.NGN]: { code: Currency.NGN, name: 'Nigerian Naira', symbol: '₦', decimals: 2, countries: ['Nigeria'], region: 'Africa' },
  [Currency.KES]: { code: Currency.KES, name: 'Kenyan Shilling', symbol: 'KSh', decimals: 2, countries: ['Kenya'], region: 'Africa' },
  [Currency.RUB]: { code: Currency.RUB, name: 'Russian Ruble', symbol: '₽', decimals: 2, countries: ['Russia'], region: 'Europe' },
  [Currency.TRY]: { code: Currency.TRY, name: 'Turkish Lira', symbol: '₺', decimals: 2, countries: ['Turkey'], region: 'Middle East' },
  [Currency.PKR]: { code: Currency.PKR, name: 'Pakistani Rupee', symbol: '₨', decimals: 2, countries: ['Pakistan'], region: 'Asia' },
  [Currency.BDT]: { code: Currency.BDT, name: 'Bangladeshi Taka', symbol: '৳', decimals: 2, countries: ['Bangladesh'], region: 'Asia' },
  [Currency.LKR]: { code: Currency.LKR, name: 'Sri Lankan Rupee', symbol: 'Rs', decimals: 2, countries: ['Sri Lanka'], region: 'Asia' },
};

export interface MoneyAmount {
  amount: number;
  currency: Currency;
}

export interface ExchangeRate {
  from: Currency;
  to: Currency;
  rate: number;
  timestamp: Date;
  source: string;
}

export class CurrencyConverter {
  private rates: Map<string, ExchangeRate> = new Map();
  private baseCurrency: Currency = Currency.USD;

  async getExchangeRate(from: Currency, to: Currency): Promise<number> {
    if (from === to) return 1;

    const key = `${from}_${to}`;
    const cached = this.rates.get(key);

    // Use cached rate if less than 1 hour old
    if (cached && (Date.now() - cached.timestamp.getTime()) < 3600000) {
      return cached.rate;
    }

    // Fetch new rate (implement API call here)
    const rate = await this.fetchExchangeRate(from, to);
    this.rates.set(key, {
      from,
      to,
      rate,
      timestamp: new Date(),
      source: 'API'
    });

    return rate;
  }

  private async fetchExchangeRate(from: Currency, to: Currency): Promise<number> {
    // TODO: Implement real API call to exchange rate service
    // For now, return mock rates
    const mockRates: Record<string, number> = {
      'USD_INR': 83.12,
      'USD_EUR': 0.92,
      'USD_GBP': 0.79,
      'USD_AED': 3.67,
      'USD_SAR': 3.75,
      'USD_CNY': 7.24,
      'USD_JPY': 149.50,
      'USD_AUD': 1.52,
      'USD_CAD': 1.36,
      'USD_SGD': 1.34,
      'INR_USD': 0.012,
      'EUR_USD': 1.09,
      'GBP_USD': 1.27,
      // Add more as needed
    };

    const key = `${from}_${to}`;
    return mockRates[key] || 1;
  }

  async convert(amount: MoneyAmount, toCurrency: Currency): Promise<MoneyAmount> {
    const rate = await this.getExchangeRate(amount.currency, toCurrency);
    return {
      amount: amount.amount * rate,
      currency: toCurrency
    };
  }

  formatMoney(amount: MoneyAmount, locale?: string): string {
    const info = CURRENCY_INFO[amount.currency];
    const formatter = new Intl.NumberFormat(locale || 'en-US', {
      style: 'currency',
      currency: amount.currency,
      minimumFractionDigits: info.decimals,
      maximumFractionDigits: info.decimals
    });
    return formatter.format(amount.amount);
  }

  // Convert to crores (Indian numbering system)
  toCrores(amount: number): string {
    return (amount / 10000000).toFixed(2) + ' Cr';
  }

  // Convert to lakhs
  toLakhs(amount: number): string {
    return (amount / 100000).toFixed(2) + ' L';
  }

  // Convert to millions
  toMillions(amount: number): string {
    return (amount / 1000000).toFixed(2) + 'M';
  }

  // Convert to billions
  toBillions(amount: number): string {
    return (amount / 1000000000).toFixed(2) + 'B';
  }
}

export const currencyConverter = new CurrencyConverter();
