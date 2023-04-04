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
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const { book, type, typeImage, item } = props?.route?.params;
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
      LeftIcon={true}
      withoutScroll={false}
      pagetitle={book?.title ? book?.title : type}
      style={[styles().ph0]}
    >
      <View
        style={{
          width: "100%",
          height: 250,
          backgroundColor: currentTheme.cEFEFEF,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ height: 200, width: 250 }}>
          <Image
            source={item?.image}
            style={{ height: "100%", width: "100%" }}
            resizeMode={"contain"}
          />
        </View>
      </View>
      <View
        style={[
          styles().flex,
          { marginHorizontal: width * 0.04, paddingBottom: 20 },
        ]}
      >
        {currentRole === "shop" ? (
          <TouchableOpacity
            onPress={() =>
              FlashMessage({
                msg: item?.title + " Added To Cart",
                type: "success",
              })
            }
            style={{
              backgroundColor: currentTheme.themeBackground,
              // margin: 8,
              width: 120,
              alignSelf: "flex-end",
              marginTop: 15,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionicons name="cart" color={currentTheme.white} size={20} />
            <Text style={{ fontSize: 14, color: "white" }}>Add To Cart</Text>
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            marginBottom: 10,
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          Description
        </Text>
        <Text style={{ fontSize: 14, color: "black" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Contrary to popular belief, Lorem
          Ipsum is not simply random text. It has roots in a piece of classical
          Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32.
        </Text>
        <View style={{ marginVertical: 10 }}>
          <StarRating
            disabled={true}
            rating={5}
            emptyStarColor={currentTheme.CACCD3}
            fullStarColor={currentTheme.yellow}
            starSize={25}
            containerStyle={{ width: 140 }}
          />
        </View>
        <Text
          style={{
            marginTop: 15,
            marginBottom: 10,
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          Price
        </Text>
        <Text style={{ fontSize: 14, color: "black" }}>
          {"Rs " + item?.price?.toFixed(2)}
        </Text>
        <Text
          style={{
            marginTop: 15,
            marginBottom: 10,
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          Author
        </Text>
        <Text style={{ fontSize: 14, color: "black" }}>{item?.Author}</Text>
        {currentRole === "shop" ? (
          <View style={[styles().mv15, styles().mt50]}>
            <ThemeButton
              Title={"Buy Complete Edition"}
              onPress={() => {
                props.navigation.navigate("Cart");
              }}
            />
          </View>
        ) : null}
      </View>
    </Layout>
  );
}
