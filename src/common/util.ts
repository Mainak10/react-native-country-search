const fetchWithExponentialBackoff = async (
  fetchFn: () => Promise<any>,
  maxRetries: number = 3,
) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Attempt to make the fetch request
      const result = await fetchFn();
      return result; // If successful, return the result
    } catch (error) {
      // If an error occurs, handle the retry logic
      retries += 1;

      if (retries >= maxRetries) {
        // If retries exceed maxRetries, throw the error
        throw new Error('Failed after max retries');
      }

      // Calculate delay based on exponential backoff formula (2^n)
      const delay = Math.pow(2, retries) * 1000; // Convert to milliseconds

      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const formatNumber = (value: number, locale: string = 'en-US'): string => {
  // Handle large numbers with shorthand notations
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`;
  } // Trillions
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } // Billions
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } // Millions
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  } // Thousands

  // Default number formatting for smaller numbers
  return new Intl.NumberFormat(locale).format(Math.round(value)); // Rounded and formatted
};

export {fetchWithExponentialBackoff, formatNumber};
