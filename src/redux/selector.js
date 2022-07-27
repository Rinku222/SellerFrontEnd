import {useSelector} from 'react-redux';

const loadingVariable = () => {
  const {homeLoading} = useSelector(s => s.home);
  // const {wishlistLoading} = useSelector(s => s.wishlist);
  const {mainLoading} = useSelector(s => s.main);
  const {userLoading} = useSelector(s => s.user);

  console.log('----->homeLoading', homeLoading);
  // console.log('----->wishlistLoading', wishlistLoading);
  console.log('----->mainLoading', mainLoading);
  console.log('----->userLoading', userLoading);

  return homeLoading || mainLoading || userLoading;
};

export default loadingVariable;
