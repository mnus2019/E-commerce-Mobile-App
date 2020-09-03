import React, { Component } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Picker,
  Text,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Input,Rating } from "react-native-elements";
import { postComment } from "../redux/ActionCreators";

const mapDispatchToProps = {
  postComment: ( rating, firstName, lastName) =>
    postComment( rating, firstName, lastName),
};

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      comment: "",
      rating:5
    };
  }

  static navigationOptions = {
    title: "Member",
  };

  handleForm = () => {
    const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    const firstNamevalue = regex.test(this.state.firstName);
    const lastNamevalue = regex.test(this.state.lastName);
    if (this.state.firstName.length < 2 || !firstNamevalue) {
      Alert.alert("Alert", "please Enter First Name ");
      return;
    }
    if (this.state.lastName.length < 2 || !lastNamevalue) {
      Alert.alert("Alert", "please Enter  Last Name");
      return;
    }
    if (this.state.comment.length < 2) {
      Alert.alert("Please Enter comment !!!");
      return;
    }
  
    this.props.postComment(this.state.rating,this.state.firstName, this.state.lastName);
    Alert.alert("Alert", "Thank you for being a Member!!!");
  };

  resetForm() {
    this.setState({
      firstName: "",
      lastName: "",
      comment:""
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.modal}>
        <Rating
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10,margin: 10 ,backgroundColor: "#FFFFFF",}}
            />
          <Input
            style={{ height: 40, borderColor: "blue", borderWidth: 1 }}
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => this.setState({ firstName: text })}
            value={this.state.firstName}
            maxLength={16}
          />

          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => this.setState({ lastName: text })}
            value={this.state.lastName}
            maxLength={16}
          />

          <View style={styles.MainContainer}>
            <TextInput
              style={styles.TextInputStyleClass}
              underlineColorAndroid="transparent"
              placeholder={"Type Something in Text Area."}
              placeholderTextColor={"#9E9E9E"}
              onChangeText={(text) => this.setState({ comment: text })}
              value={this.state.comment}
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Contact By</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.campers}
              onValueChange={(itemValue) =>
                this.setState({ campers: itemValue })
              }
            >
              <Picker.Item label="Phone" value="Phone" />
              <Picker.Item label="Email" value="Email" />
            </Picker>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                this.handleForm();
                this.resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                navigate("Home");
                this.resetForm();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>
      </ScrollView>
    );
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
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 20,

    justifyContent: "flex-start",
    margin: 20,
  },
  TextInputStyleClass: {
    textAlign: "center",
    height: 10,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: 150,
  },
});

export default connect(null, mapDispatchToProps)(Member);
