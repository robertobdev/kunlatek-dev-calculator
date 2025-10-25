import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';

type TooltipItemProps = {
  tooltipLabel: string;
  label: string;
};

export const TooltipItem = ({ tooltipLabel, label }: TooltipItemProps) => {
  return (
    <Tooltip hasArrow label={tooltipLabel} bg="red.600">
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {label}
        <InfoIcon ml={1} color="#5ED7F2" width={3.5} />
      </span>
    </Tooltip>
  );
};
