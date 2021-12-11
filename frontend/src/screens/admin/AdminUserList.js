import { React, useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { Button, Table } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/layouts/Loader'

const AdminUserList = () => {
	const componentMounted = useRef(true)
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const auth = useContext(AuthContext)

	axios.interceptors.request.use((config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${auth.token}`
		return config
	})
	useEffect(() => {
		const getUsers = async () => {
			try {
				setLoading(true)
				const { data } = await axios.get('/admin/user/all')

				if (componentMounted.current) {
					setUsers(data)

					setLoading(false)
				}
				return () => {
					componentMounted.current = false
				}
			} catch (err) {
				if (err.response.data.status === 401) {
					auth.logout()
				}
				setLoading(false)
				setError(err.response.data.message)
			}
		}
		getUsers()
	}, [auth])

	const deleteHandler = async (user) => {
		if (window.confirm(`Are you sure to delete ${user._id} ?`)) {
			try {
				setLoading(true)

				const { data } = await axios.delete(`admin/user/delete/${user._id}`)

				const latestUsers = data.users
				setUsers(latestUsers)
				setLoading(false)
			} catch (err) {
				setLoading(false)
				setError(err)
			}
		}
	}

	return (
		<div>
			{loading && <Loader />}
			{error ? (
				error
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									<Button
										variant='danger'
										className='btn-sm '
										onClick={() => deleteHandler(user)}
									>
										<i className='fas fa-trash fa-xl'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	)
}

export default AdminUserList
