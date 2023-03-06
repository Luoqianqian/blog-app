import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!inputs.username) return setErr('请输入用户名');
        if(!inputs.password) return setErr('请输入密码');
        try {
            await login(inputs);
            navigate('/');
        } catch (err) {
            setErr(err.response.data);
        }
    };
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input 
                    type='text' 
                    placeholder="用户名" 
                    name="username" 
                    onChange={handleChange}
                />
                <input 
                    type='password' 
                    placeholder="密码" 
                    name="password" 
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>登录</button>
                {err && <p className="err">{err}</p>}
                <span>
                    没有账号？
                    <Link to='/register'>注册</Link>
                </span>
            </form>
        </div>
    )
};

export default Login;
