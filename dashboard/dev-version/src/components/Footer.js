import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <a href="#" className="back-to-top"><i className='bx bxs-up-arrow-alt'></i></a>

                <footer className="page-footer">
                    <p className="mb-0">Copyright © 2023. All right reserved.</p>
                </footer>
            </React.Fragment>
        )
    }
}
