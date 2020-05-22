import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * This is the first navigation screen that will be loaded when we open the app.
 * It is used to redirect to the right screen depending on the account status
 * (not logged in, parent, babysitter).
 */
class AuthenticationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.bootstrapAsync()
  }

  // Fetch the token from storage then navigate to the appropriate screen.
  bootstrapAsync = async () => {
    if (!this.props.name) {
      this.props.navigation.navigate('Login')
    } else {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return null
  }
}
AuthenticationScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
  name: PropTypes.string,
}

AuthenticationScreen.defaultProps = {
  name: null,
}

const mapStateToProps = (state) => ({
  name: state.account.name,
})

export default connect(mapStateToProps)(AuthenticationScreen)
