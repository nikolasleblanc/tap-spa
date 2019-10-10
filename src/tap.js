import React from 'react'
import { withRouter } from 'react-router-dom'

class ReactRouterTap extends React.Component {
  constructor(props) {
    super(props)

    this.sendPageView = this.sendPageView.bind(this)
    this.initialize = this.initialize.bind(this)

    this.initialize(props.id)
  }

  componentDidMount() {
    this.sendPageView(this.props.location)
    this.props.history.listen(this.sendPageView)
  }

  initialize() {
    if (!this.props.id) {
      console.error('[taplytics] Tracking ID is required.')
      return
    }

    console.log('setup')
    console.log('we see you baby, routing that path')
  }

  sendPageView(location) {
    // Do nothing if GA was not initialized due to a missing tracking ID.
    if (!window.Taplytics) {
      return
    }

    // Do nothing if trackPathnameOnly is enabled and the pathname didn't change.
    if (
      this.props.trackPathnameOnly &&
      location.pathname === this.lastPathname
    ) {
      return
    }

    this.lastPathname = location.pathname

    // Sets the page value on the tracker. If a basename is provided, then it is prepended to the pathname.
    const page = this.props.basename
      ? `${this.props.basename}${location.pathname}`
      : location.pathname

    console.log('we see you baby, routing that path', page)

    if (this.props.debug) {
      console.info(`[taplytics] Page view: ${page}`)
    }
  }

  render() {
    return this.props.children
  }
}

ReactRouterTap.defaultProps = {
  debug: false,
}

export default withRouter(ReactRouterTap)
