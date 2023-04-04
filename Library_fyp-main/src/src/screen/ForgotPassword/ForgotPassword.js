import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "../../Component/Spinner/Spinner";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
export default function ForgotPassword(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PhoneNumbererror, setPhoneNumberError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setPhoneNumber("");
    setPhoneNumberError(null);
  }, [isFocused]);

  function ForgotPassword() {
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let status = true;
    if (PhoneNumber === "") {
      FlashMessage({ msg: "Enter Email Address!", type: "warning" });
      setPhoneNumberError(true);
      status = false;
      return;
    }
    if (!emailregex.test(PhoneNumber.trim().toLowerCase())) {
      FlashMessage({ msg: "Invalid Email Address!", type: "warning" });
      setPhoneNumberError(true);
      status = false;
      return;
    } else {
      props.navigation.navigate("Verification", {
        forgot_email: PhoneNumber.trim().toLowerCase(),
        email: PhoneNumber.toLowerCase().trim(),
      });
      setLoading(false);
    }
  }

  return (
    <AuthLayout navigation={props.navigation}>
      <View style={styles().flex}>
        <View style={[styles().mt25]}>
          <Text
            style={[
              styles().fs24,
              styles().fontRegular,
              { color: currentTheme.black },
            ]}
          >
            Forgot
            <Text
              style={[
                styles().fs24,
                styles().fontSemibold,
                styles().lh30,
                styles().fw600,
                { color: currentTheme.themeBackground },
              ]}
            >
              {" "}
              Password
            </Text>
          </Text>
        </View>
        <Text
          style={[
            styles().fontRegular,
            { color: currentTheme.textColor, marginBottom: 10, marginTop: 10 },
            ,
            styles().fs14,
          ]}
        >
          Enter the phone number or email address link with your account to
          reset your password.
        </Text>
        <View style={styles().mt10}>
          <TextField
            keyboardType="default"
            value={PhoneNumber}
            label="Email"
            errorText={PhoneNumbererror}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setPhoneNumberError(false);
              setPhoneNumber(text);
            }}
          />
        </View>
      </View>

      <View style={styles().mt20}>
        {!loading ? (
          <ThemeButton onPress={() => ForgotPassword()} Title={"Check"} />
        ) : (
          <Spinner />
        )}
      </View>
    </AuthLayout>
  );
}
