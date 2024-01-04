import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../components/IconButton';
import IconInfoCircle from '../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../components/Tooltip';
import PriceSummary from './PriceSummary';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const PriceInfo = ({ summary, totalBill }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref}>
      <IconButton onClick={() => setTooltipOpen(!isTooltipOpen)}>
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary summary={summary} totalBill={totalBill} />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

PriceInfo.propTypes = {
  summary: PropTypes.object,
  totalBill: PropTypes.string,
};

export default PriceInfo;
