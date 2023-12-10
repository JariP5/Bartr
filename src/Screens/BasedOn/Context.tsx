import * as React from 'react';
import { useContext } from 'react';
import Loading from '../../Reused Components/Loading';

type RenderContentBasedOnContextProps = {
  content: React.ComponentType;
  contextComponent: React.Context<any>;
}

function RenderContentBasedOnContext({ content, contextComponent }: RenderContentBasedOnContextProps): JSX.Element {
  const context = useContext(contextComponent);

  if (!context) {
    return <Loading />;
  }

  const Content = content;
  return <Content />;
}

export default RenderContentBasedOnContext;
