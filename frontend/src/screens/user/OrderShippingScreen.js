import { Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import OrderStepper from '../../components/layouts/OrderStepper'

const OrderShippingStep = () => {
	const navigate = useNavigate()
	return (
		<>
			<Row className='mb-3'>
				<OrderStepper stepCount={1} className='mb-3'></OrderStepper>
			</Row>
			<div> ShippingPage</div>
			<Button
				onClick={() => {
					navigate('/order/3')
				}}
			>
				Pass
			</Button>
		</>
	)
}

export default OrderShippingStep
