import React from 'react';
import {Form, Button, FormLabel} from "react-bootstrap";
import {connect} from 'react-redux';
import { login } from "../store/actions/auth";
import Alert from "react-bootstrap/Alert";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {},
            showError: false
        };
    }

    componentWillReceiveProps = nextProps => this.setState({errors: nextProps.errors});

    submitForm = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getErrorText = name => {
        let {errors} = this.state;
        return (errors.hasOwnProperty(name) && typeof (errors) === "object") ? errors[name] : "";
    };

    checkIsError = name => {
        let {errors} = this.state;
        return (typeof (errors) === "object" && errors.hasOwnProperty(name));
    };

    render() {
        let errorIsString = typeof (this.state.errors) === "string";

        return (
            <Form className="mt-5 col-lg-6 offset-lg-3 col-md-8 offset-md-2" onSubmit={(e) => this.submitForm(e)}>
                <h3 className="text-center">Login form</h3>
                <Form.Group controlId="formBasicUsername">
                    <FormLabel>Username</FormLabel>
                    <Form.Control placeholder="Your username" name="username"
                                  onChange={(e) => this.handleChange(e)}
                                  isInvalid={this.checkIsError("username")} />
                    <Form.Text className="text-muted">{this.getErrorText("username")}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <FormLabel>Password</FormLabel>
                    <Form.Control type="password" placeholder="Password" name="password"
                                  onChange={(e) => this.handleChange(e)}
                                  isInvalid={this.checkIsError("password")} />
                    <Form.Text className="text-muted">{this.getErrorText("password")}</Form.Text>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>

                <div className="error">
                    <Alert key="1" className="mt-3" show={errorIsString} variant="danger">{errorIsString && this.state.errors}</Alert>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors.msg
});

export default connect(
    mapStateToProps,
    {login}
)(Login);