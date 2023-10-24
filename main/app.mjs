import { authenticate } from './lib.mjs';
let data;

// Lambda function index.handler - thin wrapper around lib.authenticate
export const lambdaHandler = async (event, context, callback) => {
  try {
    data = await authenticate(event);
  }
  catch (err) {
      console.log(err);
      return context.fail("Unauthorized");
  }
  
  console.log("Decoded, returning result as ",data);
  return data;
};
