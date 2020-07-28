import React from 'react';

function AddTodo({ addItem }) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log('the submit button is clicked');
        console.log(e.target.todo.value);
        addItem(e.target.todo.value);
    }

    return (
        <div className="addItem">
            <form onSubmit={(e) => handleSubmit(e)}>

                <input className="input1" type="text" name="todo" />
                {/*<input type="text" name="person"/>*/}

                <button className="btn3" type="submit"> Add Item </button>

            </form>
        </div>
    )
}

export default AddTodo;