import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModel from '../pages/shop/CartModel';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // drop down menu
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };


  // admin drop down menu
  const adminDropDownMenus = [
    { label: 'Dashboard', path: "/dashboard/admin" },
    { label: 'Manage Items', path: "/dashboard/manage-products" },
    { label: 'All Orders', path: "/dashboard/manage-orders" },
    { label: 'Add Prodcuct', path: "/dashboard/add-product" }
  ];

  // user dropdown menu

  const userDropDownMenus = [
    { label: 'Dashboard', path: "/dashboard" },
    { label: 'Profile', path: "/dashboard/profile" },
    { label: 'Payments', path: "/dashboard/payments" },
    { label: 'Orders', path: "/dashboard/orders" }
  ];

  const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error("failed to logout", error)

    }

  };

  return (
    <header className='fixed-nav-bar w-nav'>
      <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='link'><Link to="/">Home</Link></li>
          <li className='link'><Link to="/shop">Shop</Link></li>
          <li className='link'><Link to="/">Pages</Link></li>
          <li className='link'><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Logo */}
        <div className='nav__logo'>
          <Link to="/">Depstechs<span>.</span></Link>
        </div>

        {/* Nav icons */}
        <div className='nav__icons relative'>
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className='hover:text-primary'>
              <i className="ri-shopping-cart-2-line"></i>
              <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg} alt="User Avatar" className='size-10 rounded-full cursor-pointer' 
                />
                {
                
                isDropDownOpen && (
                  <div className='absolute right-0 mt-3 p-4 w-48 bg-white border-gray-200 rounded-lg shadow-lg z-50'>
                    <ul className='font-medium space-y-1 p-2'>
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className='dropdown-items block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li><Link
                      onClick={handleLogout}
                      className='dropdown-items block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Logout
                      </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login">
                <i className="ri-user-3-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </header>
  );
};

export default Navbar;
