import React from 'react';
import {Table } from 'react-bootstrap';

const Resource = ( props ) => {
    return (


        <div className="resource">
        <Table className="mt-4" >
            <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
            </tr>
            </thead>
            <tbody className="tableResourceBody">
            {props.title.map((item,idx)=> {
                return (
                    <tr id={item.userId}>
                        <td>{item.userId}</td>
                        <td>{item.firstName}</td>
                        {/*<td>{employee.emailAddress}</td>*/}
                    </tr>
                )
            }
            )
            }

            </tbody>
        </Table>
        </div>

    )
};

export default Resource;