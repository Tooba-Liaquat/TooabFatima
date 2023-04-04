import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Login(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [isStudent, setIsStudent] = useState("");
  const [isShopKeeper, setIsShopKeeper] = useState("");

  return (
    <AuthLayout withoutScroll={true} navigation={props.navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles().mt25,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text
              style={[
                styles().fs20,
                styles().fontBold,
                styles().textUpper,
                { color: currentTheme.black, alignSelf: "center" },
              ]}
            >
              Welcome To Smart Digital Library
            </Text>
          </View>
          <View style={[styles().flex, styles().justifyEnd, styles().mb35]}>
            {/* <Image
              source={require("../../assets/images/library-drawer.png")}
              resizeMode="contain"
              style={{ height: 30, width: 30, alignSelf: "flex-start" }}
            /> */}
          </View>

          <View style={[styles().flex, styles().justifyEnd, styles().mb35]}>
            <Image
              source={require("../../assets/images/welocme.png")}
              resizeMode="contain"
              style={{ height: 250, width: "100%", alignSelf: "center" }}
            />
          </View>

          <View style={[]}>
            <ThemeButton
              Title={"Login as Student"}
              Style={{ borderWidth: 2, borderColor: currentTheme.yellow }}
              onPress={async () => {
                props.navigation.navigate("Login", { isStudent: true });
              }}
            />
          </View>
          <View style={[styles().mt20]}>
            <ThemeButton
              Title={"Online Shop"}
              Style={{ borderWidth: 2, borderColor: currentTheme.yellow }}
              onPress={async () => {
                props.navigation.navigate("Login", { isShop: true });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
