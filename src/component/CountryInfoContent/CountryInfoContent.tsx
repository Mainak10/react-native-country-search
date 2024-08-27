import React from 'react';
import {Image, Text, View} from 'react-native';
import {CountryInfo} from '../CountrySearch/type';
import styles from './CountryInfoStyles';
import {formatNumber} from '../../common/util';

const CountryInfoContent: React.FC<{country: CountryInfo}> = ({country}) => {
  if (!country) {
    throw new Error('Country data is missing');
  }

  return (
    <View style={styles.card}>
      <Image source={{uri: country.flags.png}} style={styles.flag} />
      <View style={styles.details}>
        <Text style={styles.name}>{country.name.common}</Text>
        <Text style={styles.info}>
          Population: {formatNumber(country.population)}
        </Text>
        <Text style={styles.info}>Region: {country.region}</Text>
        <Text style={styles.info}>
          Capital: {country.capital ? country.capital.join(', ') : 'N/A'}
        </Text>
      </View>
    </View>
  );
};

export default CountryInfoContent;
