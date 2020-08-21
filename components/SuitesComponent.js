import React, { Component } from "react";
import { View, FlatList, Text } from 'react-native';
import { Card, Icon} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';



const mapStateToProps = state => {
  return {
      suites: state.suites
  };
};

class SuiteShop extends Component {
 

  static navigationOptions = {
    title: "Coworking Place",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
       >
  <Card
    featuredTitle={item.name}
    image={{ uri: baseUrl + item.image }}
  >
    <Text style={{ margin: 10 }}>{item.description}</Text>
    <View>
      <Icon
        name="heart" 
        type="font-awesome"
        color="#f50"
        raised
        reverse
       
      />

    
    </View>
  </Card>
</Animatable.View>
      );
    };

   
    if (this.props.suites.isLoading) {
      return <Loading />;
  }
  if (this.props.suites.errMess) {
      return (
          <View>
              <Text>{this.props.suites.errMess}</Text>
         </View>
      );
  }
  return (
      <FlatList 
      data={this.props.suites.suites}
      renderItem={renderDirectoryItem}
      keyExtractor={item => item.id.toString()}
  />
    );
  }
}

export default connect(mapStateToProps)(SuiteShop);
