import React from 'react';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';

function Main() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h2 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                <Top />

                <Middle />

                <Bottom />


            </div>


        </React.Fragment>
    )

}
export default Main;