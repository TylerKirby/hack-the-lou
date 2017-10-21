import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToScanner = this.navigateToScanner.bind(this)
  }

  navigateToScanner() {
    const { navigation } = this.props;
    navigation.navigate('CaptureImage')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Allergens Are Bad! So We Made An App</Text>
        <TouchableOpacity onPress={this.navigateToScanner} style={styles.button}>
          <Text style={styles.buttonText}>Go Scan A Thing!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#BAF4EB',
  },
  label: {
    fontSize: 40,
    color: '#089FDB',
    fontFamily: 'AcademyEngravedLetPlain',
    textAlign: 'center'
  },
  button: {
    height: 100,
    backgroundColor: '#FF729F',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'AcademyEngravedLetPlain',
  }
})

export default Home