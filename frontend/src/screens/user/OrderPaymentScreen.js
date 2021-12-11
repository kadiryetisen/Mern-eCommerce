import { Row, Button } from 'react-bootstrap'
import OrderStepper from '../../components/layouts/OrderStepper'
import { useNavigate } from 'react-router-dom'
const OrderPaymentScreen = () => {
	const navigate = useNavigate()
	return (
		<>
			<Row className='mb-3'>
				<OrderStepper stepCount={3} className='mb-3'></OrderStepper>
			</Row>
			<div> PAYMENT</div>
			<Button
				onClick={() => {
					navigate('/')
				}}
			>
				FINISH
			</Button>
		</>
	)
}

export default OrderPaymentScreen
