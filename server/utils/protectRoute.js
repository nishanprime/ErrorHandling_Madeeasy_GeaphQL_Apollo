import { GraphQLError } from 'graphql';
import { decodeToken, verifyToken } from './jwt.js';
const protect = (parent, args, context, info) => {
  const { request } = context;
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith('Bearer')
  ) {
    return new GraphQLError('Not authorized', {
      extensions: {
        code: 'UNAUTHENTICATED',
        statusCode: 401,
      },
    });
  }
  // now that we know the token is present, we can verify it
  const token = request.headers.authorization.split(' ')[1];
  console.log(token);

  // const decoded =
  try {
    verifyToken(token);
  } catch (error) {
    return new GraphQLError('Not authorized', {
      extensions: {
        code: 'Tampered token',
        statusCode: 401,
      },
    });
  }
  context.user = decodeToken(token);
};

const permissions = (parent, args, context, info) => {
  const { user } = context;

  if (user.email !== 'thapanishan9@gmail.com') {
    return new GraphQLError('Only nishan is allowed', {
      extensions: {
        code: 'UNAUTHENTICATED',
        statusCode: 401,
      },
    });
  }
};

export { protect, permissions };
