import {
  ApolloClient,
  InMemoryCache,
  gql,
  useMutation,
  useQuery,
} from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

export const GET_JOBS = () => {
  return useQuery(
    gql`
      query Jobs {
        jobs {
          id
          title
          description
          date
          company {
            id
            name
            description
          }
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`,
        },
      },
    }
  );
};

export const GET_JOB = (id) => {
  return useQuery(
    gql`
      query Job($jobId: ID!) {
        job(id: $jobId) {
          id
          title
          description
          date
          company {
            id
            name
            description
          }
        }
      }
    `,

    {
      variables: {
        jobId: id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`,
        },
      },
    }
  );
};

export const GET_COMPANY = (id) => {
  return useQuery(
    gql`
      query Company($companyId: ID!) {
        company(id: $companyId) {
          id
          name
          description
          jobs {
            id
            title
            description
          }
        }
      }
    `,
    {
      variables: {
        companyId: id,
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN_KEY')}`,
        },
      },
    }
  );
};

// mutations

export const CREATE_JOB = () => {
  return gql`
    mutation CreateJob($input: CreateJobInput!) {
      createJob(input: $input) {
        id
      }
    }
  `;
};

// export const CREATE_JOB_MUTATION = gql`
//   mutation CreateJob($input: CreateJobInput!) {
//     createJob(input: $input) {
//       id
//     }
//   }
// `;

// export const createJob = (title, description) => {
//   return {
//     mutation: CREATE_JOB_MUTATION,
//     variables: {
//       input: {
//         title,
//         description,
//       },
//     },
//   };
// };

export default client;
