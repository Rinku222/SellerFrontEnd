import {useSelector} from 'react-redux';

const loadingVariable = () => {
  const {homeLoading} = useSelector(s => s.home);
  const {wishlistLoading} = useSelector(s => s.wishlist);
  const {mainLoading} = useSelector(s => s.main);

  return homeLoading || wishlistLoading || mainLoading;
};

export default loadingVariable;
