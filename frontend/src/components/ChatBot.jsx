import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Initialize Gemini API
  // Replace 'YOUR_GEMINI_API_KEY' with your actual key from Google AI Studio
  const genAI = new GoogleGenerativeAI("AIzaSyA7IQKjtWyde7x9xYTzcLoBbeLXeY-30wI");
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen && messages.length === 0) {
  //     setMessages([{
  //       id: 1,
  //       text: "Hello! I'm your Hospital Queue Management Assistant. How can I help you today?",
  //       sender: 'bot',
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     }]);
  //   }
  // }, [isOpen, messages.length]);

  // 2. Updated API Call Logic
  const callGeminiAPI = async (userMessage) => {
    try {
      const prompt = `
      You are a Hospital Queue Management Assistant. You  provide information related to hospital services, doctors, patients, and appointments.
      
      User query: ${userMessage}
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
  
      // Return error message to display in chat
      return `Error from Gemini API: ${error.message || error}`;
    }
  };
  

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsgText = inputMessage;
    const userMessage = {
      id: Date.now(),
      text: userMsgText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const botResponseText = await callGeminiAPI(userMsgText);

    const botMessage = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '380px',
          height: '500px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1000,
          fontFamily: "'Inter', sans-serif"
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <span>H</span>
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1rem', fontWeight: 600 }}>
                  Hospital Assistant
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: '#fcfcfc'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex',
                gap: '0.75rem',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                maxWidth: '85%'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: msg.sender === 'bot' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#e2e8f0',
                  color: msg.sender === 'bot' ? 'white' : '#475569',
                  fontSize: '0.8rem',
                  flexShrink: 0
                }}>
                  {msg.sender === 'bot' ? 'H' : 'U'}
                </div>
                <div style={{
                  background: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                  color: msg.sender === 'user' ? 'white' : '#1e293b',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none'
                }}>
                  <p style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    {msg.text}
                  </p>
                  <div style={{
                    fontSize: '0.7rem',
                    color: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : '#94a3b8',
                    textAlign: 'right',
                    marginTop: '0.5rem'
                  }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>H</div>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div className="dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                    <div className="dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.2s ease-in-out both' }}></div>
                    <div className="dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.4s ease-in-out both' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '0.5rem 0.75rem'
            }}>
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about queues or doctors..."
                rows="1"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  resize: 'none',
                  fontSize: '0.9rem',
                  padding: '0.5rem 0',
                  maxHeight: '100px'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                style={{
                  background: '#2563eb',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: (inputMessage.trim() && !isTyping) ? 'pointer' : 'not-allowed',
                  opacity: (inputMessage.trim() && !isTyping) ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </>
  );
};

export default ChatBot;