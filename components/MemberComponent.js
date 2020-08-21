import React, { Component } from 'react'
import { View,Button,StyleSheet,Picker,Text } from "react-native";
import { Input } from "react-native-elements";

class  Member extends Component {
    constructor(props){
        super(props);
        this.state={
           firstName : "",
           lastName : "",
           campers : "",
           lastName : ""
        }
    }

    static navigationOptions = {
      title: "Member",
    };

    render(){
    return (
        <View style={styles.modal}>
        

        <Input
          placeholder="First Name"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          leftIconContainerStyle={{ paddingRight: 10 }}
          onChangeText={(text) => this.setState({ author: text })}
          value={this.state.author}
        />

        <Input
          placeholder="Last Name"
          leftIcon={{ type: "font-awesome", name: "comment-o" }}
          leftIconContainerStyle={{ paddingRight: 10 }}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
        />
           <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Campers</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.campers}
            onValueChange={(itemValue) => this.setState({ campers: itemValue })}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Submit"
            color="#5637DD"
            onPress={() => {
              this.handleComment(campsiteId);
              this.resetForm();
            }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              this.toggleModal();
              this.resetForm();
            }}
            color="#808080"
            title="Cancel"
          />
        </View>
      </View>
    )
}
}
const styles = StyleSheet.create({
    cardRow: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      margin: 20,
    },
    formRow: {
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
    formItem: {
      flex: 1,
    },
    modal: {
      justifyContent: "center",
      margin: 20,
    },
  });

export default Member;