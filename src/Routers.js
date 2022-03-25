import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
// import Menu from './core/Menu';

// user
import PrivateRoute from './auth/PrivateRoute';   //trang bảo mật route nếu ko đăng nhập  thì sẽ chuyển hướng
import Dashboard from './user/UserDashboard'
//admin dashboard
import AdminDashboard from './user/AdminDashboard ';
import AdminRoute from './auth/AdminRoute';



const Routes = () => {
    return (
        <BrowserRouter>
        {/* <Menu/> */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />

                {/* click vào dashboard chưa đăng nhập thì đc chuyển hướng đến đăng nhập */}
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;