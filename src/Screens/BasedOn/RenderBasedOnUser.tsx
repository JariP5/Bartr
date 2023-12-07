import { Text } from '@gluestack-ui/themed';
import * as React from 'react';
import { useUserContext } from '../../Context/User';
import Admin from '../Admin/Admin';
import Business from '../Business/Business';
import Influencer from '../Influencer/Influencer';

function RenderBasedOnUser(): JSX.Element {
  const { user } = useUserContext();

  if (user!.data.role === 'Admin') {
    return <Admin />;
  }

  if (user!.data.role === 'Influencer') {
    return <Influencer />;
  }

  if (user!.data.role === 'Business') {
    return <Business />;
  }

  return (
    <Text>Something wrent wrong!</Text>
  )
}

export default RenderBasedOnUser;
