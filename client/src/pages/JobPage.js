import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { GET_JOB } from '../lib/graphql/queries';
import { handleError } from '../utils/response.handler';

function JobPage() {
  const { jobId } = useParams();
  const { loading, error, data } = GET_JOB(jobId);
  console.log(error);
  if (loading) return <p>Loading...</p>;
  if (error) {
    handleError(error.message);
    return (
      <button>
        <a href="/login">Login</a>
      </button>
    );
  }
  const job = data.job;

  return (
    <div>
      <h1 className="title is-2">{job.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job.date, 'long')}
        </div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
