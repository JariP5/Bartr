import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../Context/User';
import Loading from '../../Reused Components/Loading';
import RenderBasedOnLoginStatus from './LoginStatus';

function RenderContentBasedOnContext(): JSX.Element {
  const context = useContext(UserContext);

  if (!context) {
    return <Loading />;
  }

//   const Content = content;
  return <RenderBasedOnLoginStatus />;
}

export default RenderContentBasedOnContext;
