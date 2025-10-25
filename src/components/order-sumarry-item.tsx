import { Flex, Text } from '@chakra-ui/react';
import * as React from 'react';

type OrderSummaryItemProps = {
  label: React.ReactNode;
  value?: string;
  children?: React.ReactNode;
  isNegativeValue?: boolean;
  checkbox?: React.ReactNode;
};

export const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children, isNegativeValue, checkbox } = props;
  return (
    <Flex justify="space-between" alignItems="center" fontSize="sm">
      <Flex alignItems="center" gaps={2}>
        <Text fontWeight="medium" color="#FFFFFF">
          {label}
        </Text>
        {checkbox}
      </Flex>
      {value ? (
        <Text
          fontWeight="medium"
          color={isNegativeValue ? '#F5FF38' : '#FFFFFF'}
        >
          {value}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};
