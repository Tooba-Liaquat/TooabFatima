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
import { CommonActions } from "@react-navigation/native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import Spinner from "../../Component/Spinner/Spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Login(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [UserName, SetUserName] = useState("");
  const [UserError, setUserError] = useState(false);
  const [Password, SetPassword] = useState("");
  const [passError, setPasswordError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  let role = props?.route?.params;
  const [ConfirmiconEye, setConfirmIconEye] = useState("eye-slash");

  function onChangeIconConfirm() {
    if (ConfirmiconEye === "eye") {
      setConfirmIconEye("eye-slash");
    } else {
      setConfirmIconEye("eye");
    }
  }

  async function Login() {
    setLoading(true);
    let status = true;
    try {
      if (UserName === "") {
        FlashMessage({ msg: "Enter Your Email Address!", type: "warning" });
        setUserError(true);
        status = false;
        return;
      }
      if (Password === "") {
        FlashMessage({ msg: "Enter Your Password!", type: "warning" });
        setPasswordError(true);
        status = false;
        return;
      } if (UserName === "fatimajabeen56@gmail.com" & Password === "12345" & currentRole === "student") {
        FlashMessage({ msg: "Login Successfully", type: "success" });
        await AsyncStorage.setItem(
          "token",
          currentRole === "student" ? "student" : "shop"
        );
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: currentRole === "student" ? "noDrawer" : "noDrawer2" },
            ],
          })
        );
        setLoading(false);
      }
      if (UserName === "shop@gmail.com" & Password === "1234" & currentRole === "shop") {
        FlashMessage({ msg: "Login Successfully", type: "success" });
        await AsyncStorage.setItem(
          "token",
          currentRole === "student" ? "student" : "shop"
        );
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: currentRole === "student" ? "noDrawer" : "noDrawer2" },
            ],
          })
        );
        setLoading(false);
      }
      else {
        FlashMessage({ msg: "Invalid username or password", type: "warning" });

      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function Role() {
    if (role?.isStudent) {
      await AsyncStorage.setItem("role", "student");
      setCurrentRole("student");
    } else {
      await AsyncStorage.setItem("role", "shop");
      setCurrentRole("shop");
    }
  }

  useEffect(() => {
    Role();
  }, [role]);

  return (
    <AuthLayout withoutScroll={true} navigation={props.navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().mt25, styles().mb35]}>
            <Text
              style={[
                styles().fs20,
                styles().fontBold,
                styles().textUpper,
                { color: currentTheme.black },
              ]}
            >
              {`Welcome To Online Library`}
            </Text>

            <Text
              style={[
                styles().fs20,
                styles().fontBold,
                styles().textUpper,
                { color: currentTheme.themeBackground },
              ]}
            >
              {currentRole !== "shop" ? `Student` : "Shop"}
            </Text>
          </View>

          {role?.isStudent ? (
            <View style={[styles().flex, styles().justifyEnd, styles().mb35]}>
              <Image
                source={require("../../assets/images/books.png")}
                resizeMode="contain"
                style={{ height: 150, width: "70%", alignSelf: "center" }}
              />
            </View>
          ) : (
            <Fontisto
              name="shopping-store"
              size={130}
              color={currentTheme.themeBackground}
              style={{ alignSelf: "center", marginBottom: 35 }}
            />
          )}

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={UserName}
              // label="Email/Phone"
              label="Email / Phone Number"
              errorText={UserError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                setUserError(false);
                SetUserName(text);
              }}
            />
          </View>

          <View style={[styles().mb25]}>
            <TextField
              secureTextEntry={ConfirmiconEye === "eye" ? false : true}
              childrenPassword={
                <TouchableOpacity
                  onPress={onChangeIconConfirm.bind()}
                  style={[styles().passEye]}
                >
                  <FontAwesome
                    name={ConfirmiconEye}
                    size={16}
                    color={currentTheme.textColor}
                  />
                </TouchableOpacity>
              }
              keyboardType="default"
              onChangeText={(e) => {
                setPasswordError(false);
                SetPassword(e);
              }}
              value={Password}
              label="Password"
              errorText={passError}
              autoCapitalize="none"
              style
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
            style={[styles().alignEnd]}
          >
            <Text
              style={[
                styles().fs13,
                styles().fontRegular,
                styles().textDecorationUnderline,
                { color: currentTheme.textColor },
              ]}
            >
              {"Forgot Password?"}
            </Text>
          </TouchableOpacity>

          <View style={[styles().mt20]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton Title={"Sign in"} onPress={() => Login()} />
            )}
          </View>

          <View
            style={[
              styles().flexRow,
              styles().justifyCenter,
              styles().alignCenter,
              styles().mb30,
              styles().mt30,
            ]}
          >
            <Text
              style={[
                styles().fs12,
                styles().fontRegular,
                { color: currentTheme.lightBlue },
                ``,
              ]}
            >
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={[
                  styles().fs12,
                  styles().fontSemibold,
                  styles().fw600,
                  { color: currentTheme.themeBackground },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
