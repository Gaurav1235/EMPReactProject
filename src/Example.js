import React from 'react';
import { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal ,Row, Col,Form } from 'react-bootstrap';
import Edata from './employeesList.json';
import ReactTable from 'react-table';
import './App.css';
import { Dropdown } from 'semantic-ui-react'
//import "react-table/react-table.css";

export class Example extends Component {
    constructor(props) {
        super(props);
        this.state={
            employeestable:[],
            employeesListed:[],
            employeesAvailable:[]
        }
    }
    componentDidMount() {
        this.refreshList();
    }
    refreshList=()=>{
        const url="https://my-json-server.typicode.com/typicode/demo/posts";
        fetch(url,{
            method:"GET"
        }).then(resp=>resp.json()).then(posts=>{
            this.setState({employeestable:posts,
                employeesAvailable:posts,
                employeesListed:[]
            });
        })
    }
    handleSubmit=(userId,firstName)=>{
        //event.preventDefault();
        //console.log(event);
        const data={
            "userId":userId,
            "firstName":firstName
        }
        const newResources=[];
        this.state.employeestable.forEach((resource, index) => {

            if(resource.id!=userId){
                newResources.push(resource);
            }

        })
        this.setState({
            employeestable:newResources
        })
        this.props.addResource(this.props.userId,data);
    }
    handleSubmit2=(event,data)=>{
        event.preventDefault();
        //console.log(event);
        console.log("asa");
        console.log(data.value);



        this.state.employeesAvailable.forEach((resource, index) => {

                if (resource.title === data.value[data.value.length-1]) {
                    this.state.employeesListed.push(resource);
                }

        })
        this.setState({
            employeestable:this.state.employeesListed
        })

        // const data={
        //     "userId":userId,
        //     "firstName":firstName
        // }
        // const newResources=[];
        // this.state.employeestable.forEach((resource, index) => {
        //
        //     if(resource.id!=userId){
        //         newResources.push(resource);
        //     }
        //
        // })
        // this.setState({
        //     employeestable:newResources
        // })
        // this.props.addResource(this.props.userId,data);
    }
    render() {
        const options=[];
        this.state.employeesAvailable.forEach((resource, index) => {
            //  console.log(resource.userId);
            const opt={key:resource.id,text:resource.title,
                value:resource.title};
            options.push(opt);

        })
        const jobs=[];

        for (let i = 0; i < this.state.employeestable.length; i++) {
            const id = this.state.employeestable[i].userId;
            const name=this.state.employeestable[i].firstName;
            jobs.push({
                id: id,
                name: name ,
                role: 'B'
                // active: i % 2 === 0 ? 'Y' : 'N'
            });
        }

        console.log(options);
        return (
            <Modal
                f  {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employees
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <Dropdown name="employees"  onChange={this.handleSubmit2} className="dropdown" placeholder='Skills' fluid multiple search selection options={options} />
                        {/*<form onSubmit={this.handleSubmit1}>*/}

                        {/*    <label>*/}

                        {/*        <select multiple={true}>*/}
                        {/*            {this.state.employeestable.map(item => (*/}
                        {/*                <option key={item.id} value={item.title}>*/}
                        {/*                    {item.title}*/}
                        {/*                </option>*/}
                        {/*            ))}*/}
                        {/*            {console.log(this.state.countries)}*/}
                        {/*        </select>*/}
                        {/*    </label>*/}
                        {/*    <input type="submit" value="Submit" />*/}
                        {/*</form>*/}
                    </div>
                    <div>
                        <Table variant="dark" className="mt-5" >
                            <thead>
                            <tr>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.employeestable.map((item,idx)=> {
                                    return (
                                        <tr id={item.id}>
                                            <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.id}</td>
                                            <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.title}</td>
                                            {/*<td>{employee.emailAddress}</td>*/}
                                        </tr>
                                    )
                                }
                            )
                            }

                            </tbody>
                        </Table>
                        <BootstrapTable data={ jobs } cellEdit={ cellEditProp } insertRow={ true } options={ options }>
                            <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' editable={ { type: 'textarea', validator: jobNameValidator } }>Job Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='role' editable={ { type: 'select', options: { values: jobTypes } } }>Job Type</TableHeaderColumn>
                            {/*<TableHeaderColumn dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeaderColumn>*/}
                        </BootstrapTable>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>{
                        this.refreshList();
                        this.props.onHide();
                    } }>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// import React from 'react';
// import { Component } from 'react';
// import {Button, Table} from 'react-bootstrap';
// import { Modal ,Row, Col,Form } from 'react-bootstrap';
// import Edata from './employeesList.json';
// import ReactTable from 'react-table';
// import './App.css';
// //import "react-table/react-table.css";
//
// export class Example extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             employeestable:[]
//         }
//     }
//     componentDidMount() {
//         this.refreshList();
//     }
//     refreshList=()=>{
//         const url="https://my-json-server.typicode.com/typicode/demo/posts";
//         fetch(url,{
//             method:"GET"
//         }).then(resp=>resp.json()).then(posts=>{
//             this.setState({employeestable:posts});
//         })
//     }
//     handleSubmit=(userId,firstName)=>{
//         //event.preventDefault();
//         //console.log(event);
//         const data={
//             "userId":userId,
//             "firstName":firstName
//         }
//         const newResources=[];
//         this.state.employeestable.forEach((resource, index) => {
//
//             if(resource.id!=userId){
//                 newResources.push(resource);
//             }
//
//         })
//         this.setState({
//             employeestable:newResources
//         })
//         this.props.addResource(this.props.userId,data);
//     }
//     render() {
//         return (
//             <Modal
//                 f  {...this.props}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Add Employees
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <form onSubmit={this.handleSubmit1}>
//
//                             <label>
//
//                                 <select multiple={true}>
//                                     {this.state.employeestable.map(item => (
//                                         <option key={item.id} value={item.title}>
//                                             {item.title}
//                                         </option>
//                                     ))}
//                                     {console.log(this.state.countries)}
//                                 </select>
//                             </label>
//                             <input type="submit" value="Submit" />
//                         </form>
//                     </div>
//                     <div>
//                         <Table variant="dark" className="mt-5" >
//                             <thead>
//                             <tr>
//                                 <th>Employee Id</th>
//                                 <th>Employee Name</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {this.state.employeestable.map((item,idx)=> {
//                                     return (
//                                         <tr id={item.id}>
//                                             <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.id}</td>
//                                             <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.title}</td>
//                                             {/*<td>{employee.emailAddress}</td>*/}
//                                         </tr>
//                                     )
//                                 }
//                             )
//                             }
//
//                             </tbody>
//                         </Table>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={()=>{
//                         this.refreshList();
//                         this.props.onHide();
//                     } }>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         );
//     }
// }

// import React from 'react';
// import { Component } from 'react';
// import {Button, Table} from 'react-bootstrap';
// import { Modal ,Row, Col,Form } from 'react-bootstrap';
// import Edata from './employeesList.json';
// import ReactTable from 'react-table';
// //import "react-table/react-table.css";
//
// export class Example extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             employeestable:[]
//         }
//     }
//     componentDidMount() {
//         this.refreshList();
//     }
//     refreshList=()=>{
//         const url="https://my-json-server.typicode.com/typicode/demo/posts";
//         fetch(url,{
//             method:"GET"
//         }).then(resp=>resp.json()).then(posts=>{
//             this.setState({employeestable:posts});
//         })
//     }
//     handleSubmit=(userId,firstName)=>{
//         //event.preventDefault();
//         //console.log(event);
//         const data={
//             "userId":userId,
//             "firstName":firstName
//         }
//         const newResources=[];
//         this.state.employeestable.forEach((resource, index) => {
//
//             if(resource.id!=userId){
//                 newResources.push(resource);
//             }
//
//         })
//         this.setState({
//             employeestable:newResources
//         })
//         this.props.addResource(this.props.userId,data);
//     }
//     render() {
//         return (
//             <Modal
//                 f  {...this.props}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Add Employees
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <Table className="mt-5" striped bordered hover size="sm">
//                             <thead>
//                             <tr>
//                                 <th>Employee Id</th>
//                                 <th>Employee Name</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {this.state.employeestable.map((item,idx)=> {
//                                     return (
//                                         <tr id={item.id}>
//                                             <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.id}</td>
//                                             <td onClick={()=>this.handleSubmit(item.id,item.title)}>{item.title}</td>
//                                             {/*<td>{employee.emailAddress}</td>*/}
//                                         </tr>
//                                     )
//                                 }
//                             )
//                             }
//
//                             </tbody>
//                         </Table>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={()=>{
//                         this.refreshList();
//                         this.props.onHide();
//                     } }>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         );
//     }
// }
//

// import React from 'react';
// import { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import { Modal ,Row, Col,Form } from 'react-bootstrap';
//
//
// export class Example extends Component {
//     constructor(props) {
//         super(props);
//     }
//     handleSubmit=(event )=>{
//         event.preventDefault();
//         console.log(event.target.EmployeeFirstName.value);
//         const data={
//             "userId":event.target.userId.value,
//             "firstName":event.target.EmployeeFirstName.value
//         }
//         this.props.addResource(this.props.userId,data);
//     }
//     render() {
//         return (
//             <Modal
//                 f  {...this.props}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Add Employees
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <Row>
//                             <Col sm={6}>
//                                 <Form onSubmit={this.handleSubmit}>
//                                     <Form.Group controlId="userId">
//                                         <Form.Label>userId</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="userId"
//                                             required
//                                             placeholder="userId"
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="EmployeeFirstName">
//                                         <Form.Label>EmployeeFirstName</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="EmployeeFirstName"
//                                             required
//                                             placeholder="EmployeeFirstName"
//                                         />
//                                     </Form.Group>
//                                     <Form.Group >
//                                         <Button variant='primary' type='submit'>
//                                             Add Employee
//                                         </Button>
//                                     </Form.Group>
//                                 </Form>
//                             </Col>
//
//                         </Row>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={this.props.onHide}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         );
//     }
// }
//  function Example() {
//     const [modalShow, setModalShow] = React.useState(false);
//
//     return (
//         <>
//             <Button variant="primary" onClick={() => setModalShow(true)}>
//                 Launch vertically centered modal
//             </Button>
//
//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }


//export default Example;






// import React from 'react';
// import { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import { Modal ,Row, Col,Form } from 'react-bootstrap';
//
//
// export class Example extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <Modal
//                 f  {...this.props}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Add Employees
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         To add Form fields  for Projects
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={this.props.onHide}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         );
//     }
// }
//
//
// //  function Example() {
// //     const [modalShow, setModalShow] = React.useState(false);
// //
// //     return (
// //         <>
// //             <Button variant="primary" onClick={() => setModalShow(true)}>
// //                 Launch vertically centered modal
// //             </Button>
// //
// //             <MyVerticallyCenteredModal
// //                 show={modalShow}
// //                 onHide={() => setModalShow(false)}
// //             />
// //         </>
// //     );
// // }
//
//
// //export default Example;
//
