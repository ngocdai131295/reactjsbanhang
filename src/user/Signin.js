import React, { useState } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from "../core/Layout";
import { signin,authenticate, isAuthenticated } from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        email: 'abc@gmail.com',
        password: '123456',
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    //llấy các thông tin từ form lưu vào useState
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };



// submit form lấy các dữ liệu nhập đẩy vào setvalue
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // athenticate hàm để lưu mã jwt và người dùng lên local store sau khi submit form đăng nhập thành công
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };



//form dăng kí 
    const signInForm = () => (
        <form>
           
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form> 
    );


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () =>
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );

    // const RedirecUser = ()=>{
    //     if(redirectToReferrer){
    //         return <Redirect to="/"/>
    //     }
    // }

    const RedirecUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };


    return (
        <Layout
            title="Signip"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
           {showLoading()}
            {showError()}
            {signInForm()}
            {RedirecUser()}
        </Layout>
    );

};   
export default Signin;