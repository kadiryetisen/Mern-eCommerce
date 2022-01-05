import { React, useState, useContext, useEffect } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ButtonGroup } from '@mui/material'
import Message from '../../../components/layouts/Message'
import axios from 'axios'
import Loader from '../../../components/layouts/Loader'
import { AuthContext } from '../../../context/AuthContext'

const AddressList = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [allAddresses, setAllAddresses] = useState([])
	const [message, setMessage] = useState(false)

	const deleteAddressHandler = async (id) => {
		setLoading(true)
		try {
			const response = await axios.put('/auth/order/delete/address', {
				id,
			})

			if (response.status === 201) {
				setLoading(false)
				setAllAddresses(response.data.addressList)
				setMessage(response.data.message)
				setTimeout(() => {
					setMessage(false)
				}, 5000)
			}
		} catch (err) {
			setLoading(false)
			setMessage(err.response.data.message)
		}
	}
	useEffect(() => {
		const myAddress = async () => {
			const response = await axios.get('/auth/order/all/addresses')

			if (response.status === 201) {
				setAllAddresses(response.data.addresses)
			} else {
				setMessage(response.error.data.message)
			}
		}
		myAddress()
	}, [auth])
	return (
		<>
			<Row>
				{loading && <Loader />}
				{message && <Message>{message}</Message>}
				{allAddresses.map((adr) => (
					<>
						<Col key={adr._id} md={4}>
							<Card className='my-3 p-3 rounded card h-100  d-flex flex-fill'>
								<Card.Header className='pb-3'>
									<Row> {adr.addressName}</Row>
									<Row>
										<small>
											{' '}
											{adr.name} {adr.surname}
										</small>
									</Row>
								</Card.Header>
								<Card.Body className='pb-5'>
									<Row>{adr.address}</Row>
								</Card.Body>
								<Card.Footer>
									<ButtonGroup>
										<Button
											onClick={() => {
												deleteAddressHandler(adr._id)
											}}
											className='bg-light text-dark'
										>
											Delete
										</Button>
										<Button
											className='bg-danger'
											onClick={() => {
												navigate('/order/2')
											}}
										>
											Select
										</Button>
									</ButtonGroup>
								</Card.Footer>
							</Card>
						</Col>
					</>
				))}
			</Row>
		</>
	)
}

export default AddressList
