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
    const customerId = useSelector((state) => state.account.account.userId); // Lấy customerId từ Redux store

    useEffect(() => {
        // Tham gia kênh chat của khách hàng
        socket.emit('joinCustomer', customerId);

        // Lắng nghe tin nhắn từ admin
        socket.on('receiveMessageFromAdmin', ({ message }) => {
            setMessages((prevMessages) => [
                { sender: 'Admin', message },
                ...prevMessages
            ]);
        });

        return () => {
            socket.off('receiveMessageFromAdmin');
        };
    }, [customerId]); // Chỉ chạy lại khi customerId thay đổi

    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessageToAdmin', { customerId, message });
            setMessages((prevMessages) => [
                { sender: 'You', message },
                ...prevMessages
            ]);
            setMessage(''); // Đặt lại trường nhập
        }
    };

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev); // Cập nhật trạng thái mở/đóng chat
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
                                        <strong>{msg.sender}: </strong>{msg.message}
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