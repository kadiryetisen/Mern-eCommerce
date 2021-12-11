import { React, useState, useContext, useEffect } from 'react'
import FormContainer from '../../components/layouts/FormContainer'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/layouts/Loader'
import Message from '../../components/layouts/Message'
const AddProductScreen = () => {
	const auth = useContext(AuthContext)
	const [name, setName] = useState(null)
	const [image, setImage] = useState(null)
	const [brand, setBrand] = useState(null)
	const [category, setCategory] = useState(null)
	const [description, setDescription] = useState(null)
	const [price, setPrice] = useState(null)
	const [countInStock, setCountInStock] = useState(null)
	const [error, setError] = useState(null)
	const [nameError, setNameError] = useState(null)
	const [categoryError, setCategoryError] = useState(null)
	const [priceError, setPriceError] = useState(null)
	const [countInStockError, setCountInStockError] = useState(null)
	const [brandError, setBrandError] = useState(null)
	const [imageError, setImageError] = useState(null)
	const [descriptionError, setDescriptionError] = useState(null)
	const [loading, setLoading] = useState()
	const [successMessage, setSuccessMessage] = useState(false)
	useEffect(() => {
		if (error) {
			if (error.name) {
				setNameError(JSON.parse(JSON.stringify(error.name)))
			} else {
				setNameError(null)
			}
			if (error.category) {
				setCategoryError(JSON.parse(JSON.stringify(error.category)))
			} else {
				setNameError(null)
			}
			if (error.description) {
				setDescriptionError(JSON.parse(JSON.stringify(error.description)))
			} else {
				setDescriptionError(null)
			}
			if (error.price) {
				setPriceError(JSON.parse(JSON.stringify(error.price)))
			} else {
				setPriceError(null)
			}
			if (error.description) {
				setDescriptionError(JSON.parse(JSON.stringify(error.description)))
			} else {
				setDescriptionError(null)
			}
			if (error.brand) {
				setBrandError(JSON.parse(JSON.stringify(error.brand)))
			} else {
				setBrandError(null)
			}
			if (error.image) {
				setImageError(JSON.parse(JSON.stringify(error.image)))
			} else {
				setImageError(null)
			}
			if (error.countInStock) {
				setCountInStockError(JSON.parse(JSON.stringify(error.countInStock)))
			} else {
				setCountInStockError(null)
			}
		}
	}, [error])

	const submitHandler = async (event) => {
		event.preventDefault()
		setLoading(true)
		try {
			axios.interceptors.request.use((config) => {
				config.headers['Authorization'] = `Bearer ${auth.token}`
				config.headers['Content-Type'] = 'application/json'
				return config
			})

			const response = await axios.post('/admin/product/add-product', {
				name,
				image,
				brand,
				category,
				description,
				price,
				countInStock,
			})
			setSuccessMessage(response.data.message)
			setLoading(false)
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
			{loading && <Loader />}
			{successMessage && (
				<Message variant={'success'}>{successMessage} </Message>
			)}
			<h1 className='text-center mb-3'>New Product</h1>

			<FormContainer>
				<Form onSubmit={submitHandler}>
					<Form.Group className='my-3' controlId='productName'>
						<Form.Control
							type='text'
							placeholder='Product Name'
							value={name}
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
					</Form.Group>
					<Form.Group className='my-3' controlId='productCategory'>
						<Form.Control
							type='text'
							placeholder='Product Category'
							value={category}
							onChange={(e) => {
								setCategory(e.target.value)
								if (categoryError) {
									setCategoryError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{categoryError ? <strong>{categoryError}</strong> : null}
						</Form.Text>
					</Form.Group>

					<Form.Group className='my-3' controlId='productBrand'>
						<Form.Control
							type='text'
							placeholder='Product Brand'
							value={brand}
							onChange={(e) => {
								setBrand(e.target.value)
								if (brandError) {
									setBrandError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{brandError ? <strong>{brandError}</strong> : null}
						</Form.Text>
					</Form.Group>

					<Form.Group className='my-3' controlId='productPrice'>
						<Form.Control
							type='number'
							placeholder='Product Price'
							value={price}
							onChange={(e) => {
								setPrice(e.target.value)
								if (priceError) {
									setPriceError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{priceError ? <strong>{priceError}</strong> : null}
						</Form.Text>
					</Form.Group>

					<Form.Group className='my-3' controlId='productDescription'>
						<Form.Control
							type='text'
							placeholder='Product Description'
							value={description}
							onChange={(e) => {
								setDescription(e.target.value)
								if (descriptionError) {
									setDescriptionError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{descriptionError ? <strong>{descriptionError}</strong> : null}
						</Form.Text>
					</Form.Group>

					<Form.Group className='my-3' controlId='productStock'>
						<Form.Control
							type='number'
							placeholder='Product Stock'
							value={countInStock}
							onChange={(e) => {
								setCountInStock(e.target.value)
								if (countInStockError) {
									setCountInStockError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{countInStockError ? <strong>{countInStockError}</strong> : null}
						</Form.Text>
					</Form.Group>
					<Form.Group className='my-3' controlId='productImage'>
						<Form.Control
							type='text'
							placeholder='Product Image'
							value={image}
							onChange={(e) => {
								setImage(e.target.value)
								if (imageError) {
									setImageError((prev) => prev === null)
								}
							}}
						/>
						<Form.Text className='text-danger'>
							{imageError ? <strong>{imageError}</strong> : null}
						</Form.Text>
					</Form.Group>

					<div className='d-grid gap-2'>
						<Button variant='primary' type='submit'>
							Add Product
						</Button>
					</div>
				</Form>
			</FormContainer>
		</>
	)
}

export default AddProductScreen
