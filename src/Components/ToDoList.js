import React, { useEffect, useState } from 'react'
import './ToDoList.css'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

let i = -1;

const getLocalItems = () => {
    let list = localStorage.getItem('list')

    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    }
    else {
        return [];
    }
}

function ToDoList() {
    const [text, setText] = useState('')
    const [data, setData] = useState(getLocalItems())
    const [error, setError] = useState(false)

    const handleOnchange = (event) => {
        setText(event.target.value)
    }

    const [hide, setHide] = useState(false)

    const addList = () => {

        if (text.length == 0) {
            setError(true);
        }
        else {
            setData([...data, text])
            setText('')
            setError(false);
        }
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(data))
    }, [data])

    const updateList = (i) => {
        const edit = [...data]
        edit.splice(i, 1, text)
        setData(edit)
        setText('')
        setHide(false)
    }

    const deleteItem = (index) => {
        // setData((oldItem) => {
        //     return oldItem.filter((el,index) => {
        //         return index !== id;
        //     })
        // })
        const rows = [...data]
        rows.splice(index, 1)
        setData(rows)
    }

    const editItem = (index) => {
        i = index
        setText(data[index])
        setHide(true)
    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13 || e.which === 13) {
            if (hide == true) {
                updateList(i);
            }
            else {
                addList();
            }
        }
    };

    return (
        <div>
            <div className="bg">
                <div className='main'>
                    <h1 className='header'>To Do List</h1>
                    <div className='flex'>
                        <input placeholder="Enter Your List Here" autoFocus value={text} onChange={handleOnchange} onKeyPress={handleKeypress} className='task-input' />
                        <div className="wrapper">
                            <div className='btn-grp'>
                                {
                                    hide ?
                                        <Button className='button-add' variant="contained" color='warning' onClick={() => { updateList(i) }} endIcon={<UpdateIcon />}>Update</Button> :
                                        <Button className='button-add' variant="contained" onClick={addList} endIcon={<AddCircleIcon />}>Add</Button>
                                }
                            </div>
                            <br />
                            <div className='error'>
                                {
                                    error && text.length <= 0 ?
                                        <div className='todoError' htmlFor="">List can't be Empty.</div>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">

                        {
                            data.map((text, index) => {
                                return (
                                    <>
                                        <div className="list-item" key={index}>
                                            <h5 > {text}</h5>
                                            <div className=''>
                                                {/* <IconButton title='Edit'  className='complete-btn' onClick={() => {completeItem(index)}} ><CheckCircleIcon /></IconButton> */}

                                                <IconButton title='Edit' className='edit-btn' onClick={() => { editItem(index) }} ><EditIcon /></IconButton>

                                                <IconButton title='Delete' className='delete-btn' onClick={() => { deleteItem(index) }} ><CancelIcon /></IconButton>
                                            </div>
                                        </div>
                                    </>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList