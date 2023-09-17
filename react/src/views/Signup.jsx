"use client";

import { Card, TextInput, Label, Checkbox, Button, Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';

import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";


export default function Signup() {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
      ev.preventDefault()

      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }
      axiosClient.post('/signup', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token);
        })
        .catch(err => {

          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }

    return (
        <div className=" login-signup-form ">
            <Card className="max-w-3xl hhh">
                <h1 className="text-center text-3xl text-bold">
                    Create New Account
                </h1>
                {/* Login Form */}
                <form onSubmit={onSubmit} className="flex max-w-full flex-col gap-4" >

                    {errors &&
                        <Alert color="failure" icon={HiInformationCircle} >
                             <span>
                                {Object.keys(errors).map(key => (
                                     <p key={key}>
                                        <span className="font-medium"> Info alert! </span>
                                        {errors[key][0]}
                                    </p>
                                ))}
                            </span>
                        </Alert>
                    }


                    {/* FullName */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="f-Name" value="Full Name" />
                        </div>
                        <TextInput ref={nameRef}  placeholder="Full Name" />
                    </div>

                    {/* Email */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email Address" />
                        </div>
                        <TextInput ref={emailRef} id="email1" placeholder="Email"  type="email"/>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput ref={passwordRef} id="password" placeholder="Password"  type="password" />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Password Confirmation" />
                        </div>
                        <TextInput ref={passwordConfirmationRef} id="password1" placeholder="Password Confirmation" type="password" />
                    </div>

                    {/* remenber */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    {/* submit */}
                    <Button type="submit">Signup</Button>

                    <p className="flex space-x-2  items-center">
                        <p className="message">Already Register?</p>
                        <p className="text-teal-500 ">
                            <Link to="/login">Login</Link>
                        </p>
                    </p>
                </form>
                {/* End Login Form */}
            </Card>
        </div>
    );
}
