import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ResetButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  text-transform: none;
`;

export const TransparentButton = styled(ResetButton)`
  display: block;
  width: 100%;
`;

const Button = styled(ResetButton)`
  
`;