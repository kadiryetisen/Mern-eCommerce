import { React, useContext, useState } from 'react'
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import CartIcon from './CartIcon'
import style from '../../style/header.module.css'
export const Header = () => {
	const [cookieInfo, setCookieInfo] = useState(true)
	const auth = useContext(AuthContext)
	const cart = useContext(CartContext)

	return (
		<>
			{cookieInfo ? (
				<header className=' header-nav pt-3 ps-5 border-bottom border-dark'>
					<Row className='content-center'>
						<Col md={1}>
							<i className={`${style['cookie-icon']} fas fa-cookie `}></i>
						</Col>
						<Col md={9}>
							<p>
								YETİŞENLER Company uses COOKIES on this site. Some are strictly
								necessary to run the site and others are used for measuring site
								usage.
							</p>
						</Col>
						<Col className='mb-3' md={2}>
							<Button
								onClick={() => {
									setCookieInfo(false)
								}}
								className={`${style['cookie-button']} px-5 `}
							>
								Accept
							</Button>
						</Col>
					</Row>

					<Row>
						<Col></Col>
					</Row>
				</header>
			) : (
				<Row className='m-3'></Row>
			)}

			<Container>
				<Navbar className='border-bottom  border-dark py-3 ' expand='lg'>
					<Navbar.Brand className='brand-nav' as={Link} to='/'>
						<h3>Yetişenler</h3>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto '>
							{!auth.isLoggedIn && (
								<>
									{' '}
									<Nav.Item
										className={style['header-item']}
										as={Link}
										to={'/login'}
									>
										Login
									</Nav.Item>
									<Nav.Item
										as={Link}
										to={'/signup'}
										className={style['header-item']}
									>
										Sign Up
									</Nav.Item>
									<Nav.Item as={Link} to={'/'}></Nav.Item>
									<Nav.Item as={Link} to={'/cart'}>
										<CartIcon cartItem={cart.cartCount}></CartIcon>
									</Nav.Item>
								</>
							)}
							{auth.isLoggedIn && !auth.admin && (
								<>
									<Nav.Item
										as={Link}
										to={`/profile/${auth.userId}`}
										className={style['header-item']}
									>
										Profile
									</Nav.Item>
									<Nav.Item
										onClick={auth.logout}
										as={Link}
										to={'/'}
										className={style['header-item']}
									>
										Logout
									</Nav.Item>
									<Nav.Item as={Link} to={'/'}>
										<Nav.Item
											as={Link}
											to={'/cart'}
											className={style['header-item']}
										>
											<CartIcon cartItem={cart.cartCount}></CartIcon>
										</Nav.Item>
									</Nav.Item>
								</>
							)}
							{auth.isLoggedIn && auth.admin && (
								<>
									<Nav.Item as={Link} to={'/'} className={style['header-item']}>
										Home
									</Nav.Item>
									<Nav.Item
										as={Link}
										to={'/panel'}
										className={style['header-item']}
									>
										Admin Panel
									</Nav.Item>
									<Nav.Item
										onClick={auth.logout}
										as={Link}
										to={'/'}
										className={style['header-item']}
									>
										Logout
									</Nav.Item>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</>
	)
}
