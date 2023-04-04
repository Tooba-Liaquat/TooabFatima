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
  let top = [
    {
      count: 10,
      image: require("../../assets/images/cover12.jpg"),
      title: "Artificial Intelligence For Dummies (2nd Edition)",
      Author: "Tom Taulli",
      price: 10,
    },
    {
      count: 10,
      title: "Being Human in the Age of Artificial Intelligence",
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover123.jpg"),
      price: 10,
    },
    {
      count: 10,
      image: require("../../assets/images/cover21.jpg"),
      title: "Computer Networking: A Top-Down Approach",
      price: 10,
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
    },
    {
      count: 10,
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      image: require("../../assets/images/cover324.png"),
      price: 10,
    },
    {
      count: 10,
      image: require("../../assets/images/cover421.jpg"),
      title: "CompTIA Network+ Certification All-in-One Exam Guide",
      Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
      price: 10,
    },
  ];

  let arivals = [
    {
      type: "Artificial Intelligence",
      image: require("../../assets/images/artificial-intelligence.png"),
      books: [
        {
          title: "Artificial Intelligence For Dummies (2nd Edition)",
          Shelf: "Python: Beginner's Guide to Artificial Intelligence",
          image: require("../../assets/images/artificial-intelligence.png"),
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
          image: require("../../assets/images/artificial-intelligence.png"),
          Author: "Denis Rothman, Matthew Lamons, Rahul Kumar",
          available: false,
          count: 4,
          price: 10,
          total: 6,
        },
        {
          title: "Being Human in the Age of Artificial Intelligence",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/artificial-intelligence.png"),
          Author: "John D. Kelleher, Brian Mac Namee, Aoife D’Arcy",
          available: true,
          count: 14,
          price: 10,
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
          image: require("../../assets/images/networking.png"),
          Author: "Mike Meyers",
          available: true,
          count: 13,
          total: 26,
          price: 10,
        },
        {
          title: "Network Programmability and Automation",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/networking.png"),
          Author: "Jason Edelman",
          available: false,
          count: 11,
          total: 14,
          price: 10,
        },
        {
          title: "Computer Networking: A Top-Down Approach",
          Shelf: "Shelf no: 15",
          image: require("../../assets/images/networking.png"),
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
          price: 10,
          total: 6,
        },
      ],
    },
  ];

  let departments = [
    {
      name: "Departments of Computer Science.",
      courses: [
        { name: "Bachelor's Degree in Computer Science (CS)" },
        { name: "Bachelor's Degree in Software Engineering (SE)" },
        { name: "Bachelor's Degree in Artifical Intelligence (AI)" },
      ],
    },
    {
      name: "Departments of Mathematics.",
      courses: [{ name: "Bachelor's Degree in Mathematics" }],
    },
    {
      name: "Departments of Management.",
      courses: [
        { name: "Bachelor's Degree in Accountng and Finance" },
        { name: "Bachelor's Degree in Bussiness Administration" },
      ],
    },
    {
      name: "Departments of Electrical Engineering.",
      courses: [
        { name: "Bachelor's Degree in Computer Engineering" },
        { name: "Bachelor's Degree in Electrical Engineering" },
      ],
    },
  ];

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <Layout
      navigation={props.navigation}
      property={"Library"}
      NotiIcon={false}
      withoutScroll={false}
      LeftIcon={false}
      ProfileImg={true}
      pagetitle={`Welcome To Library`}
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
            marginBottom: 10,
            marginTop: 15,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Departments
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {departments.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("UnderDepartment", {
                      type: item.name,
                      typeImage: require("../../assets/images/shopping-mall.png"),
                      item: item,
                    })
                  }
                  activeOpacity={0.5}
                  key={index}
                  style={[
                    {
                      padding: 5,
                      width: 150,
                      borderRadius: 5,
                      marginLeft: index === 0 ? 5 : 10,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles().w100,
                      styles().boxpeshadow,
                      styles().bgWhite,
                      // styles().ph10,
                      styles().mb10,
                      styles().h130px,
                      styles().br5,
                    ]}
                  >
                    <View
                      style={[
                        styles().wh100,
                        styles().overflowH,
                        styles().alignCenter,
                        styles().justifyCenter,
                        {
                          backgroundColor: currentTheme.bodyBg,
                        },
                      ]}
                    >
                      <Image
                        source={require("../../assets/images/shopping-mall.png")}
                        resizeMode="contain"
                        style={[styles().wh65px]}
                      />
                    </View>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles().fs12,
                      styles().fontBold,
                      {
                        color: currentTheme.black,
                        marginLeft: 5,
                      },
                    ]}
                  >
                    {item?.name?.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate("Department")}
              activeOpacity={0.5}
              style={[
                {
                  padding: 5,
                  width: 150,
                  borderRadius: 5,
                  marginLeft: 10,
                },
              ]}
            >
              <View
                style={[
                  styles().w100,
                  styles().boxpeshadow,
                  styles().bgWhite,
                  // styles().ph10,
                  styles().mb10,
                  styles().h130px,
                  styles().br5,
                  styles().alignCenter,
                  styles().justifyCenter,
                ]}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().fontBold,
                    {
                      color: currentTheme.black,
                      marginLeft: 5,
                    },
                  ]}
                >
                  {"View All"}
                </Text>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
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
                      {/* <TouchableOpacity
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
                      </TouchableOpacity> */}
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
