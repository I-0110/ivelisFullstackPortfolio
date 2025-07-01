import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_CONTACT_SUBMISSION } from '../utils/mutations';
import { useParams } from 'react-router-dom';

const Confirm = () => {
  const { token } = useParams();
  const [confirmContactSubmission, { data, loading, error }] = useMutation(CONFIRM_CONTACT_SUBMISSION);

  useEffect(() => {
    if (token) {
      confirmContactSubmission({ variables: { token } });
    }
  }, [token]);

  if (loading) return <p>🔒 Verifying your message...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data ? 'Email confirmed! Thanks for your message.' : 'Waiting for confirmation...'}</p>;
};

export default Confirm;
