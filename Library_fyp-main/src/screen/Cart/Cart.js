import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  LayoutAnimation,
  UIManager,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { Entypo } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";

const { width, height } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DocumentListing(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [cartitem, setCartitem] = useState([
    {
      title:
        "Fundamentals of Machine Learning for Predictive Data Analytics – Algorithms",
      image: require("../../assets/images/cover324.png"),
      price: 10,
      perItemprice: 10,
      quantity: 3,
    },
    {
      title: "Artificial Intelligence For Dummies (2nd Edition)",
      image: require("../../assets/images/cover12.jpg"),
      price: 12.25,
      perItemprice: 12.25,
      quantity: 5,
    },
    {
      title: "Network Programmability and Automation",
      image: require("../../assets/images/cover21.jpg"),
      price: 8.5,
      perItemprice: 8.5,
      quantity: 2,
    },
    {
      title: "Network Programmability and Automation",
      image: require("../../assets/images/networking.png"),
      price: 25,
      perItemprice: 25,
      quantity: 3,
    },
  ]);

  const initialValue = 0;
  const total = cartitem.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    initialValue
  );

  const Add = (item, index) => {
    let x = cartitem.map((value, i) => {
      if (i == index) {
        return {
          ...value,
          quantity: value.quantity + 1,
          price: value.price + item.perItemprice,
        };
      } else {
        return value;
      }
    });
    setCartitem(x);
  };

  const Minus = (item, index) => {
    if (item.quantity > 0) {
      let x = cartitem.map((value, i) => {
        if (i == index) {
          return {
            ...value,
            quantity: value.quantity - 1,
            price: value.price - item.perItemprice,
          };
        } else {
          return value;
        }
      });
      setCartitem(x);
    } else if (item.quantity === 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCartitem((crt) => {
        return crt.filter((_el, i) => index !== i);
      });
    }
  };

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"My Cart"}
      NotiIcon={undefined}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          ORDER INFORMATION:
        </Text>
        <FlatList
          data={cartitem}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: currentTheme.EBEBEB,
                  borderRadius: 10,
                  height: 100,
                  marginTop: 15,
                  shadowColor: currentTheme.themeBackground,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  margin: 10,
                }}
              >
                <View>
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                      overflow: "hidden",
                      padding: 10,
                      backgroundColor: currentTheme.white,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    //   backgroundColor: "teal",
                    height: "100%",
                    paddingLeft: 20,
                    //   paddingRight: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold" }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {"Rs " + item.perItemprice * item.quantity}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => Minus(item, index)}
                        style={{
                          padding: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: currentTheme.themeBackground,
                          borderRadius: 5,
                        }}
                      >
                        <Entypo name="minus" color={"white"} size={20} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginHorizontal: 10,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => Add(item, index)}
                        style={{
                          padding: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: currentTheme.themeBackground,
                          borderRadius: 5,
                        }}
                      >
                        <Entypo name="plus" color={"white"} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => (
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 40,
                borderBottomWidth: 1,
                borderColor: currentTheme.CACCD3,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: currentTheme.black,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: currentTheme.black,
                  fontWeight: "600",
                }}
              >
                {`Rs ${total?.toFixed(2)}`}
              </Text>
            </View>
          )}
        />

        <View style={[styles().mv15]}>
          <ThemeButton
            Title={"Next"}
            onPress={() => {
              props.navigation.navigate("Checkout", {
                cartitem: cartitem,
                total: total,
              });
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
