import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Spinner from "../../Component/Spinner/Spinner";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import { useIsFocused } from "@react-navigation/native";

const CELL_COUNT = 6;
export default function Verification(props) {
  let { user, forgot_email, email } = props?.route?.params;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [value, setValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setLoading] = useState(false);

  async function Verify() {
    setLoading(true);
    if (value.length === 6) {
      props.navigation.navigate("ResetPassword", {
        email: forgot_email,
      });
    } else {
      setLoading(false);
      FlashMessage({ msg: "Enter OTP!", type: "warning" });
    }
  }

  const counts = 3;
  const [counter, setCounter] = useState(counts);
  const isFocused = useIsFocused();
  useEffect(() => {
    let timer = setInterval(() => {
      setCounter((count) => (count > 0 ? count - 1 : 0));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function secondsToTime(e) {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return h + ":" + m + ":" + s;
    // return `${h}:${m}:${s}`;
  }
  useEffect(() => {
    setCounter(counts);
  }, [isFocused]);
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
            Phone{" "}
            <Text
              style={[
                styles().fs24,
                styles().fontSemibold,
                styles().lh30,
                styles().fw600,
                { color: currentTheme.themeBackground },
              ]}
            >
              Verification
            </Text>
          </Text>
          <Text
            style={[
              styles().fontRegular,
              { color: currentTheme.textColor },
              styles().fs14,
            ]}
          >
            {`Please enter 6 digit code send to your ${
              forgot_email ? "Email" : "phone number"
            } ${forgot_email ? email : user?.phone}`}
          </Text>
        </View>

        <View style={[styles().mt30, styles().mb10]}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={[]}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => {
              return (
                <View
                  key={index}
                  style={[
                    styles(currentTheme).verifyContainer,
                    isFocused && {
                      borderColor: currentTheme.themeBackground,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles().fs24,
                      styles().fontRegular,
                      {
                        color: currentTheme.themeBackground,
                        // backgroundColor: currentTheme.white
                      },
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : "-")}
                  </Text>
                </View>
              );
            }}
          />

          <View
            style={[
              styles().flexRow,
              styles().mt15,
              styles().justifyCenter,
              styles().alignCenter,
            ]}
          >
            <Text
              style={[
                styles().fontRegular,
                { color: currentTheme.black },
                styles().fs14,
              ]}
            >
              Resend code after
              <Text style={{ color: currentTheme.themeBackground }}>
                {` ${secondsToTime(counter)} `}
              </Text>
              {`Min. `}
            </Text>
            <TouchableOpacity
              disabled={counter === 0 ? false : true}
              onPress={() => {
                alert("resent otp!");
              }}
            >
              <Text
                style={[
                  styles().fontSemibold,
                  styles().fs14,
                  styles().textDecorationUnderline,
                  {
                    color:
                      counter === 0
                        ? currentTheme.themeBackground
                        : currentTheme.c999999,
                  },
                ]}
              >
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        {!loading ? (
          <ThemeButton onPress={() => Verify()} Title={"Verify"} />
        ) : (
          <Spinner />
        )}
      </View>
    </AuthLayout>
  );
}
