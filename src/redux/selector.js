import {useSelector} from 'react-redux';

const loadingVariable = () => {
  const {homeLoading} = useSelector(s => s.home);
  const {mainLoading} = useSelector(s => s.main);
  const {userLoading} = useSelector(s => s.user);

  return homeLoading || mainLoading || userLoading;
};

export default loadingVariable;
