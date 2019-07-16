import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';
import { onArrowKeys } from './keyboard-navigation';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonSegment = styled(Button)`
  flex: 0 0 auto;
  border-radius: 0;
  border-right-style: none;
  &[aria-checked='true'] {
    filter: brightness(0.9);
  }
  &:first-child {
    border-radius: var(--rounded) 0 0 var(--rounded);
  }
  &:last-child {
    border-radius: 0 var(--rounded) var(--rounded) 0;
    border-right-style: solid;
  }
`;

const handleKeyDown = (options, refs, index, onChange) => (e) => {
  const nextIndex = onArrowKeys(e, index, options);
  if (nextIndex === null) return;
  onChange(options[nextIndex].id, e);
  refs.current[nextIndex].focus();
};

export const SegmentedButton = ({ value, options, onChange, size, ...props }) => {
  const refs = React.useRef([]);
  return (
    <ButtonGroup data-module="SegmentedButton" role="radiogroup" {...props}>
      {options.map((option, i) => (
        <ButtonSegment
          ref={(el) => {
            refs.current[i] = el;
          }}
          key={option.id}
          active={value === option.id}
          onClick={(e) => onChange(option.id, e)}
          size={size}
          // a11y, see https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/radio/radio.html
          role="radio"
          tabIndex={value === option.id ? 0 : -1}
          aria-checked={value === option.id}
          onKeyDown={handleKeyDown(options, refs, i, onChange)}
        >
          {option.label}
        </ButtonSegment>
      ))}
    </ButtonGroup>
  );
};
SegmentedButton.propTypes = {
  value: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
    }).isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};
SegmentedButton.defaultProps = {
  size: 'large',
};

const options = [{ id: 'foo', label: 'FooBar' }, { id: 'bar', label: 'agogo' }, { id: 'baz', label: 'BagLager' }];

const Wrap = styled.div`
  margin: var(--space-2);
`;

export const story_SegmentedButton = () => {
  const [valueBig, onChangeBig] = React.useState('foo');
  const [valueSmall, onChangeSmall] = React.useState('bar');
  return (
    <>
      <Wrap>
        <SegmentedButton value={valueBig} onChange={(id) => onChangeBig(id)} options={options} />
      </Wrap>
      <Wrap>
        <SegmentedButton size="small" value={valueSmall} onChange={(id) => onChangeSmall(id)} options={options} />
      </Wrap>
    </>
  );
};
