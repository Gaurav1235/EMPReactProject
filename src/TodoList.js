import React from 'react';
import {Component} from 'react';
import './App.css';
import { Tab, Tabs } from 'react-bootstrap';

class TodoList extends Component{
    constructor() {
        super();
        this.state = {
            // Takes active tab from props if it is defined there
            activeTab: 0
        };
    }
    handleSelect=(selectedTab)=> {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        this.props.displayResource(selectedTab);
        this.props.changeid(selectedTab);
        this.setState({
            activeTab: selectedTab
        });
    }

    render()
    {


        return (

            <Tabs className="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>


            {this.props.list.map((todo, i) => {
                return (
                    <Tab eventKey={i} title={todo.item}></Tab>
                    // <p>
                    // <button className="btn1" key={i} onClick={() =>{ this.props.displayResource(todo.id);
                    //     this.props.changeid(todo.id);
                    // }}>
                    // {todo.item}
                    // </button>
                    // {/*<button className="btn2" key={i} onClick={()=>this.props.addResourceDisplay(todo.id)}>*/}
                    // {/*    Add Resources*/}
                    // {/*</button>*/}
                    // </p>
                )
            }
            )}

            </Tabs>


        );
    }

}

export default TodoList;
