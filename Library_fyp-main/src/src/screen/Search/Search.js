import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [search, setSearch] = useState("");

  let data = [
    {
      title: "Artificial Intelligence For Dummies (2nd Edition)",
      Shelf: "Python: Beginner's Guide to Artificial Intelligence",
      image: require("../../assets/images/cover123.jpg"),
      Author: "Tom Taulli",
      available: true,
      count: 18,
      total: 25,
      price: 10,
    },
    {
      title:
        "Fundamentals of Machine Learning for Predictive Data Analytics – Algorithms",
      Shelf: "Shelf no: 15",
      Author: "Denis Rothman, Matthew Lamons, Rahul Kumar",
      image: require("../../assets/images/cover21.jpg"),
      available: false,
      count: 4,
      total: 6,
      price: 10,
    },
    {
      title: "Being Human in the Age of Artificial Intelligence",
      Shelf: "Shelf no: 15",
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover12.jpg"),
      available: true,
      count: 14,
      price: 10,
      total: 20,
    },
    {
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      Shelf: "Shelf no: 15",
      Author: "Mike Meyers",
      image: require("../../assets/images/networking.png"),
      available: true,
      count: 13,
      total: 26,
      price: 10,
    },
    {
      title: "Network Programmability and Automation",
      Shelf: "Shelf no: 15",
      Author: "Jason Edelman",
      image: require("../../assets/images/cover421.jpg"),
      available: false,
      count: 11,
      price: 10,
      total: 14,
    },
    {
      title: "Computer Networking: A Top-Down Approach",
      Shelf: "Shelf no: 15",
      image: require("../../assets/images/cover12.jpg"),
      Author: "James Kurose",
      available: true,
      count: 10,
      price: 10,
      total: 19,
    },
    {
      title: "Computer Networks",
      Shelf: "Shelf no: 15",
      image: require("../../assets/images/networking.png"),
      Author: "Tanenbaum",
      available: true,
      count: 4,
      total: 6,
      price: 10,
    },
  ];

  const [currentRole, setCurrentRole] = useState("");

  async function Role() {
    let role = await AsyncStorage.getItem("role");
    setCurrentRole(role);
  }

  useEffect(() => {
    Role();
  }, []);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={false}
      pagetitle={"Search"}
      style={[styles().ph0]}
    >
      <View style={{ paddingHorizontal: 20 }}>
        {/* <Text
          style={{
            marginBottom: 10,
            marginTop: 15,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Search
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <Ionicons
            name="search"
            color={currentTheme.themeBackground}
            size={30}
          />
          <TextInput
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search for books..."
            style={{
              borderWidth: 2,
              borderColor: currentTheme.themeBackground,
              height: 50,
              borderRadius: 10,
              color: "black",
              padding: 10,
              flex: 1,
              marginLeft: 10,
            }}
          />
        </View>
        {data.map((item, index) => {
          if (
            item.title
              .toLowerCase()
              .trim()
              .includes(search.toLowerCase().trim())
          ) {
            return (
              <View>
                {currentRole === "shop" ? (
                  <TouchableOpacity
                    onPress={() =>
                      FlashMessage({
                        msg: item?.title + " Added To Cart",
                        type: "success",
                      })
                    }
                    style={{
                      position: "absolute",
                      backgroundColor: currentTheme.themeBackground,
                      right: 0,
                      margin: 8,
                      borderRadius: 5,
                      padding: 5,
                      zIndex: 100,
                    }}
                  >
                    <Ionicons
                      name="cart"
                      color={currentTheme.white}
                      size={18}
                    />
                  </TouchableOpacity>
                ) : null}
                <View
                  style={[
                    styles().justifyBetween,
                    styles().flexRow,
                    styles().boxpeshadow,
                    styles().br10,
                    styles().ph15,
                    styles().pv15,
                    styles().mb20,
                    { width: width * 0.88 },
                    { marginHorizontal: 10 },
                  ]}
                >
                  <View
                    style={[
                      styles().wh80px,
                      styles().h110px,
                      styles().br10,
                      styles().overflowH,
                    ]}
                  >
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles().wh100}
                    />
                  </View>
                  <View
                    style={[
                      styles().flex,
                      styles().justifyBetween,
                      styles().ml10,
                    ]}
                  >
                    <View
                      style={[
                        styles().flexRow,
                        styles().alignCenter,
                        styles().justifyStart,
                        { marginBottom: 3 },
                      ]}
                    >
                      <Text
                        numberOfLines={2}
                        style={[
                          styles().fs12,
                          styles().fontSemibold,
                          { color: currentTheme.black },
                        ]}
                      >
                        {item.title.toUpperCase()}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles().flexRow,
                        styles().alignCenter,
                        styles().justifyStart,
                      ]}
                    >
                      <Ionicons
                        name="people"
                        size={15}
                        color={currentTheme.textColor}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles().fs10,
                          styles().fontRegular,
                          {
                            color: currentTheme.textColor,
                            flex: 1,
                            marginLeft: 4,
                          },
                        ]}
                      >
                        {item.Author}
                      </Text>
                    </View>
                    <View style={[styles().flexRow, styles().alignCenter]}>
                      <View style={styles().mtminus5}>
                        <Ionicons
                          name="list-outline"
                          size={15}
                          color={currentTheme.textColor}
                          style={styles().mr5}
                        />
                      </View>
                      <Text
                        style={[
                          styles().fs10,
                          styles().fontRegular,
                          { color: currentTheme.textColor },
                        ]}
                      >
                        {item.count + "/" + item.total}
                      </Text>
                    </View>
                    <ThemeButton
                      onPress={() =>
                        props.navigation.navigate("DocumentView", {
                          type: item.title,
                          typeImage: item.image,
                          item: item,
                        })
                      }
                      Title={"View Details"}
                      Style={[styles().h40px, styles().mt10, styles().w80]}
                      StyleText={styles().fs12}
                    />
                  </View>
                </View>
              </View>
            );
          }
        })}
        {/* <View style={[styles().bottom20, styles().mt35, , { flex: 1 }]}>
          <ThemeButton onPress={() => {}} Title={"Search"} />
        </View> */}
      </View>
    </Layout>
  );
}
