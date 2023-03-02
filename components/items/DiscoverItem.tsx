import React from 'react';
import Image from 'next/image';
import { Chip } from '@mui/material';
import styled from 'styled-components';

const SCChip = styled(Chip)`
  margin-top: 0.4rem;
  cursor: pointer;
  font-size: 0.7rem;
`;

const createIcon = (icon: string) => {
  return <Image src={`/discover/${icon}`} alt={icon} width={14} height={14} />;
};

const DiscoverItem = ({ chip }: { chip: any }) => {
  return <SCChip icon={createIcon(chip.icon)} label={chip.label} variant="outlined" />;
};

export default DiscoverItem;
