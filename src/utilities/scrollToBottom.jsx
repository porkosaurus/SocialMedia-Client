import React, { useEffect, useRef } from 'react';

function ScrollToBottom({ messages }) {
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return <div ref={messagesContainerRef} className="message-container" />;
}

export default ScrollToBottom;
