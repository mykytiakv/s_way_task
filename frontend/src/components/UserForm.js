import React from 'react';
import {Form, Button, FormLabel, Breadcrumb} from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroups } from "../store/actions/groups";
import { getUsers, addUser, editUser } from "../store/actions/users";
import Alert from "react-bootstrap/Alert";
import RemoveUserModal from "./RemoveUserModal";
import {FaUserTimes} from "react-icons/fa";

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            user: {},
            id: null,
            username: '',
            group_id: '',
            errors: {},
            showError: false,
            successError: false,
            isSuperuser: false,
            redirect: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {id} = this.props.match.params;
        let {users} = this.props;
        const {errors} = nextProps;

        let data = {
            id: (id !== undefined) ? id : null,
            successError: errors.success,
            errors: errors.msg
        };
        if (nextProps.users.length < users.length || nextProps.users.length > users.length) {
            data = Object.assign({
                modal: false,
                redirect: true
            }, data)
        } else if (nextProps.users !== users && typeof (id) !== "undefined") {
            let user = nextProps.users.find(user => user.id === parseInt(id));
            if (typeof (user) !== "undefined") {
                data = Object.assign({
                    user,
                    username: user.username,
                    isSuperuser: user.is_superuser,
                    group_id: (user.group_id === null) ? '' : user.group_id
                }, data)
            } else {
                data = Object.assign({
                    errors: "User not found"
                })
            }
        }

        this.setState(data);
    }

    componentDidMount = () => {
        this.props.getUsers();
        this.props.getGroups();
    };

    submitForm = e => {
        e.preventDefault();
        let {username, group_id, id} = this.state;
        this.props[(id === null) ? 'addUser' : 'editUser']({
            id,
            username,
            group_id: (group_id !== '') ? parseInt(group_id) : null
        });
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

    openModal = e => {
        e.preventDefault();
        this.setState({
            modal: true
        })
    };

    closeModal = () => this.setState({modal: false});

    render() {
        let st = this.state;
        let errorIsString = typeof (st.errors) === "string";
        let isCreated = st.id === null;

        if (st.redirect) {
            return <Redirect to="/users" />
        }

        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item active><Link to="/users">Users</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{isCreated ? 'Create' : 'Edit'} User</Breadcrumb.Item>
                </Breadcrumb>

                <Form className="mt-5 col-lg-6 offset-lg-3 col-md-8 offset-md-2" onSubmit={(e) => this.submitForm(e)}>
                    <h3 className="text-center">{isCreated ? 'Create' : 'Edit'} User</h3>
                    <Form.Group controlId="formBasicUsername">
                        <FormLabel>Username</FormLabel>
                        <Form.Control placeholder="Your username" name="username"
                                      onChange={(e) => this.handleChange(e)}
                                      value={st.username}
                                      isInvalid={this.checkIsError("username")} />
                        <Form.Text className="text-muted">{this.getErrorText("username")}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicGroup">
                        <FormLabel>Group</FormLabel>
                        <Form.Control as="select" name="group_id" onChange={(e) => this.handleChange(e)}
                                      value={st.group_id}
                                      isInvalid={this.checkIsError("group_id")}>
                            <option value=""> - </option>
                            {this.props.groups.map(group =>
                                <option key={`Group-${group.id}`} value={group.id}>{group.name}</option>
                            )}
                        </Form.Control>
                        <Form.Text className="text-muted">{this.getErrorText("group_id")}</Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        {isCreated ? 'Create' : 'Edit'}
                    </Button>

                    {(!isCreated && !st.isSuperuser) && <Button variant="danger" className="float-right" onClick={(e) => this.openModal(e)}><FaUserTimes /> Delete</Button> }

                    <Alert key="1" className="mt-3 text-center" show={errorIsString} variant={st.successError ? "success" : "error"}>
                        {errorIsString && st.errors}
                    </Alert>

                    <RemoveUserModal show={st.modal} user={st.user} closeModal={this.closeModal}/>

                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    users: state.users.users,
    groups: state.groups.groups
});

export default connect(
    mapStateToProps,
    {getGroups, getUsers, addUser, editUser}
)(UserForm);