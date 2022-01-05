import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import FormContainer from '../../components/layouts/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/layouts/Loader'

const RegisterScreen = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [nameError, setNameError] = useState(null)
	const [surnameError, setSurnameError] = useState(null)
	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState()
	const showPasswordButton = () => {
		setShowPassword(!showPassword)
	}
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
			if (error.email) {
				setEmailError(JSON.parse(JSON.stringify(error.email)))
			} else {
				setEmailError(null)
			}
			if (error.password) {
				setPasswordError(JSON.parse(JSON.stringify(error.password)))
			} else {
				setPasswordError(null)
			}
		}
	}, [error])

	const submitHandler = async (event) => {
		event.preventDefault()
		setLoading(true)
		try {
			const response = await axios.post(
				'public/user/register',
				{
					name,
					surname,
					email,
					password,
				},
				{
					'Content-Type': 'application/json',
				}
			)

			if (response.status === 201) {
				const { id, token, isAdmin } = response.data.user
				auth.login(id, token, isAdmin)
				navigate('/')
			}
		} catch (err) {
			setLoading(false)
			setError(err.response.data.message)
		}
	}

	return (
		<FormContainer>
			{loading && <Loader />}
			<h1 className='text-center mb-3'>Sıgn Up</h1>
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
				<Form.Group className='my-3' controlId='signupEmail'>
					<Form.Control
						type='text'
						placeholder='Email'
						value={email}
						autoComplete='current-email'
						onChange={(e) => {
							setEmail(e.target.value)
							if (emailError) {
								setEmailError((prev) => prev === null)
							}
						}}
					/>
					<Form.Text className='text-danger'>
						{emailError ? <strong>{emailError}</strong> : null}
					</Form.Text>
				</Form.Group>

				<Form.Group className='my-3' controlId='signupPassword'>
					<Form.Control
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						value={password}
						autoComplete='current-password'
						onChange={(e) => {
							setPassword(e.target.value)
							if (passwordError) {
								setPasswordError((prev) => null)
								if (passwordError) {
									setPasswordError((prev) => prev === null)
								}
							}
						}}
					/>
					<Form.Text className='text-danger'>
						{passwordError ? <strong>{passwordError}</strong> : null}
					</Form.Text>
				</Form.Group>

				<Form.Group
					className='mb-3'
					controlId='showPass'
					onClick={showPasswordButton}
				>
					<Form.Check
						className='text-dark'
						type='checkbox'
						label='Show Password'
					/>
				</Form.Group>

				<div className='d-grid gap-2 '>
					<Button variant='primary' type='submit'>
						Register
					</Button>
				</div>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an account ? <Link to={'/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
