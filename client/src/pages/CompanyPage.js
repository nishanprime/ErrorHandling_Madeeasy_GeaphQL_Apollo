import { useParams } from 'react-router';
import { GET_COMPANY } from '../lib/graphql/queries';

function CompanyPage() {
  const { companyId } = useParams();
  const { loading, error, data } = GET_COMPANY(companyId);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const company = data.company;
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      {company.jobs.length > 0 ? (
        <div>
          <h1>Jobs</h1>
          {company.jobs.map((job) => (
            <div key={job.id}>
              <h1>{job.title}</h1>
              <p>{job.description}</p>
              <br></br>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs posted yet for this company</p>
      )}
    </div>
  );
}

export default CompanyPage;
