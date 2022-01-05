import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../components/layouts/FormContainer'
import Loader from '../../components/layouts/Loader'
import { AuthContext } from '../../context/AuthContext'
const ProductEditScreen = () => {
	const prodId = useParams().id
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	useEffect(() => {
		const getProducts = async () => {
			try {
				axios.interceptors.request.use((config) => {
					config.headers['Content-Type'] = 'application/json'
					return config
				})
				const { data } = await axios.get(`/admin/product/${prodId}`)

				if (data) {
					setName(data.name)
					setPrice(data.price)
					setImage(data.image)
					setBrand(data.brand)
					setCountInStock(data.countInStock)
					setCategory(data.category)
					setDescription(data.description)
				}
			} catch (err) {
				if (err.response.data.status === 401) {
					auth.logout()
				}

				setError(err.response.data.message)
			}
		}
		getProducts()
	}, [prodId, auth])

	const submitHandler = async (e) => {
		e.preventDefault()
		axios.interceptors.request.use((config) => {
			config.headers['Content-Type'] = 'application/json'
			return config
		})
		try {
			setLoading(true)
			await axios.put(`/admin/product/update/${prodId}`, {
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
			setLoading(false)
			navigate('/panel')
		} catch (err) {
			if (err.response.data.status === 401) {
				auth.logout()
			}
			setLoading(false)
			setError(err.response.data.message)
		}
	}

	return (
		<>
			<Link to='/panel' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading && <Loader />}
			{error ? (
				<h3>{error}</h3>
			) : (
				<FormContainer>
					<h1>Item : {name} </h1>
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => {
									setBrand(e.target.value)
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				</FormContainer>
			)}
		</>
	)
}

export default ProductEditScreen
