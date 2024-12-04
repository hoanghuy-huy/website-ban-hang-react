import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000'); // Địa chỉ server của bạn

const AdminChat = () => {
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({}); // Lưu trữ tin nhắn theo customerId

    useEffect(() => {
        // Lắng nghe tin nhắn từ khách hàng
        socket.on('receiveMessageFromCustomer', ({ customerId, message }) => {
            setMessages((prevMessages) => ({
                ...prevMessages,
                [customerId]: [...(prevMessages[customerId] || []), { sender: `Customer ${customerId}`, message }],
            }));
        });

        return () => {
            socket.off('receiveMessageFromCustomer');
        };
    }, []);

    const sendMessage = () => {
        if (message && customerId) {
            socket.emit('sendMessageToCustomer', { customerId, message });
            setMessages((prevMessages) => ({
                ...prevMessages,
                [customerId]: [...(prevMessages[customerId] || []), { sender: 'Admin', message }],
            }));
            setMessage('');
        }
    };

    return (
        <div className="admin-chat">
            <h2>Admin Chat</h2>
            <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Nhập ID khách hàng..."
            />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>

            <div className="messages">
                {messages[customerId] && messages[customerId].map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminChat;