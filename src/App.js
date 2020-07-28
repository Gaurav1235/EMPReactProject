import React from 'react';
import './App.css';
import {Component} from 'react';
import TodoList from './TodoList'
import AddTodo from './AddTodo';
import Resource from "./Resource";
import {Example} from "./Example";
import Edata from "./employeesList.json";

import { Button, ButtonToolbar } from 'react-bootstrap';
import { Modal ,Row, Col,Form } from 'react-bootstrap';
//import {Example} from './Example';
//   864814077514-1u2j1dqlvj1qev34os4med4uush4mnnm.apps.googleusercontent.com


class App extends Component{

    state ={
        todoList:[
            {id:0,item:"Project 1"},
            {id:1,item:"Project 2"},
        ],
        resources:[
            {id: 0,display:true, title: [{userId:10,firstName:"Gau"},{ userId:11,firstName:"Kunal"}]},
            {id:1,display:false,title: [{userId:22,firstName:"hrash"},{ userId:30,firstName:"Kul"}]}
        ],
        employees:[],
        currentEmployees:[],
        displayResources:false,
        addResourcesDisplay:false,
        idx:0,
        id:0
    }
    componentDidMount() {
        this.refreshList();
    }
    refreshList(){

        this.setState({employees:Edata});
        console.log(this.state.employees);
    }
    addResource=(idx,data)=>{
        const newResources=this.state.resources.map((resource, index) => {

            if(resource.id==idx) {
                let flag = 0;
                resource.title.map((item, index) => {
                    if (item.userId == data.userId) {
                        console.log(data.userId);
                        flag = 1;
                        return {
                            ...resource,
                            title: resource.title
                        }

                    }
                })
                if (flag === 0) {
                return {
                    ...resource,
                    title: [...resource.title, {userId: data.userId, firstName: data.firstName}]
                }
                }
                else{
                    return {
                        ...resource,
                        title: resource.title
                    }
                }
            }
            else{
                return {
                    ...resource,
                    title: resource.title
                }
            }

        })
        this.setState({
            resources:newResources,
            displayResources:!this.state.displayResources,
        })
    }
    addResourceDisplay=(idx)=>{
        const current=[];
        for(var i =0;i<this.state.resources.length;i++){
            if(this.state.resources[i].id==idx){
                current.push(this.state.resources[i].title);
            }
        }
        console.log(current);
        this.setState({
            addResourcesDisplay:!this.state.addResourcesDisplay,
            idx:idx,
            currentEmployees:current
        })
    }
    changeid=(id)=>{
        this.setState({
            id:id
        })
    }
    displayResource = (idx) => {

        const newResources=this.state.resources.map((resource, index) => {

            if(resource.id==idx){
                return {
                    ...resource,
                    display: !resource.display
                }
            }
            else if(resource.display){
                return {
                    ...resource,
                    display: !resource.display
                }
            }
            else{
                return {
                    ...resource,
                    display: resource.display
                }
            }

        })
        this.setState({
            resources:newResources,
            displayResources:!this.state.displayResources,
        })
    }
    addItem=(newTodo)=>{
        const newTodoList=[...this.state.todoList,{id:this.state.todoList.length,item:newTodo}];
        //const res=newPerson.split(",");
        const newResources=[...this.state.resources,{id:this.state.resources.length,display:false,title:[]}];
        this.setState({
            todoList:newTodoList,
            resources:newResources,
        })

    }

    render(){
        let resources=null;
        let displayOff = ()=>this.setState({addResourcesDisplay:false});
            resources = (
                <div>
                {this.state.resources.map((resource, index) => {
                        if (resource.display) {
                            return <Resource id={resource.id}
                            title={resource.title}/>
                        }
                    })}
                </div>
            )


        return (
            <div>

                {/*<div>*/}
                {/*    {this.state.employees.map((item,index)=>{*/}
                {/*        return <div>*/}
                {/*            <p>{item.id}</p>*/}
                {/*            <p>{item.firstName}</p>*/}
                {/*        </div>*/}
                {/*    })}*/}
                {/*</div>*/}
            <div className="columns">

            <div className="column1">
                <AddTodo addItem={this.addItem}  />
            <TodoList list={this.state.todoList } displayResource={this.displayResource}
                      changeid={this.changeid}/>


            </div>
            <div className="column2">
                <button className="btn2" onClick={()=>this.addResourceDisplay(this.state.id)}>
                    Add Resources
                </button>
            {resources}
                <Example
                    show={this.state.addResourcesDisplay}
                    onHide={displayOff}
                    addResource={this.addResource}
                    userId={this.state.idx}
                    currentEmployees={this.state.currentEmployees}
                />
            </div>
            </div>
            </div>

        );
    }

}

export default App;

// import React from 'react';
// import './App.css';
// import {Component} from 'react';
// import TodoList from './TodoList'
// import AddTodo from './AddTodo';
// import Resource from "./Resource";
// import {Example} from "./Example";
// import { Button, ButtonToolbar } from 'react-bootstrap';
// import { Modal ,Row, Col,Form } from 'react-bootstrap';
// //import {Example} from './Example';
// //   864814077514-1u2j1dqlvj1qev34os4med4uush4mnnm.apps.googleusercontent.com
//
//
// class App extends Component{
//
//     state ={
//         todoList:[
//             {id:0,item:"Project 1"},
//             {id:1,item:"Project 2"},
//         ],
//         resources:[
//             {id: 0,display:false, title: ["Gaurav"," Kunal"]},
//             {id:1,display:false,title: ["Harsh", " Rahul"]}
//         ],
//         employees:[],
//         displayResources:false,
//
//     }
//     componentDidMount() {
//         this.refreshList();
//     }
//     refreshList(){
//         fetch('./employeesList.json')
//             .then(response=>response.json())
//             .then(data=>{
//                 this.setState({employees:data});
//             })
//     }
//
//     displayResource = (idx) => {
//
//         const newResources=this.state.resources.map((resource, index) => {
//
//             if(resource.id==idx){
//                 return {
//                     ...resource,
//                     display: !resource.display
//                 }
//             }
//             else{
//                 return {
//                     ...resource,
//                     display: resource.display
//                 }
//             }
//
//         })
//         this.setState({
//             resources:newResources,
//             displayResources:!this.state.displayResources,
//         })
//     }
//     addItem=(newTodo,newPerson)=>{
//         const newTodoList=[...this.state.todoList,{id:this.state.todoList.length,item:newTodo}];
//         const res=newPerson.split(",");
//         const newResources=[...this.state.resources,{id:this.state.resources.length,display:false,title: res}];
//         this.setState({
//             todoList:newTodoList,
//             resources:newResources,
//         })
//
//     }
//
//     render(){
//         let resources=null;
//
//         resources = (
//             <div>
//                 {this.state.resources.map((resource, index) => {
//                     if (resource.display) {
//                         return <Resource key={resource.id}
//                                          title={resource.title}/>
//                     }
//                 })}
//             </div>
//         )
//
//
//         return (
//             <div>
//                 <div>
//                     <p> The 1st heading </p>
//                     <h1> The 1st heading </h1>
//                 </div>
//                 <TodoList list={this.state.todoList } displayResource={this.displayResource}/>
//                 <AddTodo addItem={this.addItem}  />
//
//                 {resources}
//                 <Example/>
//             </div>
//
//         );
//     }
//
// }
//
// export default App;
