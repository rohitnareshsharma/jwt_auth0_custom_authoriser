import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import util from 'util';

const getPolicyDocument = (effect, resource) => {
    const policyDocument = {
        Version: '2012-10-17', // default version
        Statement: [
            {
                Action: 'execute-api:Invoke', // default action
                Effect: effect,
                Resource: resource,
            },
        ],
    };
    return policyDocument;
};

// Extract and return the Bearer Token from the Lambda event parameters
const getToken = (event) => {
    if (!event.type || event.type !== 'REQUEST') {
        throw new Error('Expected "event.type" parameter to have value "TOKEN"');
    }

    let tokenString = event.headers.authorization;
    if (!tokenString) {
        throw new Error('Expected "event.authorizationToken" parameter to be set');
    }

    if(tokenString.startsWith("Bearer")) {
        tokenString = tokenString.substring(6).trim();
    }
    
    return tokenString;
};

const jwtOptions = {
    audience: process.env.AUDIENCE,
    issuer: process.env.TOKEN_ISSUER,
};

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: process.env.JWKS_URI,
});

export const authenticate = async (event) => {
    const token = getToken(event);

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
        throw new Error('invalid token');
    }

    console.log(`Decoded: ${decoded}`);

    const getSigningKey = util.promisify(client.getSigningKey);
    const key = await getSigningKey(decoded.header.kid);
    const signingKey = key.publicKey || key.rsaPublicKey;

    const verifiedToken = await jwt.verify(token, signingKey, jwtOptions);

    return {
        isAuthorized: true,
        context: {
            scope: verifiedToken.scope,
            sub: verifiedToken.sub,
        },
    };
};
