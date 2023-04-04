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
import { AntDesign } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import TextField from "../../Component/FloatTextField/FloatTextField";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  let { cartitem, total } = props.route?.params;
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  let cal = [
    { title: "Subtotal:", amount: `Rs ${total}` },
    { title: "Discount:", amount: "Rs 0.00" },
    { title: "Delivery Method:", amount: "Cash on Delivery" },
  ];
  const [orderPopup, setOrderPopup] = useState(false);

  function Order() {
    if (email === "") {
      FlashMessage({ msg: "Enter Contact Number", type: "warning" });
      return;
    }
    if (address === "") {
      FlashMessage({ msg: "Enter Delivery Address", type: "warning" });
      return;
    }
    setOrderPopup(true);
  }

  const OrderPopup = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={orderPopup}>
        <View
          style={[styles().flex, styles().alignCenter, styles().justifyCenter]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => orderPopup(false)}
            style={[
              styles().posAbs,
              styles().top0,
              styles().bottom0,
              styles().left0,
              styles().right0,
              { backgroundColor: currentTheme.modalShadow },
            ]}
          />
          <View style={[styles().alignCenter, styles().justifyCenter]}>
            <View
              style={[
                styles().bgWhite,
                styles().pt25,
                styles().justifyCenter,
                styles().br10,
                styles().pb25,
                styles().ph15,
                { width: width * 0.8 },
              ]}
            >
              <View style={[styles().alignCenter]}>
                <AntDesign
                  name="checkcircleo"
                  size={60}
                  color={currentTheme.themeBackground}
                />
                <Text
                  style={[
                    styles().fs16,
                    styles().fontSemibold,
                    styles().textCenter,
                    styles().mt15,
                    styles().mb15,
                    {
                      color: currentTheme.black,
                      width: "80%",
                    },
                  ]}
                >
                  Thankyou, Your Oder Has Been Placed
                </Text>
              </View>
              <ThemeButton
                onPress={() => {
                  setOrderPopup(false);
                  props.navigation.navigate("ShopHome");
                }}
                Title={"Done"}
                StyleText={{ color: currentTheme.white, fontSize: 14 }}
                Style={[
                  styles().mt15,
                  //   styles().mb15,
                  styles().h45px,
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={false}
      pagetitle={"Checkout"}
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
          ORDERS:
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
                    <Text
                      style={{
                        fontSize: 16,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {"Rs " + item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                        fontWeight: "600",
                      }}
                    >{`Quantity: ${item.quantity}`}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          {cal.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: currentTheme.CACCD3,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: currentTheme.black,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: currentTheme.black,
                  }}
                >
                  {item.amount}
                </Text>
              </View>
            );
          })}
        </View>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          Delivery Details:
        </Text>
        <View style={styles().mb20}>
          <TextField
            keyboardType="numeric"
            value={email}
            label="Contact Number"
            errorText={emailError}
            autoCapitalize="none"
            // editable={false}
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
            label="Delivery Address"
            autoCapitalize="none"
            style
            stylesInput={styles().h100px}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
        </View>
        <View style={[styles().mv15]}>
          <ThemeButton Title={"Order Now"} onPress={() => Order()} />
        </View>
      </View>
      <OrderPopup />
    </Layout>
  );
}
