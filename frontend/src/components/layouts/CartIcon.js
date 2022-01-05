import * as React from 'react'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function CartIcon({ cartItem }) {
	return (
		<Badge
			badgeContent={cartItem}
			color='primary'
			sx={{
				borderColor: 'primary.light',
				'& .MuiDataGrid-cell:hover': {
					color: 'primary.main',
				},
			}}
			showZero
		>
			<ShoppingCartIcon sx={{ fontSize: 40 }} />
		</Badge>
	)
}
