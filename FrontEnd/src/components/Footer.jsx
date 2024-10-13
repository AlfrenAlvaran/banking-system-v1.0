import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ user = {}, type }) => {
    const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Guest';
    const api = 'http://localhost:9000';
    const url = '/SMC/auth/logout';
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post(`${api}${url}`);

            Cookies.remove('token');
            Cookies.remove('user');
            localStorage.removeItem('token');

            navigate('/sign-in');
        } catch (error) {
            console.error('Error during logout:', error.response?.data?.message || error.message);
        }
    };

    return (
        <footer className="footer" onClick={logout}>
            <div className={type === 'mobile' ? "footer_name-mobile" : "footer_name"}>
                <p className='text-xl font-bold text-gray-700'>
                    {user.firstName ? user.firstName[0] : '?'}
                </p>
            </div>
            <div className={type === 'mobile' ? "footer_email-mobile" : 'footer_email'}>
                <h1 className="text-14 truncate font-normal text-gray-600">
                    {name}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user.email || 'No email'}
                </p>
                <div className="footer_image">
                    <img src="icons/logout.svg" alt="icon" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
