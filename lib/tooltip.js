/* eslint-disable no-unused-vars */
// TODO remove me before merge

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import { useUniqueId } from './hooks/use-unique-id';

const TYPES = ['action', 'info'];
const ALIGNMENTS = ['left', 'right', 'center', 'top'];

const TooltipContainerEl = styled.div`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
`;

const leftBeforeAfter = css`
  left: 0;
  right: initial;
  transform: translateX(0);
`;

const tooltipRightAndRightBefore = css`
  left: initial;
  right: 0;
  transform: translateX(0);
`;

const fallbackRightBeforeAfter = css`
  left: initial;
  right: 0;
  transform: translateX(0);
`;

// a div that has the result of what was tooltipClassName on it as styles
const TooltipBase = styled.div`
  border: none;
  box-sizing: inherit;
  display: inline-block;
  position: absolute;
  z-index: 9;
  transform: translateX(50%);
  right: 50%;
  top: 100%;
  width: auto;
  padding: 6px 8px;
  margin-top: 5px;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  background: var(--colors-tooltipBackground);
  border-radius: 5px;
  font-family: var(--fonts-sans);
  font-size: 12px;
  color: var(--colors-background);
  white-space: pre;
  word-wrap: break-word;
  cursor: text;
  user-select: text;

  &::before {
    position: absolute;
    content: '';
    display: block;
    height: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    margin-top: -6px;
    box-sizing: border-box;
    border: 5px solid transparent;
    border-bottom-color: var(--colors-tooltipBackground);
  }

  ${({ top }) =>
    top &&
    css`
      top: 0;
      transform: translateX(50%) translateY(-100%);
      margin-top: -6px;
      &::before {
        border-top-color: var(--colors-tooltipBackground);
        border-bottom-color: transparent;
        margin-top: -6px;
        transform: translateX(-50%) translateY(100%);
      }
    `
  }
  ${({ left }) =>
    left &&
    css`
      ${leftBeforeAfter}
      &::before {
        ${leftBeforeAfter}
        left: 10px;
      }
    `
  }
  ${({ right }) =>
    right &&
    css`
      ${tooltipRightAndRightBefore}
      &::before {
        ${tooltipRightAndRightBefore}
        right: 10px;
      }
    `
  }
  ${({ top, right, left }) =>
    top &&
    (left || right) &&
    css`
      transform: translateX(0) translateY(-100%);
      &::before {
        transform: translateX(0) translateY(100%);
      }
    `}
  ${({ variant }) =>
    variant === 'newStuff' &&
    css`
      background-color: var(--colors-notice-background);
      right: 32px;
      font-weight: bold;
      &::before {
        border-top-color: var(--colors-notice-background);
        border-bottom-color: transparent;
        top: 85%;
      }
    `}
  ${({ fallback }) =>
    fallback &&
    css`
      &::before {
        opacity: 0;

        content: '';
        position: absolute;
        display: block;
        height: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(0%);
        margin-top: 6px;
        box-sizing: border-box;
        border: 5px solid transparent;
        border-top-color: transparent;
        border-bottom-color: var(--colors-tooltipBackground);
      }
      &::after {
        opacity: 0;

        content: attr(data-tooltip);
        border: none;
        box-sizing: inherit;
        display: inline-block;
        pointer-events: none;
        position: absolute;
        z-index: 9;
        transform: translateX(50%);
        right: 50%;
        top: 100%;
        width: auto;
        padding: 6px 8px;
        margin-top: 5px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        background: var(--colors-tooltipBackground);
        border-radius: 5px;
        font-family: var(--fonts-sans);
        font-size: 12px;
        color: var(--colors-background);
        white-space: pre;
        word-wrap: break-word;
      }
      ${TooltipContainerEl}:hover &::before,
      ${TooltipContainerEl}:hover &::after {
        opacity: 1;
      }
    `}
    ${({ fallback, top }) =>
      fallback &&
      top &&
      css`
        &::before {
          margin-top: -6px;
          border-top-color: var(--colors-tooltipBackground);
          border-bottom-color: transparent;
        }
        &::after {
          margin-top: -12px;
          transform: translateX(50%) translateY(-200%);
        }
      `}
    ${({ fallback, left }) =>
      fallback &&
      left &&
      css`
        &::before {
          ${leftBeforeAfter}
          left: 10px;
        }
        &::after {
          ${leftBeforeAfter}
        }
      `}
    ${({ fallback, right }) =>
      fallback &&
      right &&
      css`
        &::before {
          ${fallbackRightBeforeAfter}
          right: 10px;
        }
        &::after {
          ${fallbackRightBeforeAfter}
        }
      `}
      ${({ fallback, top, right, left }) =>
        fallback &&
        top &&
        (right || left) &&
        css`
          &::after {
            transform: translateX(0) translateY(-200%);
          }
        `}
      ${({ fallback, top, right }) =>
        fallback &&
        top &&
        right &&
        css`
          &::before {
            transform: translateX(0) translateY(100%);
          }
        `}
      ${({ fallback, persistent }) =>
        fallback &&
        persistent &&
        css`
          &::after {
            font-weight: bold;
          }
        `}
        ${({ shouldShowTooltip }) =>
          !shouldShowTooltip &&
          css`
            display: none;
          `}
`;

const InvisibleHoverTarget = styled.span`
  position: absolute;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: default; /* don't show pointer */
  ${({ top }) =>
    top &&
    css`
      top: 0px;
    `}
  ${({ persistent }) =>
    persistent &&
    css`
      display: none;
    `}
`;

// change newStuff prop to variant
export const TooltipContainer = ({ type, tooltip, target, align, persistent, children, fallback, variant }) => {
  const [tooltipIsActive, setTooltipIsActive] = useState(false);

  useEffect(() => {
    console.log(tooltipIsActive);
    const keyHandler = (event) => {
      if (['Escape', 'Esc'].includes(event.key)) {
        event.preventDefault();
        setTooltipIsActive(false);
      }
    };
    window.addEventListener('keyup', keyHandler);
    return () => window.removeEventListener('keyup', keyHandler);
  }, [tooltipIsActive]);

  const id = useUniqueId();
  const shouldShowTooltip = tooltip && (tooltipIsActive || persistent);

  const top = align.includes('top');
  const left = align.includes('left');
  const right = align.includes('right');

  let role;
  let extendedTarget;

  if (fallback && target.type === 'img') {
    extendedTarget = (
      // const tooltipFallbackClassName = fallback ? styles.fallback : '';
      // this had className={tooltipFallbackClassName} but I don't think it did anything? 
      <div data-tooltip={tooltip}>
        {target}
      </div>
    );
  } else if (type === 'action') {
    // action tooltips are visible on hover and focus, click triggers a separate action
    // they should always be populated with their content, even when they are "hidden"
    role = 'tooltip';
    extendedTarget = React.cloneElement(target, {
      'aria-labelledby': id,
      'data-tooltip': tooltip,
      // had tooltipFallbackClassName added in too
      className: target.props.className,
    });
  } else if (type === 'info') {
    // info tooltips are visible on hover and focus, they provide supplementary info
    // they should be empty when not "visible", and populated when they are
    role = 'status';
    extendedTarget = React.cloneElement(target, {
      'aria-describedby': id,
      'data-tooltip': tooltip,
      // had tooltipFallbackClassName added in too
      className: target.props.className,
    });
  }

  function cancelClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  let tooltipNode = null;
  /*
   To select tooltip text, the user needs to click on the tooltip. Some tooltips are within buttons, links,
   or other click targets, so we need prevent those click events from propagating. The click handler on the
   tooltip cancels the click, so we don't need to expose that event via a keyboard handler.
  */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  if (!fallback) {
    tooltipNode = (
      <TooltipBase shouldShowTooltip={shouldShowTooltip} variant={variant} top={top} left={left} right={right} fallback={fallback} persistent={persistent} role={role} id={id} onClick={cancelClick}>
        {type === 'info' || shouldShowTooltip ? tooltip : null}
      </TooltipBase>
    );
  }

  return (
    <TooltipContainerEl onMouseEnter={() => setTooltipIsActive(true)} onMouseLeave={() => setTooltipIsActive(false)}>
      <div onFocus={() => setTooltipIsActive(true)} onBlur={() => setTooltipIsActive(false)}>
        {extendedTarget}
      </div>
      {top && <InvisibleHoverTarget top={top} aria-hidden="true" onClick={cancelClick} persistent={persistent} />}
      {tooltipNode}
      {!top && <InvisibleHoverTarget aria-hidden="true" onClick={cancelClick} persistent={persistent} />}
      {children}
    </TooltipContainerEl>
  );
};

TooltipContainer.propTypes = {
  children: PropTypes.node,
  /* the type of tooltip */
  type: PropTypes.oneOf(TYPES).isRequired,
  /* tooltip text */
  tooltip: PropTypes.string,
  /* the focus/hover target of the tooltip */
  target: PropTypes.node.isRequired,
  /* how to align the tooltip */
  align: PropTypes.arrayOf(PropTypes.oneOf(ALIGNMENTS)),
  /* whether to persistently show the tooltip */
  persistent: PropTypes.bool,
  /* whether to use CSS tooltips as a fallback (for < FF 66) */
  fallback: PropTypes.bool,
  variant: PropTypes.oneOf(['newStuff']),
};

TooltipContainer.defaultProps = {
  align: ['center'],
  children: null,
  tooltip: '',
  persistent: false,
  fallback: false,
  variant: null,
};

export const StoryTooltipContainer = () => {
  // const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The Tooltip component ...</p>
      <CodeExample>{code`<Tooltip />`}</CodeExample>
      <PropsDefinition>
        {/* <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
        <Prop name="label" required>
          A label that describes the value that is being toggle
  </Prop> */}
      </PropsDefinition>

      {/* <ToggleHeader>
        <h3>Notifications settings</h3> <Toggle value={value} onChange={onChange} label="Enable notifications" />
      </ToggleHeader> */}
      <TooltipContainer align={['top']} persistent target={
        <img src='https://cdn.glitch.com/180b5e22-4649-4c71-9a21-2482eb557c8c%2Fnew-stuff-doggo-2.svg?1521578888312' alt="New Stuff" width="50px" />
      }
      tooltip="New"
      type="info"
      variant="newStuff" />

      <TooltipContainer align={['right']} target={<button>Hello!</button>} tooltip="Click me" type="info" />
    </>
  );
};
