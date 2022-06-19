import {useSelector} from 'react-redux';

const loadingVariable = () => {
  const {homeLoading} = useSelector(s => s.home);
  const {wishlistLoading} = useSelector(s => s.wishlist);

  console.log('----->homeLoading', homeLoading);
  console.log('----->wishlistLoading', wishlistLoading);

  return homeLoading || wishlistLoading;
};

export default loadingVariable;
