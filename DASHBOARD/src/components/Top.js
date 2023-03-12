import React, { Component } from 'react';

class Top extends Component {

    constructor() {
        super()
        this.state = {
            products: 0,
            users: 0
        }
    }

    componentDidMount() {

        fetch('/api/users')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(array => {

                let m = array.users.length;

                this.setState({ users: m })

            })
            .catch(error => console.log(error))


        fetch('/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(array => {

                let m = array.data.length;

                this.setState({ products: m })

            })
            .catch(error => console.log(error))

    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total usuarios</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.users}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-film fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total productos</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.products}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-award fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Top;
