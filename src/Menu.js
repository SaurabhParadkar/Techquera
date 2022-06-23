import React from 'react'
import { Redirect , Link } from 'react-router-dom'
import WebUrl from './WebUrl'

export default class Menu extends React.Component 
{
    constructor()
    {
        super()
        this.state = {
            islogin : false,
            islogout : false
        }
        setInterval(this.check,1000)
    }

    check = ()=>
    {
        fetch(WebUrl.CHECK_SESSION).then(response=>response.json()).then(result=>
        {
            this.setState({islogin:result.status})
        })
    }

    logout = ()=>{
        fetch(WebUrl.LOGOUT).then(response=>response.json()).then(result=>
            {
                this.setState({islogout:true,islogin:false})
            })
    }

    render() 
    {
        if(this.state.islogout)
        {
            this.setState({islogout:false})
            return <Redirect to="/"/>
        }

         var menu = undefined;
         if(this.state.islogin)   
            menu = <ul class="nav navbar-nav">
            <li class="active">
                <Link to="/user/home">Home</Link></li>            
            <li>
                <Link to="/user/query">Queries</Link></li>                 
            <li>
                <a onClick={this.logout}>Logout</a>
            </li>
        </ul>
        else
            menu = <ul class="nav navbar-nav">
            <li class="active">
                <Link to="/">Home</Link></li>
            <li>
            <Link to="/register">Register</Link>
            </li>    
            <li>
            <Link to="/login">Login</Link>
            </li>    
            <li>
            <Link to="/contact">Contact</Link>
            </li>
            </ul>


        return <>
            <br/>
            <section class="">
                <div class="container">
                    <nav class="navbar navbar-inverse">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <b class="navbar-brand" >Tech Quera</b>
                            </div>
                            {menu}
                        </div>
                    </nav>
                </div>
            </section>
        </>
    }
}