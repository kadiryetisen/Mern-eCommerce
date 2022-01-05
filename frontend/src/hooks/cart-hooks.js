import { useState, useCallback, useEffect } from 'react'

export const useCart = () => {
	const [cartCount, setCartCount] = useState(0)
	const [products, setProducts] = useState([])

	const cartItem = useCallback(
		(prod) => {
			setCartCount((prev) => prev + 1)
			const storageProducts = products.length >= 1 ? [...products] : [prod]
			const storageCartQuantity = cartCount >= 1 ? cartCount + 1 : 1

			const existingProduct = storageProducts.find(
				(x) => x['_id'] === prod['_id']
			)
			const index = products.findIndex((x) => x['_id'] === prod['_id'])
			if (existingProduct) {
				existingProduct.qty += 1
				if (!existingProduct.qty) {
					existingProduct.qty = 1
				}

				storageProducts[index] = existingProduct
				setProducts(storageProducts)
			} else {
				prod.qty = 1
				setProducts([...storageProducts, prod])
				storageProducts.push(prod)
			}

			localStorage.setItem(
				'CartItems',
				JSON.stringify({
					products: storageProducts,
					qty: storageCartQuantity,
				})
			)
		},
		[products, cartCount]
	)

	const onRefresh = useCallback((prods, qty) => {
		setProducts(prods)
		setCartCount(qty)
	}, [])

	const cartSelectHandler = useCallback(
		(prod, qty) => {
			const storedData = JSON.parse(localStorage.getItem('CartItems'))
			const index = products.findIndex((x) => x['_id'] === prod['_id'])

			if (qty !== 0) {
				if (storedData.products[index].qty >= qty) {
					let differ = storedData.products[index].qty - qty
					storedData.qty -= differ
					storedData.products[index].qty = qty

					setProducts(storedData.products)
					setCartCount(storedData.qty)
					localStorage.setItem(
						'CartItems',
						JSON.stringify({
							products: storedData.products,
							qty: storedData.qty,
						})
					)
				} else {
					let differ = qty - storedData.products[index].qty
					storedData.qty += differ
					storedData.products[index].qty = qty
					setProducts(storedData.products)
					setCartCount(storedData.qty)
					localStorage.setItem(
						'CartItems',
						JSON.stringify({
							products: storedData.products,
							qty: storedData.qty,
						})
					)
				}
			} else {
				let differ = storedData.products[index].qty - qty
				storedData.qty -= differ
				storedData.products[index].qty = qty
				const updatedData = storedData.products.filter(
					(prd) => prd._id !== prod._id
				)

				console.log(updatedData)
				setProducts(updatedData)
				setCartCount(storedData.qty)
				localStorage.setItem(
					'CartItems',
					JSON.stringify({
						products: updatedData,
						qty: storedData.qty,
					})
				)
			}
		},
		[products]
	)

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('CartItems'))
		if (storedData) {
			onRefresh(storedData.products, storedData.qty)
		}
	}, [onRefresh])

	return { cartItem, products, cartCount, cartSelectHandler }
}
