import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_CONTACT_SUBMISSION } from '../utils/mutations';
import { useParams } from 'react-router-dom';

const Confirm = () => {
  const { token } = useParams();
  const [confirmContactSubmission, { data, loading, error }] = useMutation(CONFIRM_CONTACT_SUBMISSION);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    fetch(`/api/confirm?token=${token}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Invalid token! status: ${response.status}`);
        } 
        return response.json();
      })
      .then(token => {
        console.log(token);
      })
      .catch(error => {
        console.error(`Fetch error:`, error);
      });
    
    if (token) {
      confirmContactSubmission({ variables: { token } });
    }
  }, [token]);

  if (loading) return <p>🔒 Verifying your message...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data ? 'Email confirmed! Thanks for your message.' : 'Waiting for confirmation...'}</p>;
};

export default Confirm;
