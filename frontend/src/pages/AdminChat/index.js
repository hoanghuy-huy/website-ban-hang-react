import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // Make sure to install axios if you haven't already
import './AdminChat.scss';

const socket = io.connect('http://localhost:3000');

const AdminChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [activeCustomerId, setActiveCustomerId] = useState('');
    const [customerNames, setCustomerNames] = useState({}); // State for storing customer names

    useEffect(() => {
        // Load messages from localStorage when the component mounts
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        socket.on('receiveMessageFromCustomer', ({ customerId, message }) => {
            setMessages((prevMessages) => {
                const updatedMessages = {
                    ...prevMessages,
                    [customerId]: [...(prevMessages[customerId] || []), { sender: `Customer ${customerId}`, message }],
                };
                // Save updated messages to localStorage
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        return () => {
            socket.off('receiveMessageFromCustomer');
        };
    }, []);

    useEffect(() => {
        const fetchCustomerNames = async () => {
            const customerIds = Object.keys(messages);
            if (customerIds.length > 0) {
                try {
                    const response = await axios.post('http://your-api-endpoint/getCustomerNames', {
                        ids: customerIds,
                    });
                    const names = response.data; // Assuming response is an object { id: name }
                    setCustomerNames(names);
                } catch (error) {
                    console.error('Error fetching customer names:', error);
                }
            }
        };

        fetchCustomerNames();
    }, [messages]); // Fetch names whenever messages change

    const sendMessage = () => {
        if (message.trim() && activeCustomerId) {
            socket.emit('sendMessageToCustomer', { customerId: activeCustomerId, message });
            setMessages((prevMessages) => {
                const updatedMessages = {
                    ...prevMessages,
                    [activeCustomerId]: [...(prevMessages[activeCustomerId] || []), { sender: 'Admin', message }],
                };
                // Save updated messages to localStorage
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
            setMessage('');
        }
    };

    const handleCustomerSelect = (id) => {
        setActiveCustomerId(id);
    };

    return (
        <div className="admin-chat">
            <div className="customer-list">
                {Object.keys(messages).length > 0 ? (
                    Object.keys(messages).map((id) => (
                        <div
                            key={id}
                            className={`customer-item ${activeCustomerId === id ? 'active' : ''}`}
                            onClick={() => handleCustomerSelect(id)}
                        >
                            {`Khách hàng có id ${id}`}
                            {/* Display customer name or loading */}
                        </div>
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        Không có tin nhắn từ khách hàng
                    </div>
                )}
            </div>

            {activeCustomerId && (
                <div className="chat-area">
                    <div className="messages">
                        {messages[activeCustomerId] &&
                            messages[activeCustomerId].map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${
                                        msg.sender === 'Admin' ? 'admin-message' : 'customer-message'
                                    }`}
                                >
                                    <div className="message-content">
                                        <strong></strong> {msg.message}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminChat;
