import { useState, useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';

export const useDataLoader = (loadingFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await loadingFunction(...args);
      return result;
    } catch (err) {
      setError(err);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [loadingFunction, showNotification]);

  return { loading, error, execute };
}; 