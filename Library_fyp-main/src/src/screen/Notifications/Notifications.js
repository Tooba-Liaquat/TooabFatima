import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default function Notifications(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [Notifications, setNotifications] = useState([
    {
      image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
      title: "Your Notifications",
      address: "Astitue Home",
      date: "November 23,2022",
      duration: "35 min ago",
      detail:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
      title: "Your Notifications",
      address: "Astitue Home",
      date: "November 23,2022",
      duration: "35 min ago",
      detail:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
  ]);

  const style = StyleSheet.create({
    type: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    typeName: {
      marginRight: 5,
      fontSize: 14,
      fontWeight: "bold",
      color: currentTheme.black,
    },
    count: { fontWeight: "bold", fontSize: 10, color: currentTheme.black },
    numberofNotiConatainer: {
      borderRadius: 100,
      height: 20,
      width: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: currentTheme.themeBackground,
      padding: 3,
    },
    notiContainer: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: currentTheme.bodyBg,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginRight: 10,
      //   flex: 1,
    },
    img: {
      height: 50,
      width: 50,
      overflow: "hidden",
      borderRadius: 5,
    },
    notititle: {
      fontSize: 12,
      fontWeight: "bold",
      color: currentTheme.black,
      marginTop: 5,
    },
    notidetail: {
      flex: 1,
      marginTop: 10,
      fontSize: 10,
      color: currentTheme.textColor,
    },
    duration: {
      fontSize: 10,
      fontWeight: "bold",
      color: currentTheme.textColor,
    },
    addressAnddate: {
      fontSize: 8,
      color: currentTheme.textColor,
    },
    dateAndAddressContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginBottom: 10,
      overflow: "hidden",
      //   backgroundColor: "red",
    },
  });

  const NotificationComp = ({ noti, index }) => {
    // console.log(noti._id);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={index}
        style={{
          ...style.notiContainer,
          // borderWidth: noti.seen ? 0 : 0.5,
          borderColor: currentTheme.themeBackground,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={style.img}>
            {noti?.image ? (
              <Image
                style={{ height: "100%", width: "100%" }}
                resizeMode={"cover"}
                source={noti.image}
              />
            ) : (
              <View
                style={[
                  styles().wh100,
                  {
                    borderRadius: 5,
                    backgroundColor: currentTheme.white,
                    borderWidth: 0.5,
                    borderColor: currentTheme.BCBCBC,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Ionicons name="image" size={25} color={currentTheme.BCBCBC} />
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text numberOfLines={1} style={style.notititle}>
              {noti.title}
            </Text>
            <View style={style.dateAndAddressContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flex: 0.5,
                }}
              >
                <Entypo
                  name="home"
                  size={10}
                  color={currentTheme.textColor}
                  style={styles().mr5}
                />
                <Text numberOfLines={1} style={style.addressAnddate}>
                  {noti.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginRight: 10,
                  flex: 0.5,
                }}
              >
                <Entypo
                  name="calendar"
                  size={10}
                  color={currentTheme.textColor}
                  style={styles().mr5}
                />
                <Text numberOfLines={1} style={style.addressAnddate}>
                  {moment(noti.date).format("lll")}
                </Text>
              </View>
            </View>
          </View>
          <Text style={style.duration}>{moment(noti.date).fromNow()}</Text>
        </View>
        <Text numberOfLines={3} style={style.notidetail}>
          {noti.detail ? noti.detail : "- - -"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Notifications"}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <View style={[styles().mb20, styles().mt5]}>
          <FlatList
            data={Notifications}
            renderItem={({ item, index }) => {
              return <NotificationComp noti={item} index={index} />;
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
