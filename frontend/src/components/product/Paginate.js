import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

const Paginate = ({ pages, page }) => {
	const location = useLocation()
	const path = location.pathname
	const baseURL = path.split('/')[0] === '/' ? '' : path.split('/')[0]

	if (pages <= 1) return null
	return (
		<Pagination className='justify-content-end my-3'>
			{[...Array(pages).keys()].map((p) => (
				<LinkContainer key={p} to={`${baseURL}/${p + 1}`}>
					<Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
				</LinkContainer>
			))}
		</Pagination>
	)
}

export default Paginate
