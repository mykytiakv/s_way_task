import React from 'react';
import {Button, Table} from "react-bootstrap";
import {connect} from "react-redux";
import {getGroups} from "../store/actions/groups";
import {Link} from "react-router-dom";
import {FaPlusCircle, FaTimesCircle, FaEdit} from "react-icons/fa";
import RemoveGroupModal from "./RemoveGroupModal";

class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            removeGroup: {}
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.groups.length > nextProps.groups.length) {
            this.setState({modal: false});
        }
    }

    componentDidMount() {
        this.props.getGroups();
    }

    openModal(removeGroup) {
        this.setState({
            removeGroup,
            modal: true
        })
    }

    closeModal = () => this.setState({modal: false});

    getGroupsList = () => {
        const {groups} = this.props;
        if (groups.length > 0) {
            return groups.map(group => (
                <tr key={group.id}>
                    <td>{group.id}</td>
                    <td>{group.name}</td>
                    <td>{group.description}</td>
                    <td>{group.users_count}</td>
                    <td>
                        <Link to={`/group/edit/${group.id}`}>
                            <Button variant="secondary mr-2"><FaEdit/> Edit</Button>
                        </Link>
                        {group.users_count === 0 &&
                        <Button variant="danger" onClick={() => this.openModal(group)}><FaTimesCircle/> Delete</Button>}
                    </td>
                </tr>
            ))
        } else {
            return <tr><td colSpan="5" className="text-center">The group list is empty</td></tr>
        }
    };

    render() {

        return (
            <>
                <Link to="/group/add" className="float-right mb-3">
                        <Button variant="secondary"><FaPlusCircle /> Add group</Button>
                </Link>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Users count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getGroupsList()}
                    </tbody>

                    <RemoveGroupModal show={this.state.modal} group={this.state.removeGroup} closeModal={this.closeModal}/>

                </Table>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groups.groups,
        errors: state.errors.msg
    }
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default connect(
    mapStateToProps,
    {getGroups}
)(Groups);
