// packages
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
// layouts
import { Header } from './components/layouts/Header'
import { Footer } from './components/layouts/Footer'
//Context API
import { AuthContext } from './context/AuthContext'
import { CartContext } from './context/CartContext'
import { useAuth } from './hooks/auth-hooks'
import { useCart } from './hooks/cart-hooks'
//screens-public
import LoginScreen from './screens/public/LoginScreen'
import HomeScreen from './screens/public/HomeScreen'
import RegisterScreen from './screens/public/RegisterScreen'
import ForgotPasswordScreen from './screens/public/ForgotPasswordScreen'
import ProductDetailScreen from './screens/public/ProductDetailScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import CartScreen from './screens/public/CartScreen'

//screen-admin
import AdminPanelScreen from './screens/admin/AdminPanelScreen'
//screens-user
import UserProfilePanel from './screens/user/UserProfilePanel'
import OrderAdressScreen from './screens/user/OrderAddressScreen'
import OrderShippingScreen from './screens/user/OrderShippingScreen'
import OrderApproveScreen from './screens/user/OrderApproveScreen'
import OrderPaymentScreen from './screens/user/OrderPaymentScreen'

function App() {
	const { token, login, logout, userId, admin } = useAuth()

	const { cartItem, products, cartCount, cartSelectHandler } = useCart()

	let routes

	if (!token) {
		// PUBLIC ROUTES
		routes = (
			<Container>
				<main>
					<Routes>
						<Route
							path='/product/detail/:id'
							element={<ProductDetailScreen />}
						/>
						<Route path='/:pageNumber' element={<HomeScreen />} />
						<Route path='/cart' element={<CartScreen />} />
						<Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
						<Route path='/signup' element={<RegisterScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/' element={<HomeScreen />} />
					</Routes>
				</main>
			</Container>
		)
	} else {
		// USER ROUTES

		if (token && !admin) {
			routes = (
				<Container>
					<main>
						<Routes>
							<Route path='/order/4' element={<OrderPaymentScreen />} />
							<Route path='/order/3' element={<OrderApproveScreen />} />
							<Route path='/order/2' element={<OrderShippingScreen />} />
							<Route path='/order/1' element={<OrderAdressScreen />} />
							<Route path='/:pageNumber' element={<HomeScreen />} exact />
							<Route path='/cart' element={<CartScreen />} />
							<Route path='/profile/:id' element={<UserProfilePanel />} />
							<Route path='/' element={<HomeScreen />} exact />
						</Routes>
					</main>
				</Container>
			)
		} else {
			// ADMIN ROUTES

			routes = (
				<Container>
					<main>
						<Routes>
							<Route
								path='/panel/product/:id'
								element={<ProductEditScreen />}
							/>
							<Route path='/panel' element={<AdminPanelScreen />} />
							<Route path='/:pageNumber' element={<HomeScreen />} />
							<Route path='/' element={<HomeScreen />} />
						</Routes>
					</main>
				</Container>
			)
		}
	}

	return (
		<div>
			<AuthContext.Provider
				value={{
					isLoggedIn: !!token,
					admin: admin,
					token: token,
					userId: userId,
					login: login,
					logout: logout,
				}}
			>
				<CartContext.Provider
					value={{
						cartItem: cartItem,
						products: products,
						cartCount: cartCount,
						cartSelectHandler: cartSelectHandler,
					}}
				>
					<Header />
					{routes}
				</CartContext.Provider>
				<Footer />
			</AuthContext.Provider>
		</div>
	)
}

export default App
