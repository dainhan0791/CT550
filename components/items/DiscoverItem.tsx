import React from 'react';
import { Chip } from '@mui/material';
import { Face } from '@mui/icons-material';
import styled from 'styled-components';

const SCChip = styled(Chip)`
  margin-top: 0.4rem;
  cursor: pointer;
`;

const DiscoverItem = () => {
  return <SCChip icon={<Face />} label="Yeu don phuong la gigiYeu don phuong la gi" variant="outlined" />;
};

export default DiscoverItem;
