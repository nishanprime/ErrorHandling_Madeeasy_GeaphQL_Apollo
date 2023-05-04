import JobList from '../components/JobList';
import { GET_JOBS } from '../lib/graphql/queries';
import { handleGraphQLError } from '../utils/response.handler.js';

function HomePage() {
  const { loading, error, data } = GET_JOBS();
  console.log(error);
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{JSON.stringify(error.graphQLErrors[0].message)}</p>;
  if (error) {
    handleGraphQLError(error);
    return (
      <button>
        <a href="/login">Login</a>
      </button>
    );
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={data.jobs} />
    </div>
  );
}

export default HomePage;
