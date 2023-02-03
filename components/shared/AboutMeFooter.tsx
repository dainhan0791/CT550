import React from 'react';
import styled from 'styled-components';
import AboutMeItem from '../items/AboutMeItem';

const SCAboutMeFooterWrapper = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const AboutMeFooter = () => {
  return (
    <SCAboutMeFooterWrapper>
      <AboutMeItem />
    </SCAboutMeFooterWrapper>
  );
};

export default AboutMeFooter;
