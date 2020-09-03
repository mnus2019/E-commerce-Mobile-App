import React, { Component } from "react";
import { View, FlatList,StyleSheet,Image, Text,Share } from 'react-native';
import { Card, Icon} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addItemToCart, deleteItemFromCart } from '../redux/ActionCreators'; 

const mapDispatchToProps = {
  addItemToCart: (item) =>
    addItemToCart(item),
    deleteItemFromCart: (item) => deleteItemFromCart(item),
  
};

const mapStateToProps = state => {
  return {
      clothes: state.clothes
  };
};

class ClotheShop extends Component {
 

  static navigationOptions = {
    title: "Clothes Shop",
    
      headerRight:(
        <ShoppingCartIcon/>

      )
  };
  

  render() {
    const { navigate } = this.props.navigation;
    const shareClothes = (title, message, url) => {
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
     <Image style={styles.image} source={{ uri: item.image }}/>
  
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
                shareClothes(
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

   
    if (this.props.clothes.isLoading) {
      return <Loading />;
  }
  if (this.props.clothes.errMess) {
      return (
          <View>
              <Text>{this.props.clothes.errMess}</Text>
         </View>
      );
  }
  return (
      <FlatList 
      data={this.props.clothes.clothes}
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
  }, 
   image: {
    width: null,
    height: 300,
    resizeMode: 'cover'
}
})

export default connect(mapStateToProps,mapDispatchToProps)(ClotheShop);
