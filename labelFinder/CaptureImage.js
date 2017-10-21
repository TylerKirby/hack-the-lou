import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    upc: '',
    productData: 'none yet',
    productTitle: '',
    allergenList: '',
    loading: true,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState({
      upc: data.slice(1)
    })

    if (this.state.upc != '') {
      this._getDataWithUPC(this.state.upc).then((productData) => this.setState({ 
        productData: productData, 
        productTitle: productData.content[0].title, 
        rawIngredients: productData.content[0].rawIngredients,
        allergenList: productData.content[0].allergenSection.allergens.filter(allergen => allergen.culpritIngredients.length > 0),
        loading: false, 
      }))
    }
  }

  _getDataWithUPC(upc) {
    console.log(`https://dev-enterprise-sl-api.labelinsight.com/api/v4/20ff77e9-75af-410d-98ff-bef2febb0df7/data/upc/${upc}`)
    return fetch(
      `https://dev-enterprise-sl-api.labelinsight.com/api/v4/20ff77e9-75af-410d-98ff-bef2febb0df7/data/upc/${upc}`,
      {
        method: 'GET',
        headers: {
          'x-api-key': '9qQUNqKiSo6HNuo1C41EBWD3RkLwjsN1PIKmbPKb'
        }
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.cameraBox}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <ScrollView style={styles.infoContainer}>
            <Text style={styles.titleLabel}>Scan it dude!</Text>
            {
              !this.state.loading ?
              <View style={styles.infoBox}>
                <Text style={styles.thingTitle}>{`The thing:\n${this.state.productTitle}`}</Text>
                {
                  this.state.allergenList.length > 0 ?
                    <View style={styles.resultBox}>
                      <Text style={styles.haveAllergensLabel}>Oh no! This has allergens 😭</Text>
                    {
                      this.state.allergenList.map(allergen => 
                        <Text key={allergen.name} style={styles.allergenLabel}>{allergen.name}</Text>
                      )
                    }
                  </View>
                  :
                  <View style={styles.resultBox}>
                    <Text style={styles.haveAllergensLabel}>This has no allergens nomnom nom nom 😀</Text>
                  </View>
                }
              </View>
              :
              <Text />
            }
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#BAF4EB',
  },
  titleLabel: {
    paddingTop: 15,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Arial Rounded MT Bold'
  },
  cameraBox: {
    height: 300,
  },
  resultBox: {
    paddingLeft: 15,
  },
  infoBox: {
    paddingTop: 10,
    backgroundColor: '#FF729F',
  },
  thingTitle: {
    fontSize: 20,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingRight: 15,
    fontFamily: 'Arial Rounded MT Bold',
    color: 'white',
  },
  haveAllergensLabel: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 15,
    fontSize: 20,
    fontFamily: 'Arial Rounded MT Bold',
    color: 'white',
  },
  allergenLabel: {
    paddingLeft: 35,
    fontSize: 25,
    fontFamily: 'Arial',
    paddingBottom: 5,
    color: 'white',
  }
})