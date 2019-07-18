import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// TODO: this pattern is used a lot, should it be abstracted?
const variants = {
  info: styled.css`
    color: var(--colors-info-text); // TODO: white
    background-color: var(--colors-info-background); // TODO: aka "notification"
  `,
  success: styled.css`
    color: var(--colors-success-text);
    background-color: var(--colors-success-background);
  `
  error: styled.css`
  `
}

const lifetimes = {
  transient: styled.css`
    animation-delay: 2.5s;
    animation-duration: 0.1s;
    animation-iteration-count: 1;
    animation-direction: forward;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-name: ${styled.keyframes`
      0% { opacity: 1; }
      100% { opacity: 0; }
    `};
    &:hover, &:focus {
      animation: none;
    }
  `,
  persistent: styled.css`
    animation: none;
  `
}

const NotificationBody = styled.aside`
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--space-1);
  border-radius: var(--rounded);
  max-width: 16rem;
`

const Notification = ({ children, type, persistent, inline, remove }) => {
  const className = cx({
    notification: true,
    success: type === 'success',
    error: type === 'error',
    persistent,
    inline,
  });

  return (
    <aside className={className} onAnimationEnd={remove}>
      {children}
    </aside>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error']),
  persistent: PropTypes.bool,
  inline: PropTypes.bool,
};

Notification.defaultProps = {
  type: 'info',
  persistent: false,
  inline: false,
};

