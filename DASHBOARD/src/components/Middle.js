import React, { Component } from 'react';

class Middle extends Component {

    constructor() {
        super()
        this.state = {
            productsList: {},
            usersList: {}
        }
    }

    componentDidMount() {

        fetch('/api/users')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(array => {

                let m = 0;

                for (let index = 0; index < array.users.length; index++) {
                    if (array.users[index].id > m) {
                        m = array.users[index].id
                    }
                }

                for (let index = 0; index < array.users.length; index++) {
                    if (array.users[index].id === m) {
                        this.setState({ usersList: array.users[index] })
                    }
                }
            })
            .catch(error => console.log(error))


        fetch('/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(array => {

                let m = 0;

                for (let index = 0; index < array.data.length; index++) {
                    if (array.data[index].id > m) {
                        m = array.data[index].id
                    }
                }

                for (let index = 0; index < array.data.length; index++) {
                    if (array.data[index].id === m) {
                        this.setState({ productsList: array.data[index] })
                    }
                }
            })
            .catch(error => console.log(error))

    }
    render() {

        return (
            <React.Fragment>

                <h2>Estadisticas</h2>

                <div className="row">

                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Ultimo usuario creado</h5>
                            </div>
                            <div className="card-body">
                                <p>id: {this.state.usersList.id}</p>
                                <p>Nombre: {this.state.usersList.nombre}</p>
                                <p>Email: {this.state.usersList.email}</p>
                                <p>Rol: {this.state.usersList.rol_id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto creado</h5>
                            </div>
                            <div className="card-body">
                                <p>id: {this.state.productsList.id}</p>
                                <p>Nombre: {this.state.productsList.nombre}</p>
                                <p>Categoria: {this.state.productsList.id_categoria}</p>
                                <p>Enlace: <a href={"http://localhost:3001/products/detail/"+this.state.productsList.id}>click here</a></p>
                            </div>
                        </div>
                    </div>


                </div>

            </React.Fragment>
        )
    }
}
export default Middle;