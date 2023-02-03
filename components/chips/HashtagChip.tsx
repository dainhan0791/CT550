import React from 'react';
import { Chip } from '@mui/material';
import { Tag } from '@mui/icons-material';
import styled from 'styled-components';

const SCChip = styled(Chip)`
  margin-top: -0.4rem;
  border: none;
  cursor: pointer;
  color: rgba(22, 24, 35, 1);
  font-weight: bold;
`;

const HashtagChip = ({ hashtag }: { hashtag: any }) => {
  return <SCChip icon={<Tag />} label={hashtag} variant="outlined" />;
};

export default HashtagChip;
