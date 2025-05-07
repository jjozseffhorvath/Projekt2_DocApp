import {Button, Form, Input} from 'antd'
import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login(){
    const navigate = useNavigate();  
    const onFinish = async(values) => {
        try {
            const response = await axios.post('/api/user/login', values);
            if (response.data.success) {
                toast.success("Átirányítás a kezdőlapra");
                localStorage.setItem("token",response.data.token);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Valami hibát érzékeltünk");
        }
    }

    return (
        <div className = 'authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Medico</h1>
                <Form layout='vertical' onFinish={onFinish}>


                    <Form.Item label='E-mail' name ='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item label='Jelszó' name ='password'>
                        <Input placeholder='Jelszó' type='password'/>
                    </Form.Item>


                    <Button className='primary-button my-2' htmlType='submit'>Bejelentkezés</Button>

                    <Link to='/register' className='anchor mt-2'>Kattinsd ide a regisztrációhoz</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login