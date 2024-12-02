import React, { useState } from 'react';
import {CallChatGptAsync }from './ChatGpt';


const ChatGptComponent = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const chatgpt = async  () => {
        try {
            const response = await CallChatGptAsync(input);
            setOutput(response || 'No response received');
        } catch (err) {
            setError('Failed to fetch response from ChatGPT');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }

    };


    return (
        <div style={{maxWidth: '600px', padding: '20px'}}>
            <h2>ChatGPT Interaction</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your prompt"
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                }}
            />
            <button
                onClick={chatgpt}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
            {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
            {output && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                >
                    <strong>Response:</strong>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );

};

export default ChatGptComponent;