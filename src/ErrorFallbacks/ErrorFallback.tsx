import React from 'react';
import {View, Text, Button} from 'react-native';
import {FallbackProps} from 'react-error-boundary';
import {styles} from './ErrorFallbackStyles';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <View style={styles.container}>
    <Text>Something went wrong:</Text>
    <Text>{error.message}</Text>
    <Button onPress={resetErrorBoundary} title="Try Again" />
  </View>
);

export default ErrorFallback;
