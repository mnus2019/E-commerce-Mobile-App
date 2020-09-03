import React, { Component } from "react";
import { View, FlatList, Text,StyleSheet,Share,
  Image} from 'react-native';
import { Card,SearchBar,Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addItemToCart ,deleteItemFromCart} from '../redux/ActionCreators'; 


const mapDispatchToProps = {
  addItemToCart: (item) =>
    addItemToCart(item),
    deleteItemFromCart: (item) =>
    deleteItemFromCart(item)
  
};

const mapStateToProps = state => {
  return {
      coffees: state.coffees,

  };
};

class CoffeeShop extends Component {


  static navigationOptions = {
    title: "Coffee Shop",
    headerRight:(
      <ShoppingCartIcon/>
    ),
  
   
  };


  render() {
    const { navigate } = this.props.navigation;
    const sharecoffees = (title, message, url) => {
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
  
   
  
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
       >
  <Card
    featuredTitle={item.name}
  
  >
     <Image style={styles.image} source={{ uri: baseUrl + item.image }}/>
     <Text style={{ margin: 10 }}>{item.description}</Text>
    <Text style={{ margin: 10 }}>$ {item.price}</Text>
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
                sharecoffees(
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
  <View>
       <FlatList 
      data={this.props.coffees.coffees}
      renderItem={renderDirectoryItem}
      keyExtractor={item => item.id.toString()}
  />
  </View>
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
  }, 
  image: {
    width: null,
    height: 300,
    resizeMode: 'cover'
}
})

export default connect(mapStateToProps,mapDispatchToProps)(CoffeeShop);
