import * as React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Page from '../Page';

const SubmitPlugin: React.StatelessComponent<{}> = () =>
  <Page>
    <Form>
      <Form.Field>
        <label>Clone-able git url:</label>
        <input placeholder="Example: https://github.com/ncthis/siku-frontend.git" />
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </Page>;

export default SubmitPlugin;
