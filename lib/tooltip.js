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

const leftAndLefBefore = css`
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
        top: 85%;
      }
    `}
  ${({ left }) =>
    left &&
    css`
      ${leftAndLefBefore}
      &::before {
        ${leftAndLefBefore}
        left: 10px;
        transform: translateX(0) translateY(-100%);
      }
    `}
  ${({ right }) =>
    right &&
    css`
      ${tooltipRightAndRightBefore}
      &::before {
        ${tooltipRightAndRightBefore}
        right: 10px;
        transform: translateX(0) translateY(-100%);
      }
    `}
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
          ${leftAndLefBefore}
          left: 10px;
        }
        &::after {
          ${leftAndLefBefore}
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

export const TooltipContainer = ({ type, tooltip, target, align, persistent, children, fallback, variant }) => {
  const [tooltipIsActive, setTooltipIsActive] = useState(false);

  useEffect(() => {
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
    extendedTarget = <div data-tooltip={tooltip}>{target}</div>;
  } else if (type === 'action') {
    // action tooltips are visible on hover and focus, click triggers a separate action
    // they should always be populated with their content, even when they are "hidden"
    role = 'tooltip';
    extendedTarget = React.cloneElement(target, {
      'aria-labelledby': id,
      'data-tooltip': tooltip,
      className: target.props.className,
    });
  } else if (type === 'info') {
    // info tooltips are visible on hover and focus, they provide supplementary info
    // they should be empty when not "visible", and populated when they are
    role = 'status';
    extendedTarget = React.cloneElement(target, {
      'aria-describedby': id,
      'data-tooltip': tooltip,
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
      <TooltipBase
        shouldShowTooltip={shouldShowTooltip}
        variant={variant}
        top={top}
        left={left}
        right={right}
        fallback={fallback}
        persistent={persistent}
        role={role}
        id={id}
        onClick={cancelClick}
      >
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
  type: PropTypes.oneOf(TYPES).isRequired,
  tooltip: PropTypes.string,
  target: PropTypes.node.isRequired,
  align: PropTypes.arrayOf(PropTypes.oneOf(ALIGNMENTS)),
  persistent: PropTypes.bool,
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
  const newStuffImgUrl = 'https://cdn.glitch.com/180b5e22-4649-4c71-9a21-2482eb557c8c%2Fnew-stuff-doggo-2.svg?1521578888312';
  return (
    <>
      <p>The TooltipContainer component renders an element. When that element (the target) is hovered or focused, a tooltip with some helpful additional text will appear.</p>
      <CodeExample>{code`
      <TooltipContainer
        align={['top']}
        persistent
        target={<img src={newStuffImgUrl} alt="New Stuff" width="50px" />}
        tooltip="New"
        type="info"
        variant="newStuff"
      />

      <TooltipContainer align={['top', 'right']} target={<button>Top right persistent tooltip</button>} tooltip="Click me" type="info" />
      
      `}</CodeExample>
      <PropsDefinition>
        <Prop name="type" required>
          The type of tooltip: <code>'info'</code> or <code>'action'</code>. Action tooltips are visible on hover and focus, and clicking the target
          element triggers a separate action. They should always be populated with their content, even when they are "hidden". Info tooltips are
          visible on hover and focus; they provide supplementary info. They should be empty when not "visible", and populated when they are.
        </Prop>
        <Prop name="tooltip">The string to display inside the tooltip</Prop>
        <Prop name="target" required>
          A node. The tooltip will appear when the target element is hovered or focused.
        </Prop>
        <Prop name="align">
          An array of strings, representing how to align the tooltip. Default is <code>['center']</code>, which more specifically means bottom center. Other options include "top" (which will place the tooltip in top center if used alone, or can be used in conjunction with left or right), "left", and
          "right".
        </Prop>
        <Prop name="persistent">Whether to persistently show the tooltip (not triggered by focus/hover). Defaults to false.</Prop>
        <Prop name="fallback">Boolean, whether to use CSS tooltips as a fallback (for &lt; FF 66)</Prop>
        <Prop name="variant">
          A string, with one possible value that is <code>newStuff</code>, for use with the New Stuff Pup.
        </Prop>
      </PropsDefinition>

      <TooltipContainer
        align={['top']}
        persistent
        target={<img src={newStuffImgUrl} alt="New Stuff" width="50px" />}
        tooltip="New"
        type="info"
        variant="newStuff"
      />
      <TooltipContainer align={['left']} target={<button>Left tooltip</button>} tooltip="New" type="info" />
      <TooltipContainer target={<button>Default aligned tooltip</button>} tooltip="Such center!" type="info" />
      <TooltipContainer align={['right']} target={<button>Right tooltip</button>} tooltip="Important info!" type="info" />
      <TooltipContainer align={['top']} persistent target={<button>Top tooltip</button>} tooltip="Click me" type="info" />
      <TooltipContainer align={['top', 'right']} persistent target={<button>Top right persistent tooltip</button>} tooltip="Click me" type="info" />
    </>
  );
};
