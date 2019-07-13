import React from 'react';
import { Provider } from "react-redux";
import store from "../store/store";
import MainContainer from "./MainContainer";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <MainContainer />
            </Provider>
        );
    }
}

export default App;
