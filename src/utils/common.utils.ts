export const generateUniqeId = (prefix = 'portal') => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

export const formatCurrency = (
  value: string | number,
  options: {
    currency?: string;
    locale?: string;
    decimals?: number;
    symbol?: boolean;
  } = {},
) => {
  const { currency = 'USD', locale = 'en-US', decimals = 0, symbol = true } = options;
  const defineValue = typeof value === 'string' ? Number(value.replace(/[^0-9]/g, '')) : value;

  try {
    if (defineValue <= 0) return '';
    return new Intl.NumberFormat(locale, {
      style: symbol ? 'currency' : 'decimal',
      currency: symbol ? currency : undefined,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(defineValue);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${defineValue.toFixed(decimals)}`;
  }
};
