import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../../components/layouts/FormContainer'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/layouts/Loader'
import axios from 'axios'
const LoginScreen = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState()

	const showPasswordButton = () => {
		setShowPassword(!showPassword)
	}

	useEffect(() => {
		if (error) {
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
				'/public/user/login',
				{
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
		<>
			{loading && <Loader />}
			<FormContainer>
				<h1 className='text-center mb-5'>Login</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group className='my-3' controlId='loginEmail'>
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

					<Form.Group className='my-3' controlId='loginPassword'>
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
					<Row>
						<Col>
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
						</Col>
					</Row>
					<div className='d-grid gap-2 mb-2'>
						<Button variant='primary' type='submit'>
							Login
						</Button>
					</div>
					<Link className='text-dark' to={'/forgotpassword'}>
						Forgot My Password
					</Link>
				</Form>

				<Row className='py-3'>
					<Col>
						Don't have an account ?
						<Link className='text-dark' to={'/signup'}>
							Register
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	)
}

export default LoginScreen
