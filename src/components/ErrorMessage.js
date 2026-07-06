
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="error-close">×</button>
      )}
    </div>
  );
};

export default ErrorMessage;
