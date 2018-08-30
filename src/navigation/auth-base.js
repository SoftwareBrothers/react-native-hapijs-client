import React from 'react'
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native'
import LoginForm from '../components/login-form'

export default class AuthBase extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      valid: false,
      errorMessage: null
    }
  }

  async handleSubmit() {
    await this.submit(this.formRef)
  }

  async submit() {
    throw new Error('Submit method has to be implemented')
  }

  formUpdated() {
    this.setState(Object.assign(this.state, {
      valid: this.formRef.valid()
    }))
  }

  render() {
    return (
      <View style={style.container}>
        <LoginForm
          style={style.form}
          ref={(el) => this.formRef = el}
          onValueChange={(value) => this.formUpdated(value)}
        >
          {this.renderTerms && this.renderTerms()}
        </LoginForm>
        {this.state.loading && (<ActivityIndicator size='large'/>)}
        <View style={{flex: 1}}>
          <Button
            style={style.button}
            title={this.buttonLabel || 'Login'}
            onPress={() => this.handleSubmit()}
            disabled={!this.state.valid}
          />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    flex: 1
  },
  button: {
    marginTop: 20
  },
  form: {
    flex: 9,
    paddingBottom: 20
  }
})