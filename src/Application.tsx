import React from "react";
import PropTypes from 'prop-types';
import { FluxibleComponentContext } from 'fluxible-addons-react';
import { handleHistory } from "fluxible-router";

type propsType = any;

class Component extends React.Component<propsType> {
  context: any;

  static propTypes = {
    // props coming from fluxible-router's handleHistory
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    })
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;
    let Handler = currentRoute && currentRoute.handler;
    const params = currentRoute.params;

    return (
      <div>
        <Handler {...params} />
      </div>
    );
  }
}

// Wrap with fluxible-router's history handler (required for routing)
// It also pass `currentRoute` as prop to the component
Component.contextType = FluxibleComponentContext;
export const Application = handleHistory(Component);
