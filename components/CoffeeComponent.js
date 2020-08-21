import React, { Component } from "react";
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';



const mapStateToProps = state => {
  return {
      coffees: state.coffees
  };
};

class CoffeeShop extends Component {
 

  static navigationOptions = {
    title: "Coffee Shop",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
        <ListItem
            title={item.name}
            subtitle={item.price}
            leftAvatar={{source: {uri: baseUrl + item.image}}}
            onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
        />
             </Animatable.View>
      );
    };

   
    if (this.props.coffees.isLoading) {
      return <Loading />;
  }
  if (this.props.coffees.errMess) {
      return (
          <View>
              <Text>{this.props.coffees.errMess}</Text>
         </View>
      );
  }
  return (
      <FlatList 
      data={this.props.coffees.coffees}
      renderItem={renderDirectoryItem}
      keyExtractor={item => item.id.toString()}
  />
    );
  }
}

export default connect(mapStateToProps)(CoffeeShop);
