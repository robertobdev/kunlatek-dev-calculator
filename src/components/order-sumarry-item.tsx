import { Flex, Text } from '@chakra-ui/react';
import * as React from 'react';

type OrderSummaryItemProps = {
  label: React.ReactNode;
  value?: string;
  children?: React.ReactNode;
  isNegativeValue?: boolean;
};

export const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children, isNegativeValue } = props;
  return (
    <Flex justify="space-between" alignItems="center" fontSize="sm">
      <Text fontWeight="medium" color="#FFFFFF">
        {label}
      </Text>
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
