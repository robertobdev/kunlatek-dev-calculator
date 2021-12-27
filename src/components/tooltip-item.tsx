import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

type TooltipItemProps = {
  tooltipLabel: string;
  label: string;
};

export const TooltipItem = ({ tooltipLabel, label }: TooltipItemProps) => {
  return (
    <Tooltip hasArrow label={tooltipLabel} bg="red.600">
      <Flex>
        {label}
        <InfoIcon ml={1} color="#5ED7F2" width={3.5} />
      </Flex>
    </Tooltip>
  );
};
