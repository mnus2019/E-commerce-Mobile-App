import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet,Image,
   PanResponder,Alert, Modal, Button, ScrollView,Share } from 'react-native';
import { Card, Icon, Rating, Input } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addItemToCart,deleteItemFromCart } from '../redux/ActionCreators'; 
import MyCart from "./MyCartComponent"



const mapStateToProps = state => {
  return {
      suites: state.suites
  };
};

const mapDispatchToProps = {
  addItemToCart: (item) =>
    addItemToCart(item),
    deleteItemFromCart: (item) =>deleteItemFromCart(item),
};

class SuiteShop extends Component {
 
//   constructor(props) {
//     super(props)
//     this.animatedValue = new Animated.Value(0)
// }
constructor(props) {
  super(props);
  this.state = {
    showModal: false,
    rating: 5,
    author: "",
    text: "",
    authorError: "",
    commentError: "",
  };
}

toggleModal() {
  this.setState({ showModal: !this.state.showModal });
}

handleComment(campsiteId) {
  const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  const value = regex.test(this.state.author);
  if (this.state.author.length < 2 || !value) {
    Alert.alert("Please Enter correct Name !!!");
    return;
  }
  if (this.state.text.length < 2) {
    Alert.alert("Please Enter comment !!!");
    return;
  }

  this.props.postComment(
    campsiteId,
    this.state.rating,
    this.state.author,
    this.state.text
  );
  this.toggleModal();
}

resetForm() {
  this.setState({
    author: "",
    text: "",
  });
}


  static navigationOptions = {
    title: "Coworking Place",
    headerRight:(
      <ShoppingCartIcon/>
    )
  };
 


  render() {
    const shareSuites = (title, message, url) => {
      Share.share(
        {
          title: title,
          message: `${title}: ${message} ${url}`,
          url: url,
        },
        {
          dialogTitle: "Share " + title,
        }
      );
    };
    const { navigate } = this.props.navigation;
  
    const renderDirectoryItem = ({ item }) => {

      

      return (
        <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}>
  <Card
    featuredTitle={item.name}
      
  >
      <Image style={styles.image} source={{ uri: baseUrl + item.image }}/>
     <Text style={{ margin: 10 }}>{item.description}</Text>
    <Text style={{ margin: 10 }}>${item.price}</Text>
    <View style={styles.cardRow}>
      <Icon
        name="plus" 
        type="font-awesome"
        color="#f50"
        raised
        reverse
        onPress={() =>    this.props.addItemToCart(item)}
       
      />
       <Icon
              name={"share"}
              type="font-awesome"
              color="#5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareSuites(
                  item.name,
                  item.description,
                  item.image
                )
              }
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

const styles=StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardItem: {
    margin: 10,
    flex: 1,
  } ,
   image: {
    width: null,
    height: 300,
    resizeMode: 'cover'
},
modal: {
  justifyContent: "center",
  margin: 20,
}
})

export default connect(mapStateToProps,mapDispatchToProps)(SuiteShop);
