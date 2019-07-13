import React from 'react';
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteGroup} from "../store/actions/groups";

class RemoveGroupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    componentWillReceiveProps = nextProps => this.setState(nextProps);

    deleteCurrentGroup = () => this.props.deleteGroup(this.props.group.id);

    handleClose = () => this.props.closeModal();

    render() {

        return (
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete group <b>{this.props.group.name}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => this.deleteCurrentGroup()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors.msg
});

export default connect(
    mapStateToProps,
    {deleteGroup}
)(RemoveGroupModal);
