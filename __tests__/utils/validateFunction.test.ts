import test, { ExecutionContext } from 'ava';
import { validateFunction, functionValidator } from '../../src/utils/validateFunction';
import { Validator } from 'jsonschema';
import fetchMock from 'fetch-mock';

type Context = ExecutionContext<unknown>;

const schema = {
  "$id": "/schemas/actions/function.json",
  "title": "Function",
  "properties": {
    "name": {
      "type": "string"
    },
    "icon": {
      "enum": ["CreateIcon", "DeleteIcon"]
    }
  },
  "required": ["name"]
}

const validator = new Validator();
validator.addSchema(schema, schema.$id);

test('load in entire schema for validator', async (t: Context): Promise<void> => {
  const functionJson = {
    "name": "create",
    "icon": "CreateIcon"
  }

  const {status, errors} = await validateFunction(functionJson, validator);

  t.is(status, 'ok');
  t.is(errors.length, 0);
});

test('invalidate empty schemas', async (t: Context): Promise<void> => {
  const {status, errors: [{message}]} = await validateFunction({}, validator);

  t.is(status, 'error');
  t.is(message, 'requires property "name"');
});

test('invalidate schemas that do not have valid values for properties', async (t: Context): Promise<void> => {
  const functionJson = {
    "name": "create",
    "icon": "RandomIcon"
  }

  const {status, errors: [{message}]} = await validateFunction(functionJson, validator);

  t.is(status, 'error');
  t.is(message, 'is not one of enum values: CreateIcon,DeleteIcon');
});

test('populating the validator with the schema', async (t: Context): Promise<void> => {
  fetchMock.mock('http://example.com/schemas/action/function.json', {
    body: JSON.stringify(schema)
  });

  const config = {
    schemaUrl: 'http://example.com',
    functionSchemaPath: '/schemas/action/function.json'
  }
  const {schemas} = await functionValidator(config);

  t.is(schemas['http://example.com/schemas/actions/function.json'].title, 'Function');
});