import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import CountrySearch from './component/CountrySearch/CountrySearch';
import ErrorFallback from './ErrorFallbacks/ErrorFallback';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CountrySearch />
    </ErrorBoundary>
  );
};

export default App;
