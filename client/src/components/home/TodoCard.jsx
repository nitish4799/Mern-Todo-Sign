import React from 'react';
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";

const TodoCard = ({ heading, body, id, delid, display }) => {
    return (
        <div className='w-44'>
            TodoCard
            {heading}
            {body}
            <div className='flex flex-row justify-around' >
                <div onClick={() => {
                    delid(id)
                }}>
                    <MdDelete />
                </div>
                <div onClick={() => display("block")}>
                    <MdBrowserUpdated />
                </div>
            </div>
        </div>
    )
}

export default TodoCard
