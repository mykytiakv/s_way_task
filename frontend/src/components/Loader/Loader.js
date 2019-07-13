import React from "react";
import {Spinner} from "react-bootstrap";
import "./Loader.css";

export default class App extends React.Component {
    //other logic
    render() {
        return (
            <div className="loader-container">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
}