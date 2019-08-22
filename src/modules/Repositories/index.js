import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import CheckBox from 'react-native-check-box';

import {
  getRepositories
} from './actions';

class Repositories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: [],
    }
  }

  logOut = async () => {
    await AsyncStorage.clear();

    this.props.navigation.navigate('Login');
  }

  async componentDidMount() {
    this.props.navigation.setParams({ logOut: this.logOut });

    const user = await AsyncStorage.getItem('@gitHubApp:user')
    const count = await AsyncStorage.getItem('@gitHubApp:repos')

    let isChecked = [...this.state.isChecked]

    for(let i = 0; i < count; i++){
      let teste = await AsyncStorage.getItem(`@isCheckedItem:${i}`)

      if(teste === null || teste === 'false') { isChecked[i] = false } else { isChecked[i] = true }
    }

    this.setState({ isChecked })

    this.props.getRepositories(user);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image source={require('../../../assets/GitHub-Mark-Light-32px.png')} style={{marginBottom: 10}}/>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={navigation.getParam('logOut')}
        >
          <Text style={{ color: '#fff', fontFamily: 'DamascusLight', borderWidth: 0.5, borderColor: '#fff', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 5 }}>Sair</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#000',
      },
    }
  }

  handleChange = async (index) => {
    let isChecked = [...this.state.isChecked];

    isChecked[index] = !isChecked[index];

    await AsyncStorage.setItem(`@isCheckedItem:${index}`, String(isChecked[index]))

    this.setState({ isChecked });
  };

  renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', }}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => this.handleChange(index)}
            isChecked={this.state.isChecked[index]}
            unCheckedImage={<Image source={require('../../../assets/star-unchecked.png')} style={{ width: 20, height: 20 }} />}
            checkedImage={<Image source={require('../../../assets/star-checked.png')} style={{ width: 20, height: 20 }} />}
          />

          <TouchableOpacity style={styles.repoItem}
            onPress={() => { this.props.navigation.navigate('Details', { repo: item }) }}
          >
            <Text style={styles.itemTitle}>{item.name}</Text>
            {item.language ? <Text style={styles.language}>Linguagem: {item.language}</Text> : <Text style={styles.language}>Nenhuma linguagem informada</Text>}

          </TouchableOpacity>
        </View>

        <View style={styles.lineStyle} />
      </View>
    );
  };

  isCheckedItem= async (length) => {
    let isChecked = [...this.state.isChecked]

    for(let i = 0; i< length; i++){
      let item = await AsyncStorage.getItem(`@isCheckedItem:${i}`)

      if(item === null || item === "false")
        isChecked[i] = false
      else
        isChecked[i] = true
    }

    this.setState({ isChecked })
  }

  render() {
    const { repositories } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {
            repositories.loading
              ? <ActivityIndicator syze="small" />
              :
              <FlatList
                data={repositories.data}
                extraData={this.state.isChecked}
                keyExtractor={item => String(item.id)}
                renderItem={this.renderItem}
              />
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e4e1',
    paddingHorizontal: 30,
  },
  header: {
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  list: {
    marginBottom: 40,
  },
  repoItem: {
    flex: 1,
    marginVertical: 3,
  },
  itemTitle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'DamascusBold',
  },
  language: {
    fontSize: 14,
    marginTop: 25,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#a6a39c',
    marginTop: 10,
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginTop: 5
  }
})

const mapStateToProps = state => ({
  repositories: state.repos.repositories,
});

export default connect(mapStateToProps, { getRepositories })(Repositories);