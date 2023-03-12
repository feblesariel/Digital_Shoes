import React, { Component } from 'react';
import ProductList from './ProductList';

class Bottom extends Component {

	constructor() {
		super()
		this.state = {
			productsList: []
		}
	}

	componentDidMount() {
		fetch('/api/products')
			.then(respuesta => {
				return respuesta.json()
			})
			.then(productos => {
				this.setState({ productsList: productos.data })
			})
			.catch(error => console.log(error))
	}
	render() {
		return (

			<React.Fragment>

				<h2>Todos los productos</h2>

				<div className="card shadow mb-4">
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Nombre</th>
										<th>Precio</th>
										<th>ID CAT</th>
									</tr>
								</thead>

								<tbody>
									{
										this.state.productsList.map((producto, index) => {
											return <ProductList  {...producto} key={index} />
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>

			</React.Fragment>
		)
	}
}

export default Bottom;