import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

// axios.defaults.baseURL = 'http://localhost:8800';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!inputs.username) return setErr('请输入用户名');
        if(!inputs.email) return setErr('请输入邮箱');
        if(!inputs.password) return setErr('请输入密码');
        try {
            await axios.post('/auth/register', inputs);
            navigate('/login');
        } catch (err) {
            console.log(err)
            setErr(err.response.data);
        };

    }
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input 
                    required
                    type='text' 
                    placeholder="用户名" 
                    name="username" 
                    onChange={handleChange}
                />
                <input 
                    required
                    type='email' 
                    placeholder="邮箱" 
                    name="email" 
                    onChange={handleChange}
                />
                <input 
                    required
                    type='password' 
                    placeholder="密码" 
                    name="password" 
                    onChange={handleChange}
                />
                <button  onClick={handleSubmit}>注册</button>
                {err && <p className="err">{err}</p>}
                <span>
                    已有账号？
                    <Link to='/login'>登录</Link>
                </span>
            </form>
        </div>
    )
};

export default Register;
