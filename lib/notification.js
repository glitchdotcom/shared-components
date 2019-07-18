import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// TODO: this pattern is used a lot, should it be abstracted?
const variants = {
  info: styled.css`
    color: var(--colors-info-text);
    background-color: var(--colors-info-background);
  `,
  success: styled.css`
    color: var(--colors-success-text);
    background-color: var(--colors-success-background);
  `,
  error: styled.css`
    color: var(--colors-error-text);
    background-color: var(--colors-error-background);
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

export const Notification = styled.aside.attrs(() => ({ 'data-module': "Notification" }))`
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--space-1);
  border-radius: var(--rounded);
  max-width: 16rem;
  ${({ variant }) => variants[variant]}
  ${({ lifetime }) => lifetimes[lifetime]}
`

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  lifetime: PropTypes.oneOf(Object.keys(lifetimes)),
};

Notification.defaultProps = {
  variant: 'info',
  lifetime: "persistent",
};


const context = React.createContext();
const { Provider } = context;
export const NotificationConsumer = context.Consumer;
export const useNotifications = () => React.useContext(context);

export const NotificationsProvider = (props) => {
  const [notifications, setNotifications] = React.useState([]);

  const remove = (notification) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n !== notification));
  };

  const create = (content, opts = {}) => {
    const notification = { content, ...opts };

    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    if (notification.persistent) {
      const updateNotification = (updatedContent) => {
        setNotifications((prevNotifications) => prevNotifications.map((n) => (n.id === notification.id ? { ...n, updatedContent } : n)));
      };
      const removeNotification = () => {
        remove(notification.id);
      };
      return {
        updateNotification,
        removeNotification,
      };
    }

    return notification.id;
  };

  const createError = (content = 'Something went wrong. Try refreshing?', opts) => {
    create(content, ...opts);
  };

  const funcs = {
    createNotification: create,
    createErrorNotification: createError,
  };

  const notificationsStyles = {
    zIndex: '11',
    top: '20px',
    right: '20px',
    position: 'fixed',
  };
  return (
    <>
      <Provider value={funcs}>{props.children}</Provider>
      {!!notifications.length && (
        <div style={notificationsStyles}>
          {notifications.map(({ id, content, ...args }) => (
            <Notification key={id} remove={() => remove(id)} {...args}>
              {content}
            </Notification>
          ))}
        </div>
      )}
    </>
  );
};



