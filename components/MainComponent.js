import React, { Component } from "react";
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Home from "./HomeComponent";
import OnlineShopping from "./OnlineShoppingComponent";
import CoffeeShop from "./CoffeeComponent";
import About from "./AboutComponent";
import Member from "./MemberComponent";
import SuiteShop from "./SuitesComponent";
import ClotheShop from "./ClothesComponent";
import { Icon } from 'react-native-elements';
import { createStackNavigator, createDrawerNavigator,
    DrawerItems } from 'react-navigation';
    import SafeAreaView from 'react-native-safe-area-view';
    import { connect } from 'react-redux';
import { fetchCoffees,fetchSuites,fetchCampsites,fetchClothes,fetchLocations } from '../redux/ActionCreators';  
    
    
    
    const mapDispatchToProps = {
       
        fetchCoffees,
        fetchSuites,
        fetchCampsites,
        fetchClothes,
        fetchLocations
    }; 


const HomeNavigator = createStackNavigator(
  {
      Home: { screen: Home }
  },
  {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
          headerLeft: <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  }
);
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='bullhorn'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
  );
  const MemberNavigator = createStackNavigator(
    {
        Member: { screen: Member }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name="bookmark"
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
  );



const OnlineShoppingNavigator = createStackNavigator(  {
    OnlineShopping: { 
      screen: OnlineShopping,
      navigationOptions: ({navigation}) => ({
          headerLeft: <Icon
              name='cart-arrow-down'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  },
    CoffeeShop: { screen:CoffeeShop } ,
    SuiteShop:{screen:SuiteShop}  ,
    ClotheShop:{screen:ClotheShop} 
   
  },
  
  {
    initialRouteName: "OnlineShopping",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  },
  
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                {/* <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View> */}
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
  );


const MainNavigator = createDrawerNavigator(
  {
      Home: {
          screen: HomeNavigator,
          navigationOptions: {
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='home'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                  />
              )
          }
      },
      OnlineShopping: {
        screen: OnlineShoppingNavigator,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='cart-arrow-down'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='bullhorn'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Member: {
        screen: MemberNavigator,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='bookmark'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
        },
        {
            drawerBackgroundColor: '#CEC8FF',
            contentComponent: CustomDrawerContentComponent
        })

class Main extends Component {
    componentDidMount() {
        this.props.fetchCoffees();
        this.props.fetchSuites();
        this.props.fetchCampsites();
        this.props.fetchClothes();
        this.props.fetchLocations();
       
       
    }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  drawerHeader: {
      backgroundColor: '#5637DD',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
  },
  drawerHeaderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  },
  drawerImage: {
      margin: 10,
      height: 60,
      width: 60
  },
  stackIcon: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 24
  }
});

export default connect(null, mapDispatchToProps)(Main);
