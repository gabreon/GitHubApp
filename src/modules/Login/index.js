import React, { Component } from 'react';

import api from '../../services/api';

import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  };

  signin = async () => {
    try {
      const { user } = this.state;

      const response = await api.get(`users/${user}`);

      if (response) {
        await AsyncStorage.setItem('@gitHubApp:user', String(response.data.login))
        await AsyncStorage.setItem('@gitHubApp:repos', String(response.data.public_repos))

        this.props.navigation.navigate('Logged');
      }
    } catch (e) {
      Alert.alert('Atenção', e.message, [{ text: 'Ok' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Image style={styles.logo} source={require('../../../assets/GitHub_Logo.png')} />
          <Text style={styles.subtitle} >Repositories</Text>
        </View>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#666666"
          placeholder={'Digite o nome de usuário'}
          onChangeText={(user) => this.setState({ user })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.signin()}
        >
          <Text style={styles.btnText}>Listar</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#ebebeb',
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#000',
    marginVertical: 15,
    borderBottomWidth: 0.5,
    fontFamily: 'Avenir',
    borderBottomColor: '#306680',
  },
  button: {
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#060600',
    borderWidth: 0.5,
    borderRadius: 3
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Damascus',
  },
  titleBox: {
    marginVertical: 35,
  },
  logo: {
    width: 220,
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'DamascusBold',
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
  }
})

export default Login;