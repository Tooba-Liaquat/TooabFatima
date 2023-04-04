import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import styles from "../../screen/styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationAction } from "@react-navigation/native";

const MenuItems = [
  {
    id: 1,
    name: "Categories",
    Image: require("../../assets/images/my-properties.png"),
    navigateTo: "DocumentListing",
  },
  {
    id: 2,
    name: "Departments",
    Image: require("../../assets/images/my-properties.png"),
    navigateTo: "Department",
  },
  {
    id: 3,
    name: "Search",
    Image: require("../../assets/images/my-properties.png"),
    navigateTo: "Search",
  },
  // {
  //   id: 3,
  //   name: "My Cart",
  //   Image: require("../../assets/images/my-properties.png"),
  //   navigateTo: "Cart",
  // },
];

export default function SideBar(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // console.log('babuji keh rahe hain', props.navigation)
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [property, setProperty] = useState("");

  const getPropertyAsync = async () => {
    let property = await AsyncStorage.getItem("property");
    // console.log("property in sidedrawer =====>", property);
    setProperty(property);
    return property;
  };

  async function Logout() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
    await AsyncStorage.clear().then(() => console.log("async clear - logout!"));
  }

  useEffect(() => {
    getPropertyAsync();
  }, []);

  const [currentRole, setCurrentRole] = useState("");

  async function Role() {
    let role = await AsyncStorage.getItem("role");
    setCurrentRole(role);
  }

  useEffect(() => {
    Role();
  }, []);

  return (
    <LinearGradient
      end={{ x: 0.2, y: 0.15 }}
      colors={currentTheme.sidebarGrad}
      style={[
        styles().flex,
        { borderBottomRightRadius: 30, borderTopRightRadius: 30 },
      ]}
    >
      <View
        style={[styles().pt35, styles().flex, styles().pl15, styles().pr15]}
      >
        <View style={[styles().mb35]}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[styles().alignEnd, styles().justifyEnd, styles().backButn]}
          >
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/* <Text>Your Digital </Text> */}
        <View
          style={{
            padding: 40,
            borderRadius: 200 / 2,
            borderWidth: 2,
            borderColor: currentTheme.themeBackground,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/images/library-drawer.png")}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View style={[styles().flex]}>
          {currentRole === "student" ? (
            <FlatList
              data={MenuItems}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      props.navigation.navigate(item.navigateTo);
                    }}
                    style={[
                      styles().flexRow,
                      styles().flex,
                      styles().alignCenter,
                      styles().pv10,
                      styles().mb10,
                    ]}
                  >
                    <View style={[styles().mr20, styles().wh20px]}>
                      {/* <Image
                      source={item.Image}
                      style={[
                        styles().wh100,
                        {
                          tintColor:
                            item.name === "Finance"
                              ? currentTheme.BCBCBC
                              : currentTheme.themeBackground,
                        },
                      ]}
                      resizeMode={"contain"}
                    /> */}
                      <Entypo
                        name="list"
                        size={20}
                        color={currentTheme.themeBackground}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles().fs13,
                          styles().fw600,
                          {
                            color:
                              item.id === 6
                                ? currentTheme.BCBCBC
                                : currentTheme.black,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                      {item.id === 6 && (
                        <Text
                          style={[
                            styles().fs10,
                            styles().fw400,
                            { color: currentTheme.BCBCBC },
                          ]}
                        >
                          Feature coming soon
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                <TouchableOpacity
                  onPress={() => Logout()}
                  style={[styles().flexRow, styles().pv10]}
                >
                  <View style={[styles().mr20, styles().wh20px]}>
                    <Image
                      source={require("../../assets/images/logout.png")}
                      style={styles().wh100}
                      resizeMode="contain"
                      tintColor={"#f85d31"}
                    />
                  </View>
                  <Text
                    style={[
                      styles().fs13,
                      styles().fw600,
                      { color: currentTheme.black },
                    ]}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              }
            />
          ) : null}
          {/* <TouchableOpacity
            onPress={() => Logout()}
            style={[styles().flexRow, styles().pv10, {borderWidth:2}]}
          >
            <View style={[styles().mr20, styles().wh20px]}>
              <Image
                source={require("../../assets/images/logout.png")}
                style={styles().wh100}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles().fs13,
                styles().fw600,
                { color: currentTheme.black },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View
        style={[
          styles().flexRow,
          styles().alignCenter,
          styles().ph15,
          styles().pb25,
          styles().mt20,
        ]}
      >
        <Text
          style={[
            styles().fs16,
            styles().mr10,
            styles().fw600,
            { color: currentTheme.textColor },
          ]}
        >
          Follow us
        </Text>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="facebook-f"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="instagram"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="twitter"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
