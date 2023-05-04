import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createJob, { data: data1, error, loading }] = useMutation(gql`
    mutation CreateJob($input: CreateJobInput!) {
      createJob(input: $input) {
        id
      }
    }
  `);
  const HandleSubmit = async (event) => {
    event.preventDefault();
    createJob({
      variables: {
        input: {
          title,
          description,
        },
      },
    });
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={HandleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
