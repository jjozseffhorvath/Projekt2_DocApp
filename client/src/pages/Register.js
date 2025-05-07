import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate();  

   const onFinish =  async(values) => {
//     console.log("Megkapott értékek: ", values);
//    };

        try {
            const response = await axios.post('/api/user/register', values);
            if (response.data.success) {
                toast.success("Átirányítás a bejelentkezéshez");
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Valami hibát érzékeltünk");
        }
    };

    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Medico</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Név' name='name'>
                        <Input placeholder='Név' />
                    </Form.Item>

                    <Form.Item label='E-mail' name='email'>
                        <Input placeholder='Email' />
                    </Form.Item>

                    <Form.Item label='Jelszó' name='password'>
                        <Input placeholder='Jelszó' type='password' />
                    </Form.Item>


                    <Button className='primary-button my-2' htmlType='submit'>Regisztráció</Button>

                    <Link to='/login' className='anchor mt-2'>Kattinsd ide a bejelentkezésért</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register