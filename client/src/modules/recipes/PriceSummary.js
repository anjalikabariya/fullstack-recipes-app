import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../../components/Flex';
import Text from '../../components/Text';
import Box from '../../components/Box';
import { parseRawPrice } from './price';

// PriceSummary user interface
const PriceSummary = ({ summary, totalBill }) => (
  <Box width={['290px', '450px']} p="1rem">
    {summary.items.map((item, index) => (
      <Flex key={index} justifyContent="space-between" pb="0.5rem">
        <Text fontWeight="regular" fontFamily="secondary" fontSize="md">
          {`${item.name}` + `${item.selected > 1 && ' X ' + item.selected}`}
        </Text>
        <Text fontWeight="regular" fontFamily="secondary" fontSize="md">
          {parseRawPrice(item.itemPrice)}
        </Text>
      </Flex>
    ))}
    <Flex justifyContent="space-between" pb="0.5rem">
      <Text fontWeight="regular" fontFamily="secondary" fontSize="md">
        Shipping
      </Text>
      <Text fontWeight="regular" fontFamily="secondary" fontSize="md">
        {summary.items.length > 0 ? parseRawPrice(summary.shippingPrice) : 0}
      </Text>
    </Flex>
    <Flex
      justifyContent="space-between"
      pt="0.5rem"
      borderTopWidth="1px"
      borderTopColor="#E4E4E4"
      borderTopStyle="solid">
      <Text fontWeight="bold" fontFamily="secondary" fontSize="md">
        Total
      </Text>
      <Text fontWeight="bold" fontFamily="secondary" fontSize="md">
        {totalBill}
      </Text>
    </Flex>
  </Box>
);

PriceSummary.propTypes = {
  summary: PropTypes.object,
  totalBill: PropTypes.string,
};

export default PriceSummary;
