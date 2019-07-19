import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UnstyledButton, Button, LinkButton } from './button';
import { Icon } from './icon';
import { Progress } from './progress';
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

const CloseButton = styled(UnstyledButton)`
  flex: 0 0 auto;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: var(--fontSizes-small);
`

export const NotificationBase = styled.aside`
  display: flex;
  align-items: flex-start;
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--space-1) var(--space-1);
  border-radius: var(--rounded);
  ${({ variant }) => variants[variant]}
  ${({ lifetime }) => lifetimes[lifetime]}
  & + & {
    margin-top: var(--space-1);
  }
  &:hover ${CloseButton} {
    opacity: 1;
  }
`;

const NotificationContent = styled.div`
  flex: 1 1 auto;
  margin-right: var(--space-1);
`

const Notification = ({ children, variant, lifetime, onClose, ...props }) => {
  const ref = React.useRef();
  const handleAnimationEnd = (event) => {
    if (onClose && event.target === ref.current) onClose();
  };
  return (
    <NotificationBase ref={ref} data-module="Notification" variant={variant} lifetime={lifetime} onAnimationEnd={handleAnimationEnd} {...props}>
      <NotificationContent>
        {children}
      </NotificationContent>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Dismiss notification">
          <Icon icon="x" style={{color: "inherit"}} />
        </CloseButton>
      )}
    </NotificationBase>
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  lifetime: PropTypes.oneOf(Object.keys(lifetimes)),
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  variant: 'info',
  lifetime: 'persistent',
};

const P = styled.p`
  margin: 0 0 0.25rem;
`

export const StoryNotification = () => (
  <>
    <Notification variant="info">
      Reconnecting…
    </Notification>
    <Notification variant="success">
      <P>
        Added power-passenger to collection linen-collection
      </P>
      <LinkButton variant="secondary" size="tiny" href="https://glitch.com/@modernserf/linen-collection" rel="noopener noreferrer">
        Take me there
      </LinkButton>
    </Notification>
    <Notification variant="error">
      Something went wrong. Try refreshing?
    </Notification>
  </>
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
  width: 18rem;
  padding: var(--space-1);
`;

export const NotificationsProvider = ({ children, ...props }) => {
  const [notifications, setNotifications] = React.useState([]);
  const removeNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  };
  
  const contextValue = React.useMemo(() => {
    const createNotification = (Component) => {
      const notification = { id: uniqueID('notification'), Component };
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    };

    const createErrorNotification = (message = 'Something went wrong. Try refreshing?') => {
      createNotification((props) => (
        <Notification lifetime="transient" aria-live="polite" {...props}>
          {message}
        </Notification>
      ));
    }

    return { createNotification, createErrorNotification };
  }, []);

  return (
    <>
      <Provider value={contextValue}>{children}</Provider>
      {notifications.length > 0 && (
        <NotificationsContainer data-module="NotificationsContainer" {...props}>
          {notifications.map(({ id, Component }) => (
            <Component key={id} onClose={() => removeNotification(id)} />
          ))}
        </NotificationsContainer>
      )}
    </>
  );
};

const useProgress = () => {
  const [value, setValue] = React.useState(0)
  const [cancelled, setCancelled] = React.useState(false)
  const cancel = () => setCancelled(true)
  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      if (cancelled || value === 100) return
      setValue((prev) => Math.min(100, prev + Math.random() * 10))
    })
    return () => window.clearTimeout(handle)
  }, [])
  
  return { value, cancel };
}

const UploadNotification = ({ onClose }) => {
  const { value, cancel } = useProgress()
  const cancelAndClose = () => {
    cancel()
    onClose()
  }
  
  if (value < 100) {
    return (
      <Notification aria-live="polite" lifetime="persistent" onClose={cancelAndClose}>
        <Progress value={value} max={100} style={{ display: 'inline-block', width: '4rem'}}>{value}%</Progress>
        &nbsp;
        Uploading…
      </Notification>
    )
  }
  
  return (
    <Notification aria-live="polite" lifetime="transient" onClose={onClose}>
      <Progress value={value} max={100} style={{ display: 'inline-block', width: '4rem'}}>{value}%</Progress>
      &nbsp;
      Uploaded!
    </Notification>
  )
}
const Content = () => {
  const { createNotification, createErrorNotification } = useNotifications()
  const createLoadingNotification = () => {
    createNotification(UploadNotification)
  }
  
  return (
    <>
      <Button onClick={() => createNotification(UploadNotification)}>Create Notification</Button>
      &nbsp;
      <Button 
        onClick={() => createNotification(
          <>
            <P>
              Added power-passenger to collection linen-collection
            </P>
            <LinkButton variant="secondary" size="tiny" href="https://glitch.com/@modernserf/linen-collection" rel="noopener noreferrer">
              Take me there
            </LinkButton>
          </>, 
          { variant: 'success', lifetime: 'persistent' }
        )}
      >
        Create Success Notification
      </Button>
      &nbsp;
      <Button onClick={() => createErrorNotification()}>Create Error Notification</Button>
    </>
  )
}

export const StoryNotificationsProvider = () => (
  <NotificationsProvider>
    <Content />
  </NotificationsProvider>
)
