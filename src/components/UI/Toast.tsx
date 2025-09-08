import React from 'react';

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => (
  <div className={`fixed top-6 right-6 px-4 py-2 rounded shadow-lg text-white z-50 transition duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
    {message}
    <button className="ml-4 text-white font-bold" onClick={onClose}>×</button>
  </div>
);

export default Toast;