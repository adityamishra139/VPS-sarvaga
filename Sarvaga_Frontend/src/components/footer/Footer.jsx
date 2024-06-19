import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1B0022] text-white py-12 mt-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className='mx-8' >
                    <h2 className="text-xl font-semibold mb-4">Sarvaga Fashions</h2>
                    {/* <p className="mb-4">
                        1234 Street Name, City, State, 12345
                    </p> */}
                    <p>
                        © {new Date().getFullYear()} Sarvaga Fashions . All rights reserved.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul>
                        <li className="mb-2"><a href="/" className="hover:text-purple-500">Home</a></li>
                        <li className="mb-2"><a href="/user/aboutus" className="hover:text-purple-500">About Us</a></li>
                        <li className="mb-2"><a href="/" className="hover:text-purple-500">Services</a></li>
                        {/* <li className="mb-2"><a href="/contact" className="hover:text-purple-500">Contact</a></li> */}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us On</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/sarvagafashions?igsh=MTViemJlZHU5Zmc3Yw==m" className="text-white hover:text-purple-500"><FaFacebook size={24} /></a>
                        <a href="https://www.twitter.com" className="text-white hover:text-purple-500"><FaTwitter size={24} /></a>
                        <a href="https://www.facebook.com/profile.php?id=61558263480850&mibextid=ZbWKwL" className="text-white hover:text-purple-500"><FaInstagram size={24} /></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
            <p>
  For any inquiries, email us at{' '}
  <a
    href="mailto:sarvagafashions@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-500 hover:text-white"
  >
    sarvagafashions@gmail.com
  </a>
</p>

</div>

        </footer>
    );
}

export default Footer;
