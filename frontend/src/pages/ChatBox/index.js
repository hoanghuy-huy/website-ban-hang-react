    import React, { useEffect, useState } from 'react';
    import io from 'socket.io-client';

    const socket = io.connect('http://localhost:3000'); // Địa chỉ server của bạn

    const CustomerChat = ({ customerId }) => {
        const [message, setMessage] = useState('');
        const [messages, setMessages] = useState([]);
        customerId = 2
        useEffect(() => {
            // Tham gia kênh chat của khách hàng
            socket.emit('joinCustomer', customerId);

            // Lắng nghe tin nhắn từ admin
            socket.on('receiveMessageFromAdmin', ({ message }) => {
                setMessages((prevMessages) => [...prevMessages, { sender: 'Admin', message }]);
            });

            return () => {
                socket.off('receiveMessageFromAdmin');
            };
        }, [customerId]);

        const sendMessage = () => {
            if (message) {
                socket.emit('sendMessageToAdmin', { customerId, message });
                setMessages((prevMessages) => [...prevMessages, { sender: 'You', message }]);
                setMessage('');
            }
        };

        return (
            <div className="chat-container">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={sendMessage}>Gửi</button>
            </div>
        );
    };

    export default CustomerChat;