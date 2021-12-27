import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { OrderSummaryItem } from '../components/order-sumarry-item';
import { TooltipItem } from '../components/tooltip-item';
import { formatPrice } from '../utils/format-price';
interface CalculateGrossValues {
  _kunlatek: number;
  _devGross: number;
  _inss: number;
  _net: number;
  _issPisCofins: number;
}

export const Calculator = () => {
  const [totalGrossValue, setTotalGrossValue] = React.useState('');
  const [kunlatek, setKunlatek] = React.useState(0);
  const [devGross, setDevGross] = React.useState(0);
  const [inss, setInss] = React.useState(0);
  const [issPisCofins, setIssPisCofins] = React.useState(0);
  const [net, setNet] = React.useState(0);

  const handleGrossValue = (value: string) => {
    setTotalGrossValue(value);
    const { _kunlatek, _devGross, _issPisCofins, _inss, _net } =
      calculateGrossValue(Number(value));
    setKunlatek(_kunlatek * -1);
    setDevGross(_devGross);
    setInss(_inss * -1);
    setIssPisCofins(_issPisCofins * -1);
    setNet(_net);
  };

  const calculateGrossValue = (value: number): CalculateGrossValues => {
    const _totalGrossValue = value * (1 - 0.0565);
    const _kunlatek = _totalGrossValue * 0.25;
    const _devGross = _totalGrossValue * 0.75;
    return {
      _kunlatek,
      _devGross,
      _issPisCofins: value - _totalGrossValue,
      _inss: _devGross * 0.2,
      _net: _devGross * 0.8,
    };
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
          background: '-webkit-linear-gradient(135.51deg,#30a1fc,#6ae1ec)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
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
              value={totalGrossValue}
              onChange={({ target }) => handleGrossValue(target.value)}
            />
          </InputGroup>
        </OrderSummaryItem>
        <OrderSummaryItem
          label={
            <TooltipItem
              label="Imposto(ISS+PIS+COFINS)"
              tooltipLabel="ISS + PIS + COFINS incide sob o valor bruto e é fixado em 5,65%"
            />
          }
          isNegativeValue={true}
          value={formatPrice(issPisCofins)}
        />
        <OrderSummaryItem
          label={
            <TooltipItem
              label="Kunlatek"
              tooltipLabel="Kunlatek incide sob o valor bruto - Impostos(Iss PIS e COFINS) e é fixado em 25%"
            />
          }
          isNegativeValue={true}
          value={formatPrice(kunlatek)}
        />
        <OrderSummaryItem label="Bruto do dev" value={formatPrice(devGross)} />
        <OrderSummaryItem
          label={
            <TooltipItem
              label="Imposto(INSS)"
              tooltipLabel="INSS incide sob o valor bruto do dev e é fixado em 20%"
            />
          }
          isNegativeValue={true}
          value={formatPrice(inss)}
        />

        <Flex justify="space-between">
          <Text fontSize="lg" color="#FFFFFF" fontWeight="semibold">
            Valor líquido
          </Text>
          <Text fontSize="xl" color="#FFFFFF" fontWeight="extrabold">
            {formatPrice(net)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
