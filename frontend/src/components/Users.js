import React from 'react';
import {Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {getUsers} from "../store/actions/users";
import {Link} from "react-router-dom";
import RemoveUserModal from "./RemoveUserModal";
import { FaUserPlus, FaUserTimes, FaUserEdit } from 'react-icons/fa';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            removeUser: {}
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.users.length > nextProps.users.length) {
            this.setState({modal: false});
        }
    };

    componentDidMount = () => this.props.getUsers();

    openModal = removeUser => {
        this.setState({
            removeUser,
            modal: true
        });
    };

    closeModal = () => this.setState({modal: false});

    getUsersList = () => {
        const {users} = this.props;
        if (users.length > 0) {
            return users.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.group_data.hasOwnProperty('id') ? user.group_data.name : '-'}</td>
                    <td>
                        <Link to={`/user/edit/${user.id}`}>
                            <Button variant="secondary mr-2"><FaUserEdit/> Edit</Button>
                        </Link>
                        {!user.is_superuser && <Button variant="danger" onClick={() => this.openModal(user)}><FaUserTimes /> Delete</Button>}
                    </td>
                </tr>
            ))
        } else {
            return <tr><td colSpan="4" className="text-center">The user list is empty</td></tr>
        }
    };

    render() {

        return (
            <>
                <Link to="/user/add" className="float-right mb-3">
                    <Button variant="secondary"><FaUserPlus /> Add user</Button>
                </Link>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getUsersList()}
                    </tbody>

                    <RemoveUserModal show={this.state.modal} user={this.state.removeUser} closeModal={this.closeModal}/>

                </Table>
            </>
        );
    }
}
const mapStateToProps = state => ({
    users: state.users.users,
    errors: state.errors.msg
});

export default connect(
    mapStateToProps,
    {getUsers}
)(Users);
