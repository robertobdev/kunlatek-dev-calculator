import {
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text
} from '@chakra-ui/react';
import * as React from 'react';
import { OrderSummaryItem } from '../components/order-sumarry-item';
import { TooltipItem } from '../components/tooltip-item';
import { formatPrice } from '../utils/format-price';

// Constants
const TETO_INSS = 8157.41;
const TETO_INSS_FEE = 951.62;
const KUNLATEK_FEE = 0.05;
const GOVERNMENT_FEE = 0.0565;
const INSS_RATE = 0.2;

// Types
interface CalculationResult {
  kunlatek: number;
  devGross: number;
  inss: number;
  net: number;
  issPisCofins: number;
}

interface CalculatorState {
  totalGrossValue: string;
  kunlatek: number;
  devGross: number;
  inss: number;
  issPisCofins: number;
  net: number;
  isInsseilingCeiling: boolean;
}

// Pure calculation functions
const calculateInssLimit = (): number => TETO_INSS * INSS_RATE;

const calculateGrossValue = (value: number, useCeiling?: boolean): CalculationResult => {
  const totalGrossValue = value * (1 - GOVERNMENT_FEE);
  const kunlatek = totalGrossValue * KUNLATEK_FEE;
  const devGross = totalGrossValue - kunlatek;
  const inssRaw = devGross * INSS_RATE;
  const inssLimit = calculateInssLimit();

  let inss = inssRaw < inssLimit ? inssRaw : inssLimit;

  if (useCeiling) {
    const ceilingInssValueFromKunlatek = inssLimit - TETO_INSS_FEE;
    if (inss > ceilingInssValueFromKunlatek) {
      inss = ceilingInssValueFromKunlatek;
    }
  }

  const net = devGross - inss;
  const issPisCofins = value - totalGrossValue;

  return {
    kunlatek,
    devGross,
    inss,
    net,
    issPisCofins,
  };
};

export const Calculator = () => {
  const [state, setState] = React.useState<CalculatorState>({
    totalGrossValue: '',
    kunlatek: 0,
    devGross: 0,
    inss: 0,
    issPisCofins: 0,
    net: 0,
    isInsseilingCeiling: false,
  });

  // Event handlers
  const handleGrossValueChange = (value: string) => {
    // Limita a 8 dígitos
    if (value.length > 8) {
      return;
    }

    // Se o valor estiver vazio, apenas atualiza o estado sem fazer cálculos
    if (value === '') {
      setState(prevState => ({
        ...prevState,
        totalGrossValue: value,
        kunlatek: 0,
        devGross: 0,
        issPisCofins: 0,
        inss: 0,
        net: 0,
      }));
      return;
    }

    const numericValue = Number(value);
    // Se o valor não for um número válido, não faz nada
    if (isNaN(numericValue) || numericValue < 0) {
      return;
    }

    const useCeiling = state.isInsseilingCeiling;
    const calculation = calculateGrossValue(numericValue, useCeiling);

    setState(prevState => ({
      ...prevState,
      totalGrossValue: value,
      kunlatek: calculation.kunlatek * -1,
      devGross: calculation.devGross,
      issPisCofins: calculation.issPisCofins * -1,
      inss: calculation.inss * -1,
      net: calculation.net,
    }));
  };

  const handleCeilingToggle = () => {
    const newCeilingValue = !state.isInsseilingCeiling;

    // Se não há valor válido, apenas atualiza o estado do checkbox
    if (state.totalGrossValue === '' || isNaN(Number(state.totalGrossValue))) {
      setState(prevState => ({
        ...prevState,
        isInsseilingCeiling: newCeilingValue,
      }));
      return;
    }

    const calculation = calculateGrossValue(Number(state.totalGrossValue), newCeilingValue);

    setState(prevState => ({
      ...prevState,
      isInsseilingCeiling: newCeilingValue,
      kunlatek: calculation.kunlatek * -1,
      devGross: calculation.devGross,
      issPisCofins: calculation.issPisCofins * -1,
      inss: calculation.inss * -1,
      net: calculation.net,
    }));
  };


  return (
    <Stack
      margin="8"
      spacing="8"
      borderWidth="1px"
      bgColor="#012340"
      rounded="lg"
      padding="8"
      maxWidth="96"
    >
      <Heading
        textAlign="center"
        color="#5ED7F2"
        size="md"
        css={{
          background: 'linear-gradient(135.51deg,#30a1fc,#6ae1ec)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        CALCULADORA DEV - KUNLATEK
      </Heading>

      <Stack spacing="6">
        <OrderSummaryItem
          label={
            <TooltipItem
              label="Valor bruto"
              tooltipLabel="Valor da hora base: Junior R$50; Pleno R$60; Senior R$80;"
            />
          }
        >
          <InputGroup width={150}>
            <InputLeftElement
              pointerEvents="none"
              color="#FFFFFF"
              fontSize="1.2em"
              children="R$"
            />
            <Input
              color="#FFFFFF"
              placeholder="Valor bruto"
              type="number"
              maxLength={8}
              value={state.totalGrossValue}
              onChange={({ target }) => handleGrossValueChange(target.value)}
            />
          </InputGroup>
        </OrderSummaryItem>

        <OrderSummaryItem
          label={
            <TooltipItem
              label="Imposto(ISS+PIS+COFINS)"
              tooltipLabel={`ISS + PIS + COFINS incide sob o valor bruto e é fixado em ${GOVERNMENT_FEE * 100}%`}
            />
          }
          isNegativeValue={true}
          value={formatPrice(state.issPisCofins)}
        />

        <OrderSummaryItem
          label={
            <TooltipItem
              label="Kunlatek"
              tooltipLabel={`Kunlatek incide sob o valor bruto - Impostos(Iss PIS e COFINS) e é fixado em ${KUNLATEK_FEE * 100}%`}
            />
          }
          isNegativeValue={true}
          value={formatPrice(state.kunlatek)}
        />

        <OrderSummaryItem
          label="Bruto do dev"
          value={formatPrice(state.devGross)}
        />

        <OrderSummaryItem
          label={
            <TooltipItem
              label="Imposto(INSS)"
              tooltipLabel={`INSS incide sob o valor bruto do dev e é fixado em ${INSS_RATE * 100}% com teto de ${formatPrice(calculateInssLimit())}`}
            />
          }
          isNegativeValue={true}
          value={formatPrice(state.inss)}
          checkbox={
            <Checkbox
              title="Já paga o teto?"
              isChecked={state.isInsseilingCeiling}
              onChange={handleCeilingToggle}
            />
          }
        />

        <Flex justify="space-between">
          <Text fontSize="lg" color="#FFFFFF" fontWeight="semibold">
            Valor líquido
          </Text>
          <Text fontSize="xl" color="#FFFFFF" fontWeight="extrabold">
            {formatPrice(state.net)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
