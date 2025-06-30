// client/src/pages/Confirm.tsx
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_CONTACT_SUBMISSION } from '../utils/mutations';
import { useSearchParams } from 'react-router-dom';

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const [confirmContactSubmission] = useMutation(CONFIRM_CONTACT_SUBMISSION);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      confirmContactSubmission({ variables: { token } });
    }
  }, []);

  return <p>🔒 Verifying your message...</p>;
};

export default Confirm;
