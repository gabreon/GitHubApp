import React, { Component } from 'react';
import { View, Linking, StyleSheet, Text } from 'react-native';

class Details extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: { backgroundColor: '#26292b' },
      headerTintColor: '#fff',
      headerTitle: 'Detalhes'
    }
  }
  render() {
    const { repo } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{repo.name}</Text>
          <Text style={styles.url} onPress={() => Linking.openURL(repo.html_url)}>{repo.html_url}</Text>

          <View style={styles.subItemsContainer}>
            <Text style={styles.subItems}>Watchers: {repo.watchers_count}</Text>
            <Text style={styles.subItems}>Estrelas: {repo.stargazers_count}</Text>
            <Text style={styles.subItems}>Forks: {repo.forks_count}</Text>
          </View>

          <Text style={styles.description}>{repo.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  itemContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    color: '#1661e0',
    fontFamily: 'DamascusBold',
  },
  url: {
    fontSize: 14,
    color: '#1b8fe3',
    marginVertical: 3,
    fontFamily: 'DamascusLight',
    textDecorationLine: 'underline',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  subItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  subItems: {
    marginVertical: 3,
    fontFamily: 'Damascus',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Damascus',
  },
})

export default Details;