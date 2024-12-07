import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './CustomerChatBox.scss';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const socket = io.connect('http://localhost:3000');

const CustomerChatBox = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const customerId = useSelector((state) => state.account.account.userId); // Get customerId from Redux store

    useEffect(() => {
        // Load messages from localStorage
        const savedMessages = localStorage.getItem(`chatMessages_${customerId}`);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        // Join the customer's chat channel
        socket.emit('joinCustomer', customerId);

        // Listen for messages from admin
        socket.on('receiveMessageFromAdmin', ({ message }) => {
            setMessages((prevMessages) => {
                const updatedMessages = [{ sender: 'Admin', message }, ...prevMessages];
                // Save updated messages to localStorage
                localStorage.setItem(`chatMessages_${customerId}`, JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        return () => {
            socket.off('receiveMessageFromAdmin');
        };
    }, [customerId]); // Run again if customerId changes

    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessageToAdmin', { customerId, message });
            setMessages((prevMessages) => {
                const updatedMessages = [{ sender: 'You', message }, ...prevMessages];
                // Save updated messages to localStorage
                localStorage.setItem(`chatMessages_${customerId}`, JSON.stringify(updatedMessages));
                return updatedMessages;
            });
            setMessage(''); // Clear input field
        }
    };

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev); // Toggle chat open/close
    };

    return (
        <div className="customer-chat-box">
            <div className="customer-chat-box-container">
                <div className="chat-icon" onClick={toggleChat}>
                    <ChatIcon />
                </div>
                {isChatOpen && (
                    <div className="chat-box">
                        <div className="header-chat-box">
                            <div className="name">Chat với người hỗ trợ</div>
                            <div className="avatar">
                                <Avatar />  
                            </div>
                        </div>
                        <div className="message-detail">
                            <div className="message-detail-container">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender === 'You' ? 'message-you' : 'message-admin'}`}>
                                        <strong> </strong>{msg.message}
                                    </div>
                                ))}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                />
                                <button onClick={sendMessage}>Gửi</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerChatBox;