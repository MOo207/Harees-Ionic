// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Child } = initSchema(schema);

export {
  Child
};