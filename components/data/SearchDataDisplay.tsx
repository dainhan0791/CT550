import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React from 'react';

const SearchDataDisplay = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    width: 360,
    minHeight: 40,
  },
}));

export default SearchDataDisplay;
