import React from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteUser} from "../store/actions/users";

class RemoveUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps);
    }

    deleteCurrentUser () {
        this.props.deleteUser(this.props.user.id);
    }

    handleClose = () => this.props.closeModal();

    render() {

        return (
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user <b>{this.props.user.username}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => this.deleteCurrentUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors.msg
    }
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default connect(
    mapStateToProps,
    {deleteUser}
)(RemoveUserModal);
