import React from 'react';
import ListErrors from './ListErrors';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeNumber: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'number', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (number, password) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(number, password) }),
  onUnload: () =>
    dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeNumber = event => this.props.onChangeNumber(event.target.value);
    this.changePassword = event => this.props.onChangePassword(event.target.value);
    this.submitForm = (number, password) => event => {
      event.preventDefault();
      this.props.onSubmit(number, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { number, password } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(number, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="Faction number"
                      value={number}
                      onChange={this.changeNumber} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
