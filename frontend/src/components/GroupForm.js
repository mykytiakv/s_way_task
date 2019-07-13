import React from 'react';
import {Form, Button, FormLabel, Breadcrumb} from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroups, addGroup, editGroup } from "../store/actions/groups";
import Alert from "react-bootstrap/Alert";
import {FaUserTimes} from "react-icons/fa";
import RemoveGroupModal from "./RemoveGroupModal";

class GroupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            group: {},
            id: null,
            name: '',
            description: '',
            errors: {},
            showError: false,
            hasUsers: false,
            successError: false,
            redirect: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {id} = this.props.match.params;
        const {groups} = this.props;
        const {errors} = nextProps;

        let data = {
            id: (id !== undefined) ? id : null,
            successError: errors.success,
            errors: errors.msg
        };
        if (nextProps.groups.length < groups.length || nextProps.groups.length > groups.length) {
            data = Object.assign({
                modal: false,
                redirect: true
            }, data)
        } else if (nextProps.groups !== groups && typeof (id) !== "undefined") {
            let group = nextProps.groups.find(group => group.id === parseInt(id));
            if (typeof (group) !== "undefined") {
                data = Object.assign({
                    group,
                    name: group.name,
                    description: group.description,
                    hasUsers: group.users_count > 0
                }, data)
            } else {
                data = Object.assign({
                    errors: "Group not found"
                })
            }
        }

        this.setState(data);
    }

    componentDidMount = () => this.props.getGroups();

    submitForm = e => {
        e.preventDefault();
        let {name, description, id} = this.state;
        this.props[(id === null) ? 'addGroup' : 'editGroup']({
            id, name, description
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getErrorText = name => {
        let {errors} = this.state;
        return (typeof (errors) === "object" && errors.hasOwnProperty(name)) ? errors[name] : "";
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
            return <Redirect to="/groups" />
        }

        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item active><Link to="/groups">Groups</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{isCreated ? 'Create' : 'Edit'} Group</Breadcrumb.Item>
                </Breadcrumb>

                <Form className="mt-5 col-lg-6 offset-lg-3 col-md-8 offset-md-2" onSubmit={(e) => this.submitForm(e)}>
                    <h3 className="text-center">{isCreated ? 'Create' : 'Edit'} Group</h3>
                    <Form.Group controlId="formBasicName">
                        <FormLabel>Name</FormLabel>
                        <Form.Control placeholder="Group name" name="name"
                                      onChange={(e) => this.handleChange(e)}
                                      value={st.name}
                                      isInvalid={this.checkIsError("name")} />
                        <Form.Text className="text-muted">{this.getErrorText("name")}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicGroup">
                        <FormLabel>Description</FormLabel>
                        <Form.Control as="textarea" rows="3" name="description" onChange={(e) => this.handleChange(e)}
                                      value={st.description}
                                      isInvalid={this.checkIsError("description")} />
                        <Form.Text className="text-muted">{this.getErrorText("description")}</Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        {isCreated ? 'Create' : 'Edit'}
                    </Button>

                    {(!isCreated && !st.hasUsers) && <Button variant="danger" className="float-right" onClick={(e) => this.openModal(e)}><FaUserTimes /> Delete</Button> }

                    <Alert key="1" className="mt-3 text-center" show={errorIsString} variant={st.successError ? "success" : "error"}>
                        {errorIsString && st.errors}
                    </Alert>

                    <RemoveGroupModal show={st.modal} group={st.group} closeModal={this.closeModal}/>

                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    groups: state.groups.groups
});

export default connect(
    mapStateToProps,
    {getGroups, addGroup, editGroup}
)(GroupForm);