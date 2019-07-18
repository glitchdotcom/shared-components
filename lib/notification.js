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

export const NotificationBase = styled.aside.attrs(() => ({ 'data-module': "Notification" }))`
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


let currentID = 0
const uniqueID = (prefix) => {
  currentID += 1;
  return `${prefix}-${currentID}`
}

const context = React.createContext();
const { Provider } = context;
export const NotificationConsumer = context.Consumer;
export const useNotifications = () => React.useContext(context);

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: 11; // TODO: store in theme
  top: 0;
  right: 0;
  padding: var(--space-1);
`

export const NotificationsProvider = ({ children, ...props }) => {
  const [notifications, setNotifications] = React.useState([]);
  
  const contextValue = React.useMemo(() => {
    const remove = (id) => {
      setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
    };
    
    const createNotification = (content, props = {}) => {
      const notification = {
        id: uniqueID('notification'),
        content,
        notificationProps: {
          lifetime: "transient",
          ...props,
        },
      };
      
      const removeNotification = () => {
        remove(notification.id);
      }

      const updateNotification = (updatedContent) => {
        setNotifications((prevNotifications) => prevNotifications.map((n) => (n.id === notification.id ? { ...n, updatedContent } : n)));
      };
      
      // TODO: should we _always_ add `removeNotification` as a prop, 
      // and Notification attaches it to onAnimationEnd if the lifetime is transient?
      if (notification.notificationProps.lifetime === "transient") {
        notification.notificationProps.onAnimationEnd = removeNotification;
      }
      
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      
      return { id: notification.id, updateNotification, removeNotification }
    };

    const createErrorNotification = (content = 'Something went wrong. Try refreshing?', props = {}) => 
      createNotification(content, { variant: "error", ...props });

    return { createNotification, createErrorNotification };
  }, [])

  return (
    <>
      <Provider value={contextValue}>{children}</Provider>
      {notifications.length > 0 && (
        <NotificationsContainer data-module="NotificationsContainer" {...props}>
          {notifications.map(({ id, content, notificationProps }) => (
            <Notification key={id} {...notificationProps}>
              {content}
            </Notification>
          ))}
        </NotificationsContainer>
      )}
    </>
  );
};



