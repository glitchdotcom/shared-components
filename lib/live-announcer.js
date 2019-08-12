import React from 'react'
import { VisuallyHidden } from './visually-hidden'

// see https://almerosteyn.com/2017/09/aria-live-regions-in-react

const LiveAnnouncerContext = React.createContext()
export const LiveAnnouncerConsumer = LiveAnnouncerContext.Consumer
export const useLiveAnnouncer = () => React.useContext(LiveAnnouncerContext)

const MessageBlock = ({ live, message = "" }) => (
  <div role="log" aria-relevant="additions" aria-atomic="true" aria-live={live}>
    {message}
  </div>
)

const MessageRelay = ({ live, message }) => {
  const [counter, setCounter] = React.useState(0)
  const isOdd = counter & 1
  React.useEffect(() => {
    setCounter((value) => value + 1) 
  }, [message])
  
  return (
    <>
      <MessageBlock live={live} message={isOdd ? message : ""} />
      <MessageBlock live={live} message={isOdd ? "" : message} />
    </>
  )
}

export const LiveAnnouncer = ({ children }) => {
  const [politeMessage, announcePolite] = React.useState('')
  const [assertiveMessage, announceAssertive] = React.useState('')
  
  const contextValue = React.useCallback(({ message, live }) => {
    if (live === 'polite') announcePolite(message)
    if (live === 'assertive') announceAssertive(message)
  }, [])
  
  return (
    <>
      <VisuallyHidden>
        <MessageRelay live="polite" message={politeMessage} />
        <MessageRelay live="assertive" message={assertiveMessage} />
      </VisuallyHidden>
      <LiveAnnouncerContext value={contextValue}>{children}</LiveAnnouncerContext>
    </>
  )
}
