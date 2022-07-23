import {useSelector} from 'react-redux';

const loadingVariable = () => {
  const {homeLoading} = useSelector(s => s.home);
  const {wishlistLoading} = useSelector(s => s.wishlist);
  const {mainLoading} = useSelector(s => s.main);
  const {userLoading} = useSelector(s => s.user);

  return homeLoading || wishlistLoading || mainLoading || userLoading;
};

export default loadingVariable;
