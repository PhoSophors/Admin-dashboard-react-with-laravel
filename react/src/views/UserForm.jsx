import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { Card,Label, Button, TextInput, Alert , Spinner, Breadcrumb} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';

export default function UserForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [user, setUser] = useState({
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if (id) {
      useEffect(() => {
        setLoading(true)
        axiosClient.get(`/users/${id}`)
          .then(({data}) => {
            setLoading(false)
            setUser(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
    }

    const onSubmit = ev => {
      ev.preventDefault()
      if (user.id) {
        axiosClient.put(`/users/${user.id}`, user)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      } else {
        axiosClient.post('/users', user)
          .then(() => {
            setNotification('User was successfully created')
            navigate('/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    }

  return (
    <>
      <div className="userForm">
    <Breadcrumb  aria-label="Solid w-full background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-900" >
        <Breadcrumb.Item onClick={() => navigate(-1)} href="#" icon={HiUser}>
            <p> User</p>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            Create New Account
        </Breadcrumb.Item>
    </Breadcrumb>

      <Card className="max-w-full">
        <h1 className="text-center text-3xl text-bold">
            Create New Account
        </h1>
        {loading && (
            <Spinner aria-label="Extra large spinner example" size="xl" />
        )}
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

        {/* Login Form */}
        {!loading && (
        <form onSubmit={onSubmit} className="flex max-w-full flex-col gap-4" >
        {/* {!loading && ( */}
            {/* FullName */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="f-Name" value="Full Name" />
                </div>
                <TextInput value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Full Name" />
            </div>

            {/* Email */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email Address" />
                </div>
                <TextInput value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}  placeholder="Email" />
            </div>

            {/* Password */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                </div>
                <TextInput type="password" onChange={ev => setUser({...user, password: ev.target.value})}  placeholder="Password"  />
            </div>

            {/* Password Confirmation */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Password Confirmation" />
                </div>
                <TextInput type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation" />
            </div>

            {/* submit */}
            <Button type="submit">Signup</Button>

        </form>
                )}
        {/* End Login Form */}
    </Card>
    </div>
    </>
  )
}
