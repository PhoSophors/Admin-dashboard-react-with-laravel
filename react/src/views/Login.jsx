"use client";

import { Card, TextInput, Label, Checkbox, Button, Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { createRef } from "react";

export default function Login() {
    
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [message, setMessage] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
            setMessage(response.data.message)
            }
        })
    }


    return (
        <div className="login-signup-form">
            <Card className="max-w-2xl">
                <h1 className="text-center text-3xl text-bold">
                    Login into your account
                </h1>
                {/* Login Form */}
                <form onSubmit={onSubmit} className="flex max-w-full flex-col gap-4" >

                    {message &&
                        <Alert color="failure" icon={HiInformationCircle}>
                            <span>
                                <p>
                                <span className="font-medium">
                                    Info alert!
                                </span>
                                    { message}
                                </p>
                            </span>
                        </Alert>
                     }

                    {/* Email */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput ref={emailRef}  placeholder="Email" type="email"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput ref={passwordRef} placeholder="Password" type="password"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit">Login</Button>

                    <p className="flex space-x-2  items-center">
                        <p className="message">Not Register?</p>
                        <p className="text-teal-500 ">
                            <Link to="/signup"> Create an account</Link>
                        </p>
                    </p>
                </form>
                {/* End Login Form */}
            </Card>
        </div>
    );
}
