import React, {useState} from "react";
import { Image } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import Homes from "./screens/Home";
import Onboarding from "./screens/Onboarding";
import profile from "./screens/Profile";
import Register from "./screens/Register";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, argonTheme } from "./constants";
// const StStackack = createStackNavigator();
// cache app images


const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
    return <AuthStack.Navigator>
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
        <AuthStack.Screen name="Registers" component={HomeTabScreen} />

    </AuthStack.Navigator>
};
const Drawer = createDrawerNavigator();

const HomeTabScreen = () => {
    return <Drawer.Navigator>
        <Drawer.Screen name="Registers" component={Register} />
        </Drawer.Navigator>
}


const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images

export default props => {
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    'ArgonExtra': require('./assets/font/argon.ttf'),
  });

  function _loadResourcesAsync() {
    return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn();
  };

 function _handleFinishLoading() {
    setLoading(true);
  };

  
  if(!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else { //  if(fontsLoaded)
    return (
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex>
{/* 
          <AuthStackScreen /> 
          */}
          <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}


// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false
//   };

//   render() {
//     if (!this.state.isLoadingComplete) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <NavigationContainer>
//           <GalioProvider theme={argonTheme}>
//             <Block flex>
//               <Screens />
//             </Block>
//           </GalioProvider>
//         </NavigationContainer>
//       );
//     }
//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([...cacheImages(assetImages)]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
// }
