import React from 'react'

const LiveAnnouncerContext = React.createContext()

const LiveAnnouncer = () => {
  const [politeMessage, setPoliteMessage] = React.useState('')
  const [assertiveMessage, setAssertiveMessage] = React.useState('')
  
  const contextValue = React.useMemo(() => ({
    
  }), [])
}
