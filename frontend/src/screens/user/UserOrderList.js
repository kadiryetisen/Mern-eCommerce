import { React, useContext, useEffect, useState } from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Loader from '../../components/layouts/Loader'
import Message from '../../components/layouts/Message'
const UserOrderList = () => {
	const [loading, setLoading] = useState(false)
	const userId = useParams().id
	const [error, setError] = useState()
	const [user, setUser] = useState({})
	const auth = useContext(AuthContext)

	axios.interceptors.request.use((config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${auth.token}`
		return config
	})
	useEffect(() => {
		const getProducts = async () => {
			try {
				setLoading(true)
				const { data } = await axios.get(`/auth/user/info/${userId}`)
				console.log(data)
				setUser(data)
				setLoading(false)
			} catch (err) {
				if (err.response.status === 401) {
					setError(err.response.data.message)
					auth.logout()
				}

				setLoading(false)
			}
		}
		getProducts()
	}, [userId, auth])

	return (
		<>
			{loading && <Loader />}
			{error ? (
				<Message>{error}</Message>
			) : (
				<Row>
					<Col>
						<Card md={9}>
							<Card.Title className='border p-3'>My Order List</Card.Title>
							<Card.Body>
								<Row>
									<Col md={3}>
										<Card.Img src={user.image}></Card.Img>
									</Col>
									<Col md={6}>
										<h4>
											{user.name} {user.surname}
										</h4>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default UserOrderList
