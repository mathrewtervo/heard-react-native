import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image
} from 'react-native'
import { Auth } from 'aws-amplify'

import { fonts } from 'AWSTwitter/src/theme'
import { logo, logoTitle } from 'AWSTwitter/src/assets/images'
import Block from 'AWSTwitter/src/components/ColorBlock'
import Button from 'AWSTwitter/src/components/BlueButton'

export default class extends React.Component {
  state = {
    user: {},
    username: '',
    password: '',
    authCode: '',
    showConfirmSignIn: false
  }
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  signIn = async () => {
    const {
      username, password
    } = this.state
    try {
      const user = await Auth.signIn(username, password)
      console.log('successfully signed in!')
      this.setState({ user, showConfirmSignIn: true })
    } catch (err) {
      console.log('error signing in...', err)
    }
  }
  confirmSignIn = async () => {
    const {
      user, authCode
    } = this.state
    try {
       await Auth.confirmSignIn(user, authCode)
       console.log('successful confirmsign in!')
       this.props.navigation.navigate('Heard')
    } catch (err) {
      console.log('error confirming sign in: ', err)
    }
  }
  render() {
    const { showConfirmSignIn } =  this.state
    return (
      <View style={styles.container}>
        <Block style={{ transform: [{ rotate: '-45deg' }] }} />
        <View style={styles.titleContainer}>
          <Image
            style={styles.logo}
            source={logo}
          />
          <Image
            style={styles.logoTitle}
            source={logoTitle}
            resizeMode='contain'
          />
        </View>
        {
          !showConfirmSignIn && (
            <View>
              <TextInput
                onChangeText={val => this.onChangeText('username', val)}
                placeholder='Username'
                style={styles.input}
                value={this.state.username}
                autoCapitalize='none'
                autoCorrect={false}
              />
              <TextInput
                onChangeText={val => this.onChangeText('password', val)}
                placeholder='Password'
                style={styles.input}
                value={this.state.password}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
              />
              <Button title='Sign In' onPress={this.signIn} />
            </View>
          )
        }
        {
          showConfirmSignIn && (
            <View>
              <TextInput
                onChangeText={val => this.onChangeText('authCode', val)}
                placeholder='Authorization code'
                style={styles.input}
                value={this.state.authCode}
                autoCapitalize='none'
                autoCorrect={false}
              />
              <Button title='Sign In' onPress={this.confirmSignIn} />
            </View>
          )
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 39,
    height: 39,
    tintColor: 'white'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  logoTitle: {
    tintColor: 'white',
    height: 42,
    width: 110
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    fontFamily: fonts.regular,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8
      }
    })
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontFamily: fonts.italic
  }
})