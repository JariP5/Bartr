import * as React from 'react';
import { useUserContext } from '../../Context/User';
import MyStack from '../../Navigation/MyStack';

function RenderBasedOnLoginStatus(): JSX.Element {
  const { user } = useUserContext();

  if (user) {
    return <MyStack initialRouteName={'Home'}/>;
  }

  return <MyStack initialRouteName={'Login'}/>;
}

export default RenderBasedOnLoginStatus;
