import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const SCAboutMeLink = styled(Link)`
  color: rgba(22, 24, 35, 0.5);
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  display: inline-block;
  margin-right: 6px;
  margin-top: 5px;
`;

const AboutMeLink = () => {
  return <SCAboutMeLink href="#">Footer</SCAboutMeLink>;
};

export default AboutMeLink;
