import React from 'react'
import { VisuallyHidden } from './visually-hidden'

const LiveAnnouncerContext = React.createContext()

const MessageBlock = ({ live, message = "" }) => (
  <div role="log" aria-relevant="additions" aria-atomic="true" aria-live={live}>
    {message}
  </div>
)

const MessageRelay = ({ live, message }) => {
  const [toggled, setToggled] = React.useState(false)
  React.useEffect(() => {
    setToggled((value) => !value) 
  }, [message])
  
  return (
    <>
      <MessageBlock live={live} message={toggled ? message : ""} />
      <MessageBlock live={live} message={toggled ? "" : message} />
    </>
  )
}

const LiveAnnouncer = ({ children }) => {
  const [politeMessage, announcePolite] = React.useState('')
  const [assertiveMessage, announceAssertive] = React.useState('')
  
  const contextValue = React.useMemo(() => ({ announcePolite, announceAssertive }), [])
  
  return (
    <>
      <LiveAnnouncerContext value={contextValue}>{children}</LiveAnnouncerContext>
      <VisuallyHidden>
      
      </VisuallyHidden>
    </>
  )
}
