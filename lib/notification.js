import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// TODO: this pattern is used a lot, should it be abstracted?
const variants = {
  info: styled.css`
    color: var(--colors-info-text); // TODO: white
    background-color: var(--colors-info-background); // TODO: aka "notification"
  `,
}

const NotificationBody = styled.aside`
  font-size: var(--fontSizes-tiny);
  font-weight: 600px;
  padding: var(--space-1);
  border-radius: var(--rounded);
  max-width: 16rem;
  animation-delay: 2.5s;
  animation-duration: 0.1s;
  animation-iteration-count: 1;
  animation-direction: forward;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-name: 
`


.notification
  font-size: 12px
  font-weight: 600
  padding: 5px 8px
  border-radius: 5px
  max-width: 260px
  animation-name: hideme
  animation-delay: 2.5s
  animation-duration: 0.1s
  animation-iteration-count: 1
  animation-direction: forward
  animation-fill-mode: forwards
  animation-timing-function: ease-out
  margin-bottom: 5px
  line-height: 16px
  p
    margin: 0
  hr
    opacity: 0.5
    height: 1px
    border: 0
    background-color: primary-background
  progress
    margin-left: 5px
  .loader
    width: 20px
    height: 19px
    margin: 0
    margin-right: 5px
  &:hover,
  &:focus,
  &.persistent
    animation: none
  &.success
    background-color: success
  &.error
    background-color: error
  &.inline
    position: absolute
    width: max-content
    left: 2px
    top: 25px

@keyframes hideme
  0%
    opacity: 1
  100%
    opacity: 0



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

