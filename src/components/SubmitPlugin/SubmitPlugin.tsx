import withAuthentication from '../../services/auth/withAuthentication';
import * as React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Page from '../Page';
import createPluginMutation from './createPluginMutation';
import mutate from '../../services/graphql/mutate';
import { withState, compose, withProps } from 'recompose';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { IAuthenticatedProps } from '../../services/auth/withAuthentication';

interface ISubmitPluginVariables {
  npmModuleName: string;
  description: string;
  name: string;
  authorId: string;
}

const submitPlugin = async (variables: ISubmitPluginVariables) => {
  let result;

  try {
    result = await mutate(createPluginMutation, { input: variables });
  } catch (e) {
    console.log(e);
  }

  console.log({ result });
};

interface INpmModuleUpdater {
  npmModuleName: string;
  updateNpmModule: (name: string) => void;
}

interface IDescriptionUpdater {
  description: string;
  updateDescription: (description: string) => void;
}

interface IPluginNameUpdater {
  pluginName: string;
  updatePluginName: (name: string) => void;
}

interface IAcceptTermsUpdater {
  termsAccepted: boolean;
  updateTermsAcceptance: (accepted: boolean) => void;
}

interface ICanSubmitEvaluation {
  canSubmit: boolean;
}

interface IFormProps extends INpmModuleUpdater, IDescriptionUpdater, IPluginNameUpdater, IAcceptTermsUpdater {

}

interface ISubmitPluginProps extends RouteComponentProps<{}>, IAuthenticatedProps, IFormProps, ICanSubmitEvaluation {}

const SubmitPlugin: React.StatelessComponent<ISubmitPluginProps> = props =>
  <Page>
    <Form>
      <Form.Field>
        <label>Plugin name:</label>
        <input
          placeholder="Public github contributions"
          value={props.pluginName}
          onChange={event => props.updatePluginName(event.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>NPM module name:</label>
        <input
          placeholder="Example: siku-plugin-github"
          value={props.npmModuleName}
          onChange={event => props.updateNpmModule(event.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>This plugin tracks a users' ...</label>
        <input
          placeholder="Example: Public github contributions"
          value={props.description}
          onChange={event => props.updateDescription(event.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={props.termsAccepted}
          onChange={(event, data) => props.updateTermsAcceptance(data.checked)}
        />
      </Form.Field>
      <Button
        disabled={!props.canSubmit}
        type="button"
        onClick={() =>
          submitPlugin({
            npmModuleName: props.npmModuleName,
            name: props.pluginName,
            description: props.description,
            authorId: props.user.id,
          })}
      >
        Submit
      </Button>
    </Form>
  </Page>;

const enhance = compose<RouteComponentProps<{}>, RouteComponentProps<any>>(
  withAuthentication(),
  withState<INpmModuleUpdater>('npmModuleName', 'updateNpmModule', ''),
  withState<IDescriptionUpdater>('description', 'updateDescription', ''),
  withState<IPluginNameUpdater>('pluginName', 'updatePluginName', ''),
  withState<IAcceptTermsUpdater>(
    'termsAccepted',
    'updateTermsAcceptance',
    false,
  ),
  withProps<ICanSubmitEvaluation, IFormProps>(props => ({
    canSubmit: props.description && props.npmModuleName && props.pluginName && props.termsAccepted,
  })),
);

export default enhance(SubmitPlugin);
