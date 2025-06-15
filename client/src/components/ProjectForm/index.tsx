import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../../utils/mutations';

import Auth from '../../utils/auth';

interface ProjectFormProps {
  userId: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ userId }) => {
  const [project, setProject] = useState('');

  const [addProject, { error }] = useMutation(ADD_PROJECT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addProject({
        variables: { userId, project },
      });

      setProject('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Endorse some more projects below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              value={project}
              placeholder="Endorse some projects..."
              className="form-input w-100"
              onChange={(event) => setProject(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button 
              className="btn btn-info btn-block py-3" 
              type="submit"
              disabled={!project.trim()}
              >
              Endorse Project
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse projects. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>
  );
};

export default ProjectForm;
