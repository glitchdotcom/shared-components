import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';
import { onArrowKeys } from './keyboard-navigation';
import { Badge } from './badge';
import { Icon } from './icon';

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonSegment = styled(Button)`
  flex: 0 0 auto;
  border-radius: 0;
  border-right-style: none;
  &[aria-checked='true'] {
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);
  }
  &:first-child {
    border-radius: var(--rounded) 0 0 var(--rounded);
  }
  &:last-child {
    border-radius: 0 var(--rounded) var(--rounded) 0;
    border-right-style: solid;
  }
`;

export const ButtonGroup = ({ children, size, variant, ...props }) => (
  <ButtonWrap data-module="ButtonGroup" {...props}>
    {React.Children.map(children, (child) => React.cloneElement(child, { size, variant }))}
  </ButtonWrap>
);
ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'cta']),
};
ButtonGroup.defaultProps = {
  size: 'large',
  variant: 'primary',
};

const BadgeIcon = styled(Icon)`
  color: inherit;
`;
const BadgeInButton = styled(Badge)`
  vertical-align: top;
  margin-top: -0.15em; // offset the difference from optical padding
`;

const SearchBadge = ({ count }) => (
  <BadgeInButton variant="warning">
    {count} <BadgeIcon icon="search" />
  </BadgeInButton>
);

const noop = () => {};

export const story_ButtonGroup = () => {
  return (
    <ButtonGroup variant="secondary">
      <ButtonSegment onClick={noop}>&lt;</ButtonSegment>
      <ButtonSegment onClick={noop}>&gt;</ButtonSegment>
      <ButtonSegment onClick={noop}>&times;</ButtonSegment>
      <ButtonSegment onClick={noop}>
        foo <SearchBadge count={123} />
      </ButtonSegment>
    </ButtonGroup>
  );
};

const handleKeyDown = (options, refs, index, onChange) => (e) => {
  const nextIndex = onArrowKeys(e, index, options);
  if (nextIndex === null) return;
  onChange(options[nextIndex].id, e);
  refs.current[nextIndex].focus();
};

export const SegmentedButton = ({ value, options, onChange, size, variant, ...props }) => {
  const refs = React.useRef([]);
  return (
    <ButtonWrap data-module="SegmentedButton" role="radiogroup" {...props}>
      {options.map(({ id, label, ...buttonProps }, i) => (
        <ButtonSegment
          ref={(el) => {
            refs.current[i] = el;
          }}
          key={id}
          active={value === id}
          onClick={(e) => onChange(id, e)}
          size={size}
          variant={variant}
          // a11y, see https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/radio/radio.html
          role="radio"
          tabIndex={value === id ? 0 : -1}
          aria-checked={value === id}
          onKeyDown={handleKeyDown(options, refs, i, onChange)}
          {...buttonProps}
        >
          {label}
        </ButtonSegment>
      ))}
    </ButtonWrap>
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
  variant: PropTypes.oneOf(['primary', 'secondary', 'cta']),
};
SegmentedButton.defaultProps = {
  size: 'large',
  variant: 'primary',
};

const options = [{ id: 'foo', label: 'FooBar' }, { id: 'bar', label: 'agogo' }, { id: 'baz', label: 'BagLager' }];

const Wrap = styled.div`
  margin: var(--space-2) 0;
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
