import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { Usercontext} from '../../contexts/user.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutuser } from '../../utils/firebase/firebase.utils';
import { CartContext } from '../../contexts/cart.context';



import './navigation.styles.scss';

const Navigation = () => {
  const { currentuser} = useContext(Usercontext);
  const { isCartOpen } = useContext(CartContext);

  console.log(currentuser);
  return (
    <Fragment>
    <div className='navigation'>
      <Link className='logo-container' to='/'>
        <CrwnLogo className='logo' />
      </Link>
      <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>
          SHOP
        </Link>
        
        {currentuser ? (
          <span className='nav-link' onClick={signOutuser}>
            SIGN OUT
          </span>
        ) : (
          <Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>
        )}
        <CartIcon/>
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
    <Outlet />
  </Fragment>
);
};

export default Navigation;