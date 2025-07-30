import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    return (
        <div>
            <>
                <footer className="bg-dark text-white text-center text-lg-start mt-auto py-3" style={{ backgroundColor: "#113F67" }} >
                    <div className="container p-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">My Website</h5>
                                <p>
                                    Welcome to our blogging space where stories, ideas, and inspiration come to life. Stay curious, keep reading, and join the conversation.
                                </p>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Social</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><Link to="/" className="text-white">Facebook</Link></li>
                                    <li><Link to="/" className="text-white">Twitter</Link></li>
                                    <li><Link to="/" className="text-white">Instagram</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: '#113F67' }}>
                        © 2025 MyWebsite. All Rights Reserved.
                    </div>
                </footer>


            </>
        </div >
    )
}