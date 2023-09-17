import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { Table, Button, Card } from "flowbite-react";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="container">

    <div className="w-full sidebar" >
        <h3> User</h3>
        <Link className="btn-add" to="/users/new"> <Button color="success"> New User </Button></Link>
    </div>

    <Table hoverable>
        <Table.Head >
            <Table.HeadCell> ID </Table.HeadCell>
            <Table.HeadCell> Name </Table.HeadCell>
            <Table.HeadCell> Email </Table.HeadCell>
            <Table.HeadCell> Create Date </Table.HeadCell>
            <Table.HeadCell> Action </Table.HeadCell>
        </Table.Head>

        {loading &&
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Loading..!
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        }

        {!loading &&
            <Table.Body className="divide-y">
                {users.map(u => (
                    <Table.Row  key={u.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {u.id}
                    </Table.Cell>
                    <Table.Cell> {u.name} </Table.Cell>
                    <Table.Cell> {u.email} </Table.Cell>
                    <Table.Cell> {u.created_at} </Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                            <Button color="info"><Link to={'/users/' + u.id}>Edit</Link> </Button>
                            <Button onClick={ev => onDeleteClick(u)} color="failure"> Delete </Button>
                        </Button.Group>
                    </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        }
    </Table>
</div>
  )
}
