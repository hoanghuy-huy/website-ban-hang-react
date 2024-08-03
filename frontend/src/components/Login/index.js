import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { UserContext } from '~/hooks/userContext';

import './Login.scss';
import { toast } from 'react-toastify';
import { apiLogin } from '~/services/authService';

const Login = () => {
    const { loginContext } = useContext(UserContext)
    const defaultValidInputs ={
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objectValidInputs, setObjectValidInputs] = useState(
        defaultValidInputs
    );
    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate();
    const handleOnClickRegister = () => {
        navigate("/register");
    };

    const handOnClickLogin = async () => {
        setObjectValidInputs(defaultValidInputs)
        
        if(!valueLogin) {
            toast.error('Email or phone is not correct')
            setObjectValidInputs({...defaultValidInputs, isValidValueLogin : false})
            return;
        }

        if(!password) {
            toast.error('Password is not correct')
            setObjectValidInputs({...defaultValidInputs, isValidPassword : false})
            return;
        }

        const res = await apiLogin(valueLogin, password)

        if(res && res.EC === 0) {
            toast.success(res.EM)
            let email = res.DT.email
            let username = res.DT.username
            let roles = res.DT.groupWithRoleUser.Roles
            let userGroup = res.DT.userGroup

            localStorage.setItem('token', res.DT.token)

            loginContext({email, username,roles})
            if(userGroup === 'admin') {
                navigate('/users')
            }
            
            navigate('/')

        }
        
        if(res && res.EC !== 0) {
            //error 
            toast.error(res.EM)
        }

    }


    return (
        <div className="login-container bg-light d-flex align-items-center">
            <div className="container ">
                <div className="row px-3">
                    <div className="content-left col-12 d-none col-sm-5 col-md-8 d-sm-block ">
                        <div className="brand">
                            <h1>Hoang Huy Shop</h1>
                        </div>
                        <h3>
                            Welcome to my shope let choose every thing you want
                        </h3>
                    </div>
                    <div className="content-right col-sm-7 col-md-4 col-12 d-flex flex-column gap-3 px-5">
                        <div className="header-form-login py-3">
                            <h3> Login </h3>
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                value={valueLogin}
                                onChange={(event) => setValueLogin(event.target.value)}
                                className={objectValidInputs.isValidValueLogin ? "form-control" : "form-control is-invalid"}
                                placeholder="Email address or phone number"
                            />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Password"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                className={objectValidInputs.isValidPassword ? "form-control" : "form-control is-invalid"}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => handOnClickLogin()}>Login</button>
                        <span>
                            {/* <a href="#">Forgot password</a> */}
                        </span>
                        <hr />
                        <div className="d-flex flex-sm-row flex-column justify-content-center gap-3 mb-3">
                            <button className="col-sm-4 btn btn-light border border-secondary">
                                Facebook
                            </button>
                            <button className="col-sm-4 btn btn-light border border-secondary">
                                <span>Google</span>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <span>Your don't have account ? </span>
                            <div onClick={handleOnClickRegister}>Register</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
