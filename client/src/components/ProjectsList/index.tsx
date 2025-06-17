import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_PROJECT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface ProjectsListProps {
  projects?: string[];
  isLoggedInUser: boolean;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects = [], isLoggedInUser }) => {
  const [removeProject, { error }] = useMutation
  (REMOVE_PROJECT, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemoveProject = async (project: any) => {
    try {
      await removeProject({
        variables: { project },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {projects &&
          projects.map((project) => (
            <div key={project} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{project}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveProject(project)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default ProjectsList;
