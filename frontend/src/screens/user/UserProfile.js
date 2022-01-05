import { React, useContext, useEffect, useState } from 'react'
import { Col, Row, Card, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Loader from '../../components/layouts/Loader'
import Message from '../../components/layouts/Message'
import EditIcon from '@mui/icons-material/Edit'

const UserProfile = () => {
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
						<Card md={12}>
							<Card.Title className='border p-3'>
								<Row>
									<Col className='text-dark'>My Profile</Col>
									<Col className='text-end'>
										<EditIcon></EditIcon>
									</Col>
								</Row>
							</Card.Title>

							<Card.Body>
								<Row>
									<Col md={3}>
										<Card.Img src={user.image} rounded></Card.Img>
									</Col>
									<Row>
										<Col md={6}>
											<h4>
												{user.name} {user.surname}
											</h4>
										</Col>
									</Row>
									<Col md={3} className='justify-content-center'>
										<Form.Group className='my-3' controlId='signupPassword'>
											<Form.Control
												type='text'
												placeholder='Password'
												autoComplete='current-password'
											/>
										</Form.Group>
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

export default UserProfile
