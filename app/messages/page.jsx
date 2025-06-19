'use client';

import { useState, useEffect } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [gonderenId, setGonderenId] = useState(1);
  const [aliciId, setAliciId] = useState(2);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/mesajlar/alici/${aliciId}`);
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        alert(data.mesaj || 'Mesajlar alınırken bir hata oluştu.');
      }
    };
    fetchMessages();
  }, [aliciId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      alert('Mesaj boş olamaz.');
      return;
    }

    try {
      const res = await fetch('/api/mesajlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gonderenId, aliciId, mesaj: newMessage }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.mesaj);
        const refresh = await fetch(`/api/mesajlar/alici/${aliciId}`);
        const updated = await refresh.json();
        setMessages(updated.messages);
        setNewMessage('');
      } else {
        alert(data.mesaj || 'Mesaj gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error(error);
      alert('Mesaj gönderilirken hata oluştu.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mesajlar</h2>

      <div className="space-y-4 mb-6">
        {messages.map((message, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">
              <strong>{message.gonderen.ad}:</strong> {message.mesaj}
            </p>
            <small className="text-gray-500 text-sm">
              {new Date(message.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Mesajınızı yazın"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
