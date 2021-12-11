import { React, useState, useContext, useEffect } from 'react'
import FormContainer from '../../components/layouts/FormContainer.js'
import { Form, Button, InputGroup, FormControl, Col } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/layouts/Loader'
import { useNavigate } from 'react-router-dom'
import SuccessMessage from '../../components/layouts/SuccessMessage'
import Message from '../../components/layouts/Message'
import { AuthContext } from '../../context/AuthContext'
const ForgotPasswordScreen = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [resetCode, setResetCode] = useState(false)
	const [codeError, setCodeError] = useState(false)

	const submitHandler = async (e) => {
		e.preventDefault()

		try {
			setLoading(true)
			axios.interceptors.request.use((config) => {
				config.headers['Content-Type'] = 'application/json'
				return config
			})
			await axios.post('public/user/forgotPassword', {
				email,
			})

			setLoading(false)
			setSuccess(true)
		} catch (err) {
			setLoading(false)
			setEmailError(err.response.data.message)
		}
	}

	useEffect(() => {
		if (codeError) {
			setCodeError(codeError)
		}
	}, [codeError])

	const resetCodeHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await axios.post(
				'public/user/reset-password',
				{
					resetCode,
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
			setCodeError(err.response.data.message)
		}
	}

	return (
		<>
			{loading ? <Loader /> : null}
			<FormContainer>
				{}
				{success ? (
					<>
						<Form className={resetCodeHandler}>
							<SuccessMessage email={email} />
							<Col className='m-auto' md={6}>
								<InputGroup size='sm' className='mb-3'>
									<FormControl
										type='text'
										placeholder='Enter Code'
										name={resetCode}
										onChange={(e) => {
											e.target.value = e.target.value.toUpperCase()
											setResetCode(e.target.value)
											if (codeError) {
												setCodeError((prev) => prev === null)
											}
										}}
										maxLength='5'
									/>
									<Button
										onClick={resetCodeHandler}
										variant='outline-primary'
										id='button-addon2'
									>
										Send
									</Button>
								</InputGroup>
							</Col>
						</Form>
					</>
				) : (
					<>
						<h1 className='text-center mb-5'>Forgot My Password</h1>
						<Form onSubmit={submitHandler}>
							<Form.Group className='my-3' controlId='email'>
								<Form.Control
									type='text'
									placeholder='Email'
									value={email}
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
							<div className='d-grid gap-2 '>
								<Button variant='primary' type='submit'>
									Enter your email
								</Button>
							</div>
						</Form>
					</>
				)}
				{codeError && <Message variant={'danger'}>{codeError}</Message>}
			</FormContainer>
		</>
	)
}

export default ForgotPasswordScreen
