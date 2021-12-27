import { VStack } from '@chakra-ui/react';
import * as React from 'react';
import { Logo } from './components/logo';
import { Calculator } from './pages/calculator';

function App() {
  return (
    <VStack justifyContent="space-between">
      <Calculator />;
      <Logo />
    </VStack>
  );
}

export default App;
