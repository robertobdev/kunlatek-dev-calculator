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
      <Text fontWeight="medium" color="#FFFFFF" display="flex" alignItems="center" gap={2}>
        {label}
        {checkbox}
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
