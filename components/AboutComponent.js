import React, { Component } from 'react'
import { View,Text } from 'react-native';

 class About extends Component {


    
    static navigationOptions = {
        title: "About",
      };
    
    render() {
        return (
           <View>
            <Text>
            THIS IS ABOUT COMPONENT !!!
            </Text>
           </View>
        )
    }
}


export default About;

