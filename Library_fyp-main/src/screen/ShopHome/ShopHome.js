import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import Layout from "../../Component/Layout/Layout";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Home(props) {
  const HomeTopList = [
    {
      Image: require("../../assets/images/home-top-img1.png"),
      title: "Your Text",
      onPress: () => {
        console.log("1");
      },
    },
    {
      Image: require("../../assets/images/home-top-img2.png"),
      title: "Your Text",
      onPress: () => {
        console.log("2");
      },
    },
    {
      Image: require("../../assets/images/home-top-img3.png"),
      title: "Your Text",
      onPress: () => {
        console.log("3");
      },
    },
  ];

  let top = [
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover12.jpg"),
      title: "Artificial Intelligence For Dummies (2nd Edition)",
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      title: "Being Human in the Age of Artificial Intelligence",
      price: 8.4,
      image: require("../../assets/images/cover123.jpg"),
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover21.jpg"),
      title: "Computer Networking: A Top-Down Approach",
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      image: require("../../assets/images/cover324.png"),
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover421.jpg"),
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      price: 8.4,
    },
  ];

  let Sale = [
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover21.jpg"),
      title: "Computer Networking: A Top-Down Approach",
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      image: require("../../assets/images/cover324.png"),
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover421.jpg"),
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover12.jpg"),
      title: "Artificial Intelligence For Dummies (2nd Edition)",
      price: 8.4,
    },
    {
      count: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      title: "Being Human in the Age of Artificial Intelligence",
      price: 8.4,
      image: require("../../assets/images/cover123.jpg"),
    },
  ];

  let arivals = [
    {
      type: "Artificial Intelligence",
      image: require("../../assets/images/artificial-intelligence.png"),
      books: [
        {
          title: "Artificial Intelligence For Dummies (2nd Edition)",
          price: 8.4,
          Shelf: "Python: Beginner's Guide to Artificial Intelligence",
          Author: "Tom Taulli",
          available: true,
          count: 18,
          image: require("../../assets/images/artificial-intelligence.png"),
          total: 25,
        },
        {
          title:
            "Fundamentals of Machine Learning for Predictive Data Analytics – Algorithms",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/artificial-intelligence.png"),
          price: 8.4,
          Author: "Denis Rothman, Matthew Lamons, Rahul Kumar",
          available: false,
          count: 4,
          total: 6,
        },
        {
          title: "Being Human in the Age of Artificial Intelligence",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/artificial-intelligence.png"),
          Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
          price: 8.4,
          available: true,
          count: 14,
          total: 20,
        },
      ],
    },
    {
      type: "Networking",
      image: require("../../assets/images/networking.png"),
      books: [
        {
          title: "CompTIA Network+ Certification All-in-One Exam Guide",
          Shelf: "Shelf no: 15",
          price: 8.4,
          Author: "Mike Meyers",
          available: true,
          image: require("../../assets/images/networking.png"),
          count: 13,
          total: 26,
        },
        {
          title: "Network Programmability and Automation",
          Shelf: "Shelf no: 15",
          Author: "Jason Edelman",
          available: false,
          count: 11,
          price: 8.4,
          image: require("../../assets/images/networking.png"),
          total: 14,
        },
        {
          title: "Computer Networking: A Top-Down Approach",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/networking.png"),
          Author: "James Kurose",
          price: 8.4,
          available: true,
          count: 10,
          total: 19,
        },
        {
          title: "Computer Networks",
          Shelf: "Shelf no: 15",
          Author: "Tanenbaum",
          available: true,
          price: 8.4,
          image: require("../../assets/images/networking.png"),
          count: 4,
          total: 6,
        },
      ],
    },
  ];

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
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
      property={"Library"}
      NotiIcon={false}
      withoutScroll={false}
      ProfileImg={false}
      pagetitle={`Online Books Store`}
      style={styles().ph0}
    >
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: 15,
          },
        ]}
      >
        <Text
          style={{
            marginTop: 15,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Top Rated Books:
        </Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <FlatList
            horizontal
            data={top}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("DocumentView", {
                      type: item.title,
                      typeImage: item.image,
                      item: item,
                    })
                  }
                  activeOpacity={0.5}
                  style={{
                    width: width * 0.35,
                    alignItems: "center",
                    marginLeft: 5,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 3,
                      backgroundColor: currentTheme.cEFEFEF,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 5,
                        }}
                        resizeMode={"contain"}
                      />
                    </View>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "black",
                      width: "85%",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 15,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Sale:
        </Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <FlatList
            horizontal
            data={Sale}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("DocumentView", {
                      type: item.title,
                      typeImage: item.image,
                      item: item,
                    })
                  }
                  activeOpacity={0.5}
                  style={{
                    width: width * 0.35,
                    alignItems: "center",
                    marginLeft: 5,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 3,
                      backgroundColor: currentTheme.cEFEFEF,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 5,
                        }}
                        resizeMode={"contain"}
                      />
                    </View>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      color: "black",
                      width: "85%",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 15,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Books:
        </Text>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={Sale}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("DocumentView", {
                      type: item.title,
                      typeImage: item.image,
                      item: item,
                    })
                  }
                  activeOpacity={0.5}
                  style={{
                    width: width * 0.28,
                    alignItems: "center",
                    marginLeft: 7,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 3,
                      backgroundColor: currentTheme.cEFEFEF,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 5,
                        }}
                        resizeMode={"contain"}
                      />
                    </View>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 10,
                      textAlign: "center",
                      color: "black",
                      width: "85%",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          {arivals.map((item, index) => {
            return (
              <View>
                <Text
                  style={{
                    marginBottom: 20,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {item.type}
                </Text>
                {item.books.map((books, i) => {
                  return (
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
                      <TouchableOpacity
                        onPress={() =>
                          FlashMessage({
                            msg: books?.title + " Added To Cart",
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
                            {books.title.toUpperCase()}
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
                            {books.Author}
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
                            {books.count + "/" + books.total}
                          </Text>
                        </View>
                        <ThemeButton
                          onPress={() =>
                            props.navigation.navigate("DocumentView", {
                              book: books,
                              type: item.type,
                              typeImage: item.image,
                              item: books,
                            })
                          }
                          Title={"View Details"}
                          Style={[styles().h40px, styles().mt10, styles().w80]}
                          StyleText={styles().fs12}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </Layout>
  );
}
