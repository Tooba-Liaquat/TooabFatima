import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  Ionicons,
  Foundation,
  Entypo,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Courses(props) {
  const { book, type, typeImage } = props?.route?.params;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  let data = [
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      title: "Sample Book",
      path: "https://www.africau.edu/images/default/sample.pdf",
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
      withoutScroll={true}
      pagetitle={book?.title ? book?.title + " Books" : type + " Books"}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          data={data}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            function get_url_extension(url) {
              return url
                .split(/[#?]/)[0]
                .split(".")
                .pop()
                .trim();
            }

            let docType = get_url_extension(item.path);
            // console.log("===>", docType);
            let icon =
              docType === "pdf" ? (
                <FontAwesome5
                  name="file-pdf"
                  size={65}
                  color={currentTheme.themeBackground}
                />
              ) : docType === "docx" || docType === "doc" ? (
                <FontAwesome
                  name="file-word-o"
                  size={65}
                  color={currentTheme.themeBackground}
                />
              ) : docType === "png" ||
                docType === "jpeg" ||
                docType === "jpg" ||
                docType === "gif" ? (
                <Image source={{ uri: item.path }} style={styles().wh100} />
              ) : (
                <FontAwesome
                  name="file-text-o"
                  size={65}
                  color={currentTheme.themeBackground}
                />
              );
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => {
                  if (currentRole === "shop") {
                    FlashMessage({
                      msg:
                        "Add this Book to Cart to Read the Complete Version.",
                      type: "warning",
                    });
                  } else {
                    Linking.openURL(item.path).catch((err) =>
                      console.error("Error in linking", err)
                    );
                  }
                }}
                style={[
                  styles().mb20,
                  {
                    padding: 5,
                    width: width * 0.44,
                    marginRight: index % 2 === 0 ? width * 0.04 : 0,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (currentRole === "shop") {
                      FlashMessage({
                        msg:
                          "Add this Book to Cart to Read the Complete Version.",
                        type: "warning",
                      });
                    } else {
                      Linking.openURL(item.path).catch((err) =>
                        console.error("Error in linking", err)
                      );
                    }
                  }}
                  style={[
                    styles().w100,
                    styles().boxpeshadow,
                    styles().bgWhite,
                    styles().ph10,
                    styles().mb10,
                    styles().h130px,
                    styles().br5,
                  ]}
                >
                  {currentRole === "shop" ? (
                    <TouchableOpacity
                      onPress={() =>
                        FlashMessage({
                          msg: book?.title
                            ? book?.title
                            : type + " " + item?.title + " Added To Cart",
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
                      styles().wh100,
                      styles().overflowH,
                      styles().alignCenter,
                      styles().justifyCenter,
                    ]}
                  >
                    {icon}
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().fw400,
                    { color: currentTheme.black, marginLeft: 5 },
                  ]}
                >
                  {book?.title
                    ? book?.title
                    : type + " " + item?.title?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={styles().mb100} />}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: currentTheme.textColor,
                    fontSize: 14,
                  }}
                >
                  No Data
                </Text>
              </View>
            );
          }}
        />
      </View>
    </Layout>
  );
}
