import React, {useState, useEffect, useCallback} from 'react';
import {View, TextInput, FlatList, ActivityIndicator} from 'react-native';
import {ErrorBoundary} from 'react-error-boundary';
import {styles} from './CountrySearchStyles';
import {CountryInfo} from './type';
import {getCountryList} from '../../services/countryService';
import CountryInfoContent from '../CountryInfoContent/CountryInfoContent';
import {useDebounce} from '../../Hooks/useDebounce';
import {fetchWithExponentialBackoff} from '../../common/util';
import ErrorFallback from '../../ErrorFallbacks/ErrorFallback';

const CountrySearch = () => {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchCountriesWithBackoff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const {status, data} = await fetchWithExponentialBackoff(() =>
        getCountryList<CountryInfo[]>(),
      );

      if (status === 200) {
        setCountries(data);
        setFilteredCountries(data);
      } else {
        throw new Error('Failed to load the country list.');
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountriesWithBackoff();
  }, [fetchCountriesWithBackoff]);

  const handleReset = useCallback(() => {
    setCountries([]);
    setFilteredCountries([]);
    setSearchTerm('');
    setError(null);
    fetchCountriesWithBackoff();
  }, [fetchCountriesWithBackoff]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [debouncedSearchTerm, countries]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={handleReset} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a country..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.cca3}
        renderItem={({item}) => (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}>
            <CountryInfoContent country={item} />
          </ErrorBoundary>
        )}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default CountrySearch;
