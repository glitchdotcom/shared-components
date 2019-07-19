import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, LinkButton } from './button';
import { variantColors } from './system';

const variants = {
  info: variantColors.info,
  success: variantColors.success,
  error: variantColors.error,
};

const lifetimes = {
  transient: styled.css`
    animation-delay: 2.5s;
    animation-duration: 0.1s;
    animation-iteration-count: 1;
    animation-direction: forward;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-name: ${styled.keyframes`
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    `};
    &:hover,
    &:focus {
      animation: none;
    }
  `,
  persistent: styled.css`
    animation: none;
  `,
};

export const NotificationBase = styled.aside`
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--space-1) var(--space-1);
  border-radius: var(--rounded);
  max-width: 16rem;
  ${({ variant }) => variants[variant]}
  ${({ lifetime }) => lifetimes[lifetime]}
`;

const Notification = ({ children, variant, lifetime, onRemove, ...props }) => {
  const ref = React.useRef();
  const handleAnimationEnd = (event) => {
    if (onRemove && event.target === ref.current) onRemove();
  };
  return (
    <NotificationBase ref={ref} data-module="Notification" variant={variant} lifetime={lifetime} onAnimationEnd={handleAnimationEnd} {...props}>
      {children}
    </NotificationBase>
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  lifetime: PropTypes.oneOf(Object.keys(lifetimes)),
  onRemove: PropTypes.func,
};

Notification.defaultProps = {
  variant: 'info',
  lifetime: 'persistent',
  onRemove: null,
};

const Wrap = styled.div`
  & > * {
    margin: var(--space-1) 0;
  }
`

const P = styled.p`
  margin: 0;
`

export const StoryNotification = () => (
  <Wrap>
    <Notification variant="info">
      Reconnecting…
    </Notification>
    <Notification variant="success">
      <P style={{marginBottom: '0.25rem'}}>
        Added power-passenger to collection shared-component-libraries
      </P>
      <LinkButton variant="secondary" size="tiny" href="https://glitch.com/@modernserf/linen-collection" rel="noopener noreferrer">
        Take me there
      </LinkButton>
    </Notification>
    <Notification variant="error">
      <P>
        Something went wrong. Try refreshing?
      </P>
    </Notification>
  </Wrap>
)

let currentID = 0;
const uniqueID = (prefix) => {
  currentID += 1;
  return `${prefix}-${currentID}`;
};

const context = React.createContext();
const { Provider } = context;
export const NotificationConsumer = context.Consumer;
export const useNotifications = () => React.useContext(context);

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: var(--z-notifications);
  top: 0;
  right: 0;
  padding: var(--space-1);
`;

export const NotificationsProvider = ({ children, ...props }) => {
  const [notifications, setNotifications] = React.useState([]);

  const contextValue = React.useMemo(() => {
    const remove = (id) => {
      setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
    };

    const createNotification = (content, props = {}) => {
      const id = uniqueID('notification');

      const removeNotification = () => remove(id);

      const updateNotification = (updatedContent) => {
        setNotifications((prevNotifications) => prevNotifications.map((n) => (n.id === id ? { ...n, content: updatedContent } : n)));
      };

      const notification = {
        id,
        content,
        notificationProps: {
          lifetime: 'transient',
          onRemove: removeNotification,
          ...props,
        },
      };

      setNotifications((prevNotifications) => [...prevNotifications, notification]);

      return { id: notification.id, updateNotification, removeNotification };
    };

    const createErrorNotification = (content = 'Something went wrong. Try refreshing?', props = {}) =>
      createNotification(content, { variant: 'error', ...props });

    return { createNotification, createErrorNotification };
  }, []);

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

const Content = () => {
  const { createNotification } = useNotifications()
  const onClick = () => {
    createNotification("This is a notification.")
  }
  
  return (
    <Button onClick={onClick}>Create Notification</Button>
  )
}

export const StoryNotificationsProvider = () => (
  <NotificationsProvider>
    <Content />
  </NotificationsProvider>
)
