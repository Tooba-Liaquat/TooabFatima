import React, { useContext } from "react";
import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../../screen/styles";
import UserContext from "../../context/User/User";
import { CommonActions, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header(props) {
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const { StyleHead } = props;

  function Back() {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={[
          styles().alignCenter,
          styles().justifyCenter,
          styles().h50px,
          styles().w25px,
        ]}
      >
        <FontAwesome name="angle-left" size={30} color="black" />
      </TouchableOpacity>
    );
  }

  function Menu() {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.dispatch(DrawerActions.toggleDrawer(), {
            property: props.property,
          })
        }
        style={[
          styles().boxpeshadow,
          styles().br5,
          styles().pall5,
          styles().wh40px,
          styles().justifyEvenly,
        ]}
      >
        <View style={[styles().w15px, styles(currentTheme).menuBarIcon]}></View>
        <View style={[styles().w30px, styles(currentTheme).menuBarIcon]}></View>
        <View style={[styles().w15px, styles(currentTheme).menuBarIcon]}></View>
      </TouchableOpacity>
    );
  }

  function NotiIcon() {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("MyNotifications");
        }}
        style={[styles().mr10, styles().wh25px, styles().overflowH]}
      >
        <Image
          source={require("../../assets/images/bell-icon.png")}
          style={styles().wh100}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  function ProfileImg() {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
        style={[
          styles().wh40px,
          styles().br20,
          styles().alignCenter,
          styles().justifyCenter,
          {
            borderColor: currentTheme.themeBackground,
            borderWidth: 1,
            overflow: "hidden",
          },
        ]}
      >
        {user?.photo ? (
          <Image
            source={{ uri: user?.photo }}
            resizeMode={"cover"}
            style={styles().wh100}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              color: currentTheme.themeBackground,
              fontWeight: "bold",
            }}
          >
            {"L"}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  function Carticn() {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Cart")}
        style={{
          position: "absolute",
          backgroundColor: currentTheme.themeBackground,
          right: 0,
          margin: 8,
          borderRadius: 100,
          padding: 5,
        }}
      >
        <Ionicons name="cart" color={currentTheme.white} size={25} />
      </TouchableOpacity>
    );
  }

  async function Logout() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
    await AsyncStorage.clear().then(() => console.log("async clear - logout!"));
  }

  function Exitstore() {
    return (
      <TouchableOpacity
        onPress={() => Logout()}
        style={[
          styles().boxpeshadow,
          styles().br5,
          styles().pall5,
          styles().wh40px,
          styles().justifyEvenly,
        ]}
      >
        <MaterialCommunityIcons
          name="exit-to-app"
          color={currentTheme.themeBackground}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles().flexRow,
        Platform.OS === "ios" ? styles().mt20 : styles().mt0,
        styles().alignCenter,
        styles().justifyBetween,
        styles().h50px,
        styles().ph20,
        StyleHead,
        props.HeaderStyle,
      ]}
    >
      {props.LeftIcon === true ? (
        <Back />
      ) : props.LeftIcon === false ? (
        <Menu />
      ) : (
        <Exitstore />
      )}

      <Text
        numberOfLines={1}
        style={[
          styles().fs20,
          styles().fw700,
          styles().fontSemibold,
          {
            color: currentTheme.borderColor,
            flex: 1,
            marginHorizontal: 15,
            textAlign: "center",
          },
        ]}
      >
        {props.pagetitle}
      </Text>

      <View
        style={[
          styles().flexRow,
          styles().justifyBetween,
          styles().alignCenter,
        ]}
      >
        {props.NotiIcon === true ? (
          <NotiIcon />
        ) : props.NotiIcon === false && !props.ProfileImg ? (
          <Carticn />
        ) : null}
        {props.ProfileImg ? <ProfileImg /> : null}
        {props.NotiIcon === undefined || props.ProfileImg === undefined ? (
          <View style={[styles().w25px]} />
        ) : null}
      </View>
    </View>
  );
}
