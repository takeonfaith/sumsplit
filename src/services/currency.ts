// CurrencyRate type available but not used in this file

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа
const cache: Map<string, { rate: number; timestamp: number }> = new Map();

export async function getExchangeRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;

  const cacheKey = `${from}_${to}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rate;
  }

  try {
    // Используем ExchangeRate-API (бесплатный)
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    
    if (!data.rates || !data.rates[to]) {
      throw new Error(`Currency ${to} not found`);
    }

    const rate = data.rates[to];
    cache.set(cacheKey, { rate, timestamp: Date.now() });
    
    return rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback: попробуем обратный курс
    try {
      const reverseResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${to}`);
      const reverseData = await reverseResponse.json();
      if (reverseData.rates && reverseData.rates[from]) {
        const rate = 1 / reverseData.rates[from];
        cache.set(cacheKey, { rate, timestamp: Date.now() });
        return rate;
      }
    } catch {
      // Если ничего не получилось, возвращаем 1
      return 1;
    }
    return 1;
  }
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;
  const rate = await getExchangeRate(from, to);
  return amount * rate;
}

