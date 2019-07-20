
import React, {
  PureComponent,
} from 'react';

import Context from '@prisma-cms/context';


class ContextProvider extends PureComponent {

  static contextType = Context;

  render() {

    const {
      children,
    } = this.props;

    return children || null;

  }

}

export default ContextProvider;