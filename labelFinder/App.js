import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import CaptureImage from './CaptureImage'
import Home from './Home'

export default StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
        headerStyle: { 
          backgroundColor: '#BAF4EB',
        },
        headerTitleStyle: {
          fontFamily: 'AcademyEngravedLetPlain',
          fontSize: 30
        }
      }
    },
    CaptureImage: {
      screen: CaptureImage,
      navigationOptions: {
        title: 'Capture Image',
        headerStyle: { 
          backgroundColor: '#BAF4EB',
        },
        headerTitleStyle: {
          fontFamily: 'AcademyEngravedLetPlain',
          fontSize: 30
        }
      }
    }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      backgroundColor: '#fff'
    }
  },
)