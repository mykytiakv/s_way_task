import React from 'react';
import {Route, Link, HashRouter, Redirect} from 'react-router-dom';
import Login from './Login';
import {Navbar, Nav, Image} from "react-bootstrap";
import Users from "./Users";
import {loadUser, logout} from "../store/actions/auth";
import Groups from "./Groups";
import UserForm from "./UserForm";
import {connect} from "react-redux";
import GroupForm from "./GroupForm";
import Loader from "./Loader/Loader";


class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => this.props.loadUser();

    render() {
        const {isAuthenticated, isLoading} = this.props;

        return (
            <HashRouter>
                <Redirect to={`/${isAuthenticated ? 'users' : ''}`}/>

                <Navbar bg="dark" variant="dark">
                    <div className="container">
                        <Navbar.Brand href="/">
                            <Image src="/static/logo.png" />
                        </Navbar.Brand>

                        <Nav className="mr-auto">

                            {isAuthenticated && (
                                <>
                                    <Link to="/users" className="nav-link">Users</Link>
                                    <Link to="/groups" className="nav-link">Groups</Link>
                                </>
                            )}

                        </Nav>

                        {isAuthenticated && (
                            <Nav>
                                <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>
                            </Nav>
                        )}

                    </div>
                </Navbar>

                <div className="container mt-3">
                    {!isAuthenticated
                        ? <Route path="/" exact component={Login} />
                        : (
                            <>
                                <Route path="/users" component={Users} />
                                <Route path="/groups" component={Groups} />

                                <Route path="/user/add" component={UserForm} />
                                <Route path="/user/edit/:id" component={UserForm} />
                                <Route path="/group/add" component={GroupForm} />
                                <Route path="/group/edit/:id" component={GroupForm} />
                            </>
                        )
                    }

                </div>
                {isLoading && <Loader />}
            </HashRouter>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});


export default connect(
    mapStateToProps,
    {logout, loadUser}
)(MainContainer);