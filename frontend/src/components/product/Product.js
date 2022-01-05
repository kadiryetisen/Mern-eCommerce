import { React, useContext, useState } from 'react'
import { Card, Row, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import Rating from './Rating'

const Product = ({ product }) => {
	const cart = useContext(CartContext)
	const auth = useContext(AuthContext)
	const [disabled, setDisabled] = useState(false)
	return (
		<>
			{!auth.admin ? (
				<>
					<Card className='my-3 p-3 rounded card h-100  d-flex flex-fill'>
						<Link to={`/detay/${product._id}`}>
							<Card.Img
								className='card-img-top '
								src={product.image}
								variant='top'
							/>
						</Link>

						<Card.Body>
							<h5> {product.name} </h5>

							<Card.Text as='h2'>
								{product.price}
								<span> &#8378; </span>
							</Card.Text>
						</Card.Body>

						<Row>
							<Rating
								value={product.rating}
								text={product.numReview}
								className='mb-3'
							></Rating>
						</Row>

						<Row>
							<ButtonGroup className='mt-3'>
								<Button
									bg='primary'
									disabled={!product.countInStock || disabled}
									onClick={() => {
										console.log(product.countInStock)
										const index = cart.products.findIndex(
											(x) => x['_id'] === product['_id']
										)
										if (index === -1) {
											cart.cartItem(product)
											return
										}
										let prod = cart.products[index]
										if (prod.qty === product.countInStock) {
											setDisabled(true)
										} else {
											cart.cartItem(product)
										}
									}}
								>
									{!product.countInStock || disabled ? 'SoldOut ' : 'Cart '}
								</Button>

								<Button
									as={Link}
									to={`/product/detail/${product._id}`}
									className='text-center bg-light text-dark'
								>
									Details
								</Button>
							</ButtonGroup>
						</Row>
					</Card>
				</>
			) : (
				<>
					<div>
						<Card className='my-3 p-3 rounded'>
							<Link to={`/detay/${product._id}`}>
								<Card.Img
									className='card-img-top '
									src={product.image}
									variant='top'
								/>
							</Link>

							<Card.Body>
								{product.name}

								<Card.Text as='h3'>
									{product.price}
									<span> &#36; </span>
								</Card.Text>
							</Card.Body>
							<Rating
								value={product.rating}
								text={product.numReview}
								className='mb-3'
							></Rating>

							<Row>
								<Button
									as={Link}
									to={`/panel/product/${product._id}`}
									className='text-center text-light mt-3'
								>
									Product Edit Page
								</Button>
							</Row>
						</Card>
					</div>
				</>
			)}
		</>
	)
}

export default Product
