import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Userall = () => {
    const [allUser, setAllUser] = useState([]);
    const [message, setMessage] = useState();
    const [getId, setGetId] = useState(); 
    let getAllUSer = async () => {
        try {
            let res = await axios.get('https://fitness-1-s5wl.onrender.com/api/v1/get-all-user');
            if (res.status == 201 || res.status == 200) {
                // console.log(res.data);
                setAllUser(res.data.data);
                setMessage(res.data.message);
            } else {
                 setMessage(res.data.message);
            }
        } catch (err) {
            alert("intenal error");
        }
    }
    useEffect(() => {
        //   let res = await axios.get("http://localhost:/get-all-user")
        getAllUSer();
    }, [setAllUser])
    console.log(getId);
    return (
        <div>
            <h1 className='text-3xl mb-5'>{message}</h1>
            <table className='text-center'>
                <tr className='border-2 border-black '>
                    <th className='border-1 border-black p-2'>Username</th>
                    <th className='border-1 border-black p-2'>Email</th>
                    <th className='border-1 border-black p-3'>Password</th>
                    <th className='border-1 border-black p-3'>Edit</th>
                </tr>
                {
                    allUser.map((item) => {
                        return (
                            <tr>
                                <th className='border-1 border-black p-3 text-blue-500' key={item}>{item.username}</th>
                                <th className='border-1 border-black p-3' key={item}>{item.email}</th>
                                <th className='border-1 border-black p-3 text-pink-400' key={item}>{item.password}</th>
                                <th className='border-1 border-black p-3 ' key={item}>
                                <Link to="/UserUpdate" onClick={()=> setGetId(item._id)}>update</Link> 
                                </th>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Userall