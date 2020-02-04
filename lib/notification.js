import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { LiveAnnouncer, useLiveAnnouncer } from './live-announcer';
import { UnstyledButton, Button } from './button';
import { Icon } from './icon';
import { Progress } from './progress';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const variants = {
  notice: css`
    color: var(--colors-notice-text);
    background-color: var(--colors-notice-background);
  `,
  success: css`
    color: var(--colors-success-text);
    background-color: var(--colors-success-background);
  `,
  error: css`
    color: var(--colors-error-text);
    background-color: var(--colors-error-background);
  `,
  onboarding: css`
    color: #222;
    background-color: #bfe3ff;
  `,
};

const CloseButton = styled(UnstyledButton)`
  flex: 0 0 auto;
  font-size: var(--fontSizes-small);
  margin-bottom: -1rem;
`;

const closingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const NotificationBase = styled.aside`
  display: flex;
  align-items: flex-start;
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--space-2) var(--space-2);
  border-radius: var(--rounded);
  animation-duration: 0.1s;
  animation-iteration-count: 1;
  animation-direction: forward;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

  ${({ variant }) => variants[variant]}
  ${({ closing, timeout }) => {
    if (closing) {
      return css`
        animation-name: ${closingAnimation};
        animation-delay: 0;
        &:focus,
        &:hover {
          animation-name: ${closingAnimation};
        }
      `;
    }
    if (timeout > 0) {
      return css`
        animation-name: ${closingAnimation};
        animation-delay: ${timeout}ms;
        &:focus,
        &:hover {
          animation-name: none;
        }
      `;
    }
    return null;
  }}
  & + & {
    margin-top: var(--space-1);
  }
`;

const NotificationContent = styled.div`
  flex: 1 1 auto;
  margin-right: var(--space-1);
`;

export const Notification = ({ message, live, children, variant, timeout, onClose, ...props }) => {
  const ref = React.useRef();
  const [closing, setClosing] = React.useState(false);

  useLiveAnnouncer({ message: `${variant}: ${message}`, live });

  const handleAnimationEnd = (event) => {
    if (onClose && event.target === ref.current) onClose();
  };
  return (
    <NotificationBase
      ref={ref}
      data-module="Notification"
      variant={variant}
      closing={closing}
      timeout={timeout}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      <NotificationContent>{children || message}</NotificationContent>
      {onClose && (
        <CloseButton onClick={() => setClosing(true)} aria-label="Dismiss notification">
          <Icon icon="x" style={{ color: 'inherit' }} />
        </CloseButton>
      )}
    </NotificationBase>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  live: PropTypes.oneOf(['polite', 'assertive']),
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(variants)),
  timeout: PropTypes.number,
  onClose: PropTypes.func,
};

Notification.defaultProps = {
  variant: 'notice',
  live: 'polite',
  timeout: 0,
};

export const StoryNotification = () => (
  <>
    <p>The Notification component renders an accessible notification.</p>
    <CodeExample>{`<Notification variant="notice" message="Reconnecting…" />`}</CodeExample>
    <PropsDefinition>
      <Prop name="message" required>
        The text of the notification.
      </Prop>
      <Prop name="children">An optional rich-content version of the notification that can include formatting and interactive elements.</Prop>
      <Prop name="live">The aria-live behavior of the notification: "polite" or "assertive" (default "polite").</Prop>
      <Prop name="variant">The style of notification: "notice", "success", "error", "onboarding" (default "notice").</Prop>
      <Prop name="timeout">
        The time in milliseconds before the notification automatically fades out and calls its "onClose" prop. If no value is provided, the
        notification will not automatically close.
      </Prop>
      <Prop name="onClose">
        A callback function, called when the close button is clicked or the notification times out. This props is provided by the{' '}
        <code>createNotification</code> callback. If no value is provided, the notification will not render a close button.
      </Prop>
    </PropsDefinition>
    <p></p>
  </>
);

let currentID = 0;
const uniqueID = (prefix) => {
  currentID += 1;
  return `${prefix}-${currentID}`;
};

const NotificationContext = React.createContext();
export const NotificationsConsumer = NotificationContext.Consumer;
export const useNotifications = () => React.useContext(NotificationContext);

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: var(--z-notifications);
  top: 0;
  right: 0;
  max-width: 18rem;
  min-width: 12rem;
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
      return notification;
    };

    const createErrorNotification = (message = 'Something went wrong. Try refreshing?') => {
      return createNotification((props) => <Notification variant="error" timeout={2500} live="polite" message={message} {...props} />);
    };

    return { createNotification, createErrorNotification, removeNotification };
  }, []);

  return (
    <LiveAnnouncer>
      <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
      {notifications.length > 0 && (
        <NotificationsContainer data-module="NotificationsContainer" {...props}>
          {notifications.map(({ id, Component }) => (
            <Component key={id} onClose={() => removeNotification(id)} />
          ))}
        </NotificationsContainer>
      )}
    </LiveAnnouncer>
  );
};

const useProgressMock = () => {
  const [{ value }, setState] = React.useState({ value: 0, cancelled: false });
  const cancel = () => setState((prev) => ({ ...prev, cancelled: true }));
  React.useEffect(() => {
    let handle;
    const update = () => {
      setState((prev) => {
        if (prev.cancelled || prev.value >= 100) return prev;
        handle = window.setTimeout(update, 100);
        return {
          ...prev,
          value: Math.min(100, prev.value + Math.random() * 10),
        };
      });
    };
    update();
    return () => window.clearTimeout(handle);
  }, []);

  return { value, cancel };
};

const UploadNotification = ({ onClose }) => {
  const { value, cancel } = useProgressMock();
  const cancelAndClose = () => {
    cancel();
    onClose();
  };

  if (value < 100) {
    return (
      <Notification onClose={cancelAndClose} message="Uploading…">
        <Progress value={value} max={100} style={{ display: 'inline-block', width: '4rem' }}>
          {value}%
        </Progress>
        &nbsp; Uploading…
      </Notification>
    );
  }

  return (
    <Notification timeout={2500} onClose={onClose} message="Uploaded!">
      <Progress value={value} max={100} style={{ display: 'inline-block', width: '4rem' }}>
        {value}%
      </Progress>
      &nbsp; Uploaded!
    </Notification>
  );
};

const Content = () => {
  const { createNotification, createErrorNotification, removeNotification } = useNotifications();
  const [lastNotificationId, setLastNotificationId] = React.useState(null);

  return (
    <>
      <Button
        onClick={() => {
          const notification = createNotification(UploadNotification);
          setLastNotificationId(notification.id);
        }}
      >
        Create Notification
      </Button>
      &nbsp;
      <Button
        onClick={() => {
          const notification = createNotification((props) => (
            <Notification variant="success" {...props} message="Added power-passenger to collection linen-collection">
              <p style={{ marginTop: 0 }}>Added power-passenger to collection linen-collection</p>
              <Button as="a" variant="secondary" size="tiny" href="https://glitch.com/@modernserf/linen-collection" rel="noopener noreferrer">
                Take me there
              </Button>
            </Notification>
          ));
          setLastNotificationId(notification.id);
        }}
      >
        Create Success Notification
      </Button>
      &nbsp;
      <Button
        onClick={() => {
          const notification = createErrorNotification();
          setLastNotificationId(notification.id);
        }}
      >
        Create Error Notification
      </Button>
      &nbsp;
      <Button
        onClick={() => {
          const notification = createNotification((props) => (
            <Notification variant="onboarding" {...props} message="Create an account to keep this project and edit it anywhere.">
              <p style={{ marginTop: 0 }}>
                <strong>Create an account</strong> to keep this project, and edit it anywhere.
              </p>
              <Button as="a" href="/signup" variant="cta" size="small">
                Create an Account
              </Button>
              &nbsp;
              <Button size="small" onClick={props.onClose}>
                Hide
              </Button>
            </Notification>
          ));
          setLastNotificationId(notification.id);
        }}
      >
        Create Onboarding Notification
      </Button>
      <Button
        onClick={() => {
          removeNotification(lastNotificationId);
          setLastNotificationId(null);
        }}
        disabled={!lastNotificationId}
      >
        Remove Last Notification
      </Button>
    </>
  );
};

export const StoryNotificationsProvider_and_useNotifications = () => (
  <>
    <p>The NotificationsProvider component renders a floating container for notifications, and provides a context for creating notifications.</p>
    <CodeExample>{`<NotificationsProvider />`}</CodeExample>
    <p>The context provides an object with the properties "createNotification" and "createErrorNotification".</p>
    <CodeExample>{code`
      const { createNotification, createErrorNotification } = useNotifications()
      
      createNotification((props) => (
        <Notification 
          variant="success" 
          message="Added power-passenger to collection linen-collection" 
          {...props}
        >
          <p>Added power-passenger to collection linen-collection</p>
          <Button as="a" variant="secondary" size="tiny" href="/@modernserf/linen-collection">
            Take me there
          </Button>
        </Notification>
      )

      createErrorNotification('Something went wrong. Try refreshing?')
    `}</CodeExample>
    <h3>context props</h3>
    <dl>
      <dt>createNotification</dt>
      <dd>A function that takes a component or render prop that renders a notification, and displays it in the floating notification container.</dd>
      <dt>createErrorNotification</dt>
      <dd>A function that takes an error message, and displays it as a transient error notification in the floating notification container.</dd>
    </dl>
    <NotificationsProvider>
      <Content />
    </NotificationsProvider>
  </>
);
