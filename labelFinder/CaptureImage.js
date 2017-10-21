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
        allergenList: productData.content[0].allergenSection.allergens,
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
          <ScrollView>
            <Text>Scan a thing!</Text>
            <Text>{this.state.upc}</Text>
            {
              !this.state.loading ?
              <View>
                <Text>{`Product title: ${this.state.productTitle}`}</Text>
                <View>
                  {
                    this.state.allergenList.map(allergen => {
                      if (allergen.culpritIngredients.length > 0) {
                        return <Text>{allergen.name}</Text>
                      }
                    })
                  }
                </View>
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
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBox: {
    height: 300,
  }
})