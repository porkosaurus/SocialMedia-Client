import { io }  from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './message.scss'
import React from 'react'
import ScrollToBottom from '../../utilities/scrollToBottom';

const Message = () => {
  console.log('Message component rendering...');
  const { username: initialUsername } = useParams();
  const [username, setUsername] = useState(initialUsername);
    const isAuthenticated = localStorage.getItem("socialMedia.username")
    const storedUsername = localStorage.getItem("socialMedia.isAuthenticated")
    console.log(storedUsername)
    console.log(username)
    const [message, setMessage] = useState('default');
    const [combinedMessages, setCombinedMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [senderData, setSenderData] = useState(null);
    const [receiverData, setReceiverData] = useState(null);
    const [userIdsWithMessages, setUserIdsWithMessages] = useState([]);
      const [userNamesWithMessages, setUserNamesWithMessages] = useState([]);
      const [lastMessages, setLastMessages] = useState({});
      const [userIdsLists, setUserIdsLists] = useState([]);
      const[everyMessage, setEveryMessage] = useState([]);
      const [userProfilesWithMessages, setUserProfilesWithMessages] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');

      const filteredUserNames = userNamesWithMessages.filter((userName) =>
      userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
      

      const handleDmsClick = (newUsername) => {
        setUsername(newUsername);
      };

      useEffect(() => {
        const fetchAllMessages = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/messages/${storedUsername}`);
            if (response.ok) {
              const messages = await response.json();
              setEveryMessage(messages);
            }
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        };
      
        fetchAllMessages();
      }, [storedUsername, username]);
      

      
const findLastMessageForUser = (userId) => {
  console.log("this is every message",everyMessage)
  const userMessages = everyMessage.filter(
    (msg) => msg.sender === userId || msg.receiver === userId
  );
    console.log(userMessages)
  if (userMessages.length > 0) {
    const sortedMessages = [...userMessages].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const lastMessage = sortedMessages[0].message;

    return lastMessage;
  }

  return 'No messages';
};
      
    
const fetchUserDataById = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/userId/${userId}`);
    if (response.ok) {
      const userData = await response.json();
      return userData;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  return null;
};


    const combineAndSortMessages = () => {
      if (senderData && receiverData) {
        const senderMessages = senderData.sentMessages || [];
        const receiverMessages = senderData.receivedMessages || [];

        console.log("Sender messages:",senderMessages)
    
        const sentMessagesForReceiver = senderMessages.filter(message => message.receiver === receiverData._id);
        const receivedMessagesForSender = receiverMessages.filter(message => message.sender === receiverData._id);
    
        const allMessages = [
          ...sentMessagesForReceiver.map(message => ({ type: 'sent', _id: message._id, message: message.message, timestamp: message.timestamp, senderId: message.sender, receiverId: message.receiver })),
          ...receivedMessagesForSender.map(message => ({ type: 'received', _id: message._id, message: message.message, timestamp: message.timestamp, senderId: message.sender, receiverId: message.receiver }))
        ];
    
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return allMessages;
      }
      return [];
    };
    

    
    useEffect(() => {
      console.log('useEffect is running...');
      
      try {
        // Make an API request to retrieve user data for sender and receiver
        const fetchSenderData = fetch(`http://localhost:8000/api/user/${storedUsername}`);
        const fetchReceiverData = fetch(`http://localhost:8000/api/user/${username}`);
    
        Promise.all([fetchSenderData, fetchReceiverData])
          .then(([senderResponse, receiverResponse]) => Promise.all([senderResponse.json(), receiverResponse.json()]))
          .then(([senderData, receiverData]) => {
            setSenderData(senderData);
            setReceiverData(receiverData);
    
            // Collect the unique IDs of users the sender has messaged with
            const senderMessages = senderData.sentMessages || [];
            const receiverMessages = senderData.receivedMessages || [];
            const userIds = [
              ...new Set([
                ...senderMessages.map(message => message.receiver),
                ...receiverMessages.map(message => message.sender),
              ]),
            ];
    
            setUserIdsWithMessages(userIds);
    
                // Fetch user data for each user ID and store it in userNamesWithMessages
                Promise.all(userIds.map(fetchUserDataById))
                .then((userList) => {
                  setUserNamesWithMessages(userList.map(user => user.username)); // Store usernames
                  setUserProfilesWithMessages(userList.map(user => user.profilePictureUrl)); // Store profile picture URLs
                  console.log("Profile pictures",userProfilesWithMessages)
                  // Set user IDs with messages and last messages
                  setUserIdsWithMessages(userIds);
                  setUserIdsLists(userIds);


                });
              
            function chatMessageHandler(receivedMessage) {
              console.log('Received Chat Message:', receivedMessage);
    
              // Determine the type of the message based on the senderId
              const messageType = receivedMessage.sender === senderData._id ? 'sent' : 'received';
    
              // Format the received message to be displayed consistently
              const formattedReceivedMessage = {
                _id: receivedMessage._id,
                senderId: receivedMessage.sender,
                receiverId: receivedMessage.receiver,
                message: receivedMessage.message,
                timestamp: receivedMessage.timestamp,
                type: messageType,
              };
              console.log(formattedReceivedMessage.senderId)
              // Update the combined messages state
              setCombinedMessages((prevCombinedMessages) => [...prevCombinedMessages, formattedReceivedMessage]);
              console.log(combinedMessages)
            }
    
            // Create socket connection with the appropriate room
            try {
              console.log('Attempting to create socket connection...');
              const newSocket = io('http://localhost:8000');
              console.log('Socket created:', newSocket);
              setSocket(newSocket);
              const roomIdentifier = [receiverData._id, senderData._id].sort().join('-');
              console.log(roomIdentifier);
    
              newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
              });
    
              newSocket.emit('joinRoom', roomIdentifier);
    
              newSocket.on('chatMessage', chatMessageHandler);
    
              return () => {
                // Clean up the socket connection when the component unmounts
                newSocket.off('chatMessage', chatMessageHandler);
                newSocket.off('joinRoom', roomIdentifier);
    
                console.log('Disconnecting socket...');
                newSocket.disconnect();
              };
            } catch (socketError) {
              console.error('Error creating socket connection:', socketError);
            }
          })
          .catch(fetchError => {
            console.error('Error fetching user data:', fetchError);
          });
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    }, [username]);
    
    
    const handleSubmit = (event) => {
      try {
        console.log(senderData);
        event.preventDefault();
        if (message.trim() !== '' && socket) {
          const messageObject = {
            senderId: senderData._id,         // Assuming senderData contains the sender's ID
            receiverId: receiverData._id,     // Assuming receiverData contains the receiver's ID
            message: message
          };
          
          socket.emit('chatMessage', messageObject); // Send the message object
          console.log('Form submitted with message:', messageObject);
          setMessage('');
        }
      } catch (error) {
        console.error('Error in handleSubmit:', error);
      }
    };
    
    useEffect(() => {
      const lastMessagesData = {};
      userIdsLists.forEach((userId) => {
        lastMessagesData[userId] = findLastMessageForUser(userId);
      });
      setLastMessages(lastMessagesData);
    }, [userIdsLists, everyMessage]);
    


    useEffect(() => {
      console.log('senderData:', senderData);
      console.log('receiverData:', receiverData);
  
      setCombinedMessages(combineAndSortMessages());
    }, [senderData, receiverData]);
  
  

    

  return (
    <>
    <div className='message-page-container'>
    <div className="dms-container">
    <h1 className="dms-header">Chats</h1>
    <input
      type="text"
      placeholder="Search chats..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="dms-search-input"
    />
    {filteredUserNames.map((userName, index) => {
      // Find the index of the current user in userNamesWithMessages
      const userIndex = userNamesWithMessages.indexOf(userName);
      const profilePictureUrl = userProfilesWithMessages[userIndex];

      return (
        <div
          key={index}
          className="dms-individual"
          onClick={() => handleDmsClick(userName)}
        >
          <div className="dms-profile-picture">
            <img
              className="dms-picture"
              src={profilePictureUrl}
              alt={`${userName}'s Profile`}
            />
          </div>
          <div className="dms-chats-container">
            <div className="dms-username">{userName}</div>
            <div className="dms-last-message">
              {lastMessages[userIdsWithMessages[userIndex]]}
            </div>
          </div>
        </div>
      );
    })}
  </div>

    <div className='convo-container'>
    {receiverData &&     
    <div className='profile-container'>
    <div className='display-info'>
    <div className='message-image' style={{backgroundImage: `url(${receiverData.profilePictureUrl})`}}></div>
    <h1 className='message-username'>{receiverData.username}</h1>
    </div>
    <div className='call-container'>
    <i class="fa-solid fa-phone"></i>
    <i class="fa-solid fa-video"></i>
    </div>
    </div>

    }
        <div className="message-container">
      {combinedMessages.map((msg, index) => (
        <div key={index} className={`message ${msg.type === 'sent' ? 'sent' : 'received'}`}>
            <p className={`message-content ${msg.type === 'sent' ? 'sent' : 'received'}`}>{msg.message}</p>
        </div>
      ))}
    </div>

    <div className='send-message-container'>

    <form  onSubmit={handleSubmit}  className="message-form">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-input"
      />
    <button type="submit" className="send-button">
      <i class="fa-solid fa-reply"></i>
    </button>
    </form>
    </div>
        </div>
    </div>
    </>
  )
}

export default Message