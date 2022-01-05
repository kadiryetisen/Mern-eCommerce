import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from '../../../components/layouts/FormContainer'
import { React, useState, useContext, useEffect } from 'react'
import Message from '../../../components/layouts/Message'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import Loader from '../../../components/layouts/Loader'

const AddressForm = () => {
	const auth = useContext(AuthContext)

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [addressName, setAddressName] = useState('')
	const [address, setAddress] = useState('')
	const [country, setCountry] = useState()
	const [city, setCity] = useState('')
	const [district, setDistrict] = useState('')
	const [phone, setPhone] = useState('')
	const [nameError, setNameError] = useState('')
	const [surnameError, setSurnameError] = useState('')
	const [addressNameError, setAddressNameError] = useState('')
	const [addressError, setAddressError] = useState('')
	const [countryError, setCountryError] = useState('')
	const [cityError, setCityError] = useState('')
	const [districtError, setDistrictError] = useState('')
	const [phoneError, setPhoneError] = useState()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const [message, setMessage] = useState(false)

	axios.interceptors.request.use((config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${auth.token}`
		return config
	})

	useEffect(() => {
		if (error) {
			if (error.name) {
				setNameError(JSON.parse(JSON.stringify(error.name)))
			} else {
				setNameError(null)
			}
			if (error.surname) {
				setSurnameError(JSON.parse(JSON.stringify(error.surname)))
			} else {
				setSurnameError(null)
			}
			if (error.address) {
				setAddressError(JSON.parse(JSON.stringify(error.address)))
			} else {
				setAddressError(null)
			}
			if (error.addressName) {
				setAddressNameError(JSON.parse(JSON.stringify(error.addressName)))
			} else {
				setAddressNameError(null)
			}
			if (error.country) {
				setCountryError(JSON.parse(JSON.stringify(error.country)))
			} else {
				setCountryError(null)
			}
			if (error.city) {
				setCityError(JSON.parse(JSON.stringify(error.city)))
			} else {
				setCityError(null)
			}
			if (error.district) {
				setDistrictError(JSON.parse(JSON.stringify(error.district)))
			} else {
				setDistrictError(null)
			}
			if (error.phone) {
				setPhoneError(JSON.parse(JSON.stringify(error.phone)))
			} else {
				setPhoneError(null)
			}
		}
	}, [error])

	const submitHandler = async (event) => {
		event.preventDefault()

		try {
			const response = await axios.post('/auth/order/address', {
				name,
				surname,
				addressName,
				address,
				country,
				city,
				district,
				phone,
			})

			if (response.status === 201) {
				setLoading(false)
				setMessage(response.data.message)
				setTimeout(() => {
					setMessage(false)
				}, 3000)
			}
		} catch (err) {
			setLoading(false)
			setError(err.response.data.message)
		}
	}

	return (
		<>
			<>
				{loading && <Loader />}
				{message && <Message className='mt-3'>{message}</Message>}
				<FormContainer>
					<h1 className='text-center mb-3'>Add an address</h1>
					<Form onSubmit={submitHandler}>
						<Form.Group className='my-2'>
							<Row>
								<Col xs={6} sm={6} md={6} xl={6}>
									<Form.Control
										type='text'
										placeholder='Name'
										value={name}
										autoComplete='current-name'
										onChange={(e) => {
											setName(e.target.value)
											if (nameError) {
												setNameError((prev) => prev === null)
											}
										}}
									/>
									<Form.Text className='text-danger'>
										{nameError ? <strong>{nameError}</strong> : null}
									</Form.Text>
								</Col>

								<Col xs={6} sm={6} md={6} xl={6}>
									<Form.Control
										type='text'
										placeholder='Surname'
										value={surname}
										autoComplete='current-surname'
										onChange={(e) => {
											setSurname(e.target.value)
											if (surnameError) {
												setSurnameError((prev) => prev === null)
											}
										}}
									/>
									<Form.Text className='text-danger'>
										{surnameError ? <strong>{surnameError}</strong> : null}
									</Form.Text>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='my-3' controlId='addressName'>
							<Form.Control
								type='text'
								placeholder='Address Name'
								value={addressName}
								autoComplete='current-addressName'
								onChange={(e) => {
									setAddressName(e.target.value)
									if (addressNameError) {
										setAddressNameError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{addressNameError ? <strong>{addressNameError}</strong> : null}
							</Form.Text>
						</Form.Group>

						<Form.Group className='my-3' controlId='address'>
							<Form.Control
								as='textarea'
								type='text'
								placeholder='Address'
								value={address}
								autoComplete='current-address'
								onChange={(e) => {
									setAddress(e.target.value)
									if (addressError) {
										setAddressError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{addressError ? <strong>{addressError}</strong> : null}
							</Form.Text>
						</Form.Group>
						<Form.Group className='my-3' controlId='countryName'>
							<Form.Control
								type='text'
								placeholder='Country'
								value={country}
								autoComplete='current-country'
								onChange={(e) => {
									setCountry(e.target.value)
									if (countryError) {
										setCountryError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{countryError ? <strong>{countryError}</strong> : null}
							</Form.Text>
						</Form.Group>

						<Form.Group className='my-3' controlId='cityName'>
							<Form.Control
								type='text'
								placeholder='City'
								value={city}
								autoComplete='current-city'
								onChange={(e) => {
									setCity(e.target.value)
									if (cityError) {
										setCityError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{cityError ? <strong>{cityError}</strong> : null}
							</Form.Text>
						</Form.Group>
						<Form.Group className='my-3' controlId='district'>
							<Form.Control
								type='text'
								placeholder='District'
								value={district}
								autoComplete='current-district'
								onChange={(e) => {
									setDistrict(e.target.value)
									if (districtError) {
										setDistrictError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{districtError ? <strong>{districtError}</strong> : null}
							</Form.Text>
						</Form.Group>

						<Form.Group className='my-3' controlId='phoneNumber'>
							<Form.Control
								type='number'
								placeholder='Phone Number'
								value={phone}
								autoComplete='current-phone'
								onChange={(e) => {
									setPhone(e.target.value)
									if (phoneError) {
										setPhoneError((prev) => prev === null)
									}
								}}
							/>
							<Form.Text className='text-danger'>
								{phoneError ? <strong>{phoneError}</strong> : null}
							</Form.Text>
						</Form.Group>

						<div className='d-grid gap-2 '>
							<Button variant='primary' type='submit'>
								Submit Address
							</Button>
						</div>
					</Form>
				</FormContainer>
			</>
		</>
	)
}

export default AddressForm
