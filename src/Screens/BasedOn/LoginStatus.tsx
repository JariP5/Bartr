import * as React from 'react';
import { useUserContext } from '../../Context/User';
import MyStack from '../../Navigation/MyStack';

function RenderBasedOnLoginStatus(): JSX.Element {
  const { user } = useUserContext();

  if (user === undefined) {
    return <MyStack initialRouteName={'Login'}/>;
  }

  return <MyStack initialRouteName={'Home'}/>;
}

export default RenderBasedOnLoginStatus;
