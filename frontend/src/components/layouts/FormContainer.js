import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row className='justify-content-md-center mt-2'>
				<Col xl={6} xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default FormContainer
