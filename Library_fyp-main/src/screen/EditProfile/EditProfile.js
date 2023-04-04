import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Switch,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import TextField from "../../Component/FloatTextField/FloatTextField";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { ScrollView } from "react-native-gesture-handler";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";

import Spinner from "../../Component/Spinner/Spinner";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

export default function EditProfile(props) {
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);

  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [address, setAddress] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [Loading, setLoading] = useState(false);

  const [profilePicLoading, setProfilePicLoading] = useState(false);

  async function UpdateProfile() {
    let status = true;
    if (fname === "") {
      FlashMessage({ msg: "Enter First Name!", type: "warning" });
      status = false;
      return;
    }
    if (lname === "") {
      FlashMessage({ msg: "Enter Last Name!", type: "warning" });
      status = false;
      return;
    }
    if (phone === "") {
      FlashMessage({ msg: "Enter Phone!", type: "warning" });
      status = false;
      return;
    }
    if (status) {
      FlashMessage({ msg: "Profile Update!", type: "success" });
    }
  }

  const ProfileHeader = () => {
    return (
      <View
        style={[
          styles().profileHeader,
          styles().mt20,
          styles().mb30,
          styles().justifyCenter,
          styles().alignCenter,
        ]}
      >
        <View
          style={[
            styles().wh130px,
            styles().mr15,
            styles().br100,
            styles().overflowH,
            styles().borderW1,
            styles().alignCenter,
            styles().justifyCenter,
            { borderColor: currentTheme.themeBackground, borderWidth: 1 },
          ]}
        >
          {profilepic ? (
            <>
              <Image source={{ uri: profilepic }} style={styles().wh100} />
              <ActivityIndicator
                size={"small"}
                color={currentTheme.themeBackground}
                animating={profilePicLoading}
                style={{
                  position: "absolute",
                }}
              />
            </>
          ) : (
            <Text
              style={{
                fontSize: 50,
                fontWeight: "bold",
                color: currentTheme.themeBackground,
              }}
            >
              {"L"}
            </Text>
          )}
        </View>
        <CameraComponent
          loading={(e) => setProfilePicLoading(e)}
          update={(img) => {
            setImage(img);
          }}
        >
          <View
            style={{
              bottom: 25,
              left: 25,
              width: 25,
              height: 25,
              borderRadius: 20,
              alignItems: "center",
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: currentTheme.themeBackground,
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="pencil"
              size={13}
              color={currentTheme.themeBackground}
            />
          </View>
        </CameraComponent>
      </View>
    );
  };

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      pagetitle={"Edit Profile"}
      //   style={styles().ph20}
      withoutScroll
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader />
          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={fname}
              label="First Name"
              errorText={fnameError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                setFnameError(false);
                setFname(text);
              }}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={lname}
              label="Last Name"
              errorText={lnameError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                setLnameError(false);
                setLname(text);
              }}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={email}
              label="Email"
              errorText={emailError}
              autoCapitalize="none"
              editable={false}
              style
              onChangeText={(text) => {
                setEmailError(false);
                setEmail(text);
              }}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={address}
              label="Address (optional)"
              autoCapitalize="none"
              style
              stylesInput={styles().h100px}
              onChangeText={(text) => {
                setAddress(text);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View>
        {Loading ? (
          <Spinner />
        ) : (
          <ThemeButton
            onPress={() => UpdateProfile()}
            Title={"Save"}
            Style={styles().mb20}
          />
        )}
      </View>
    </Layout>
  );
}
