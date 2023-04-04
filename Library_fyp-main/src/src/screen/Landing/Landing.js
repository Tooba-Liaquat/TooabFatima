import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import Layout from "../../Component/Layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function Landing(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [page, Setpage] = useState(0);

  // const [scrollValue, SetscrollValue] = useState(0)

  const _scrollView = useRef();

  function handleOnScroll(event) {
    //calculate screenIndex by contentOffset and screen width
    Setpage(
      parseInt(
        event.nativeEvent.contentOffset.x / Dimensions.get("window").width
      )
    );
    // SetscrollValue(parseInt(event.nativeEvent.contentOffset.x/Dimensions.get('window').width))
    console.log(
      "currentScreenIndex",
      parseInt(
        event.nativeEvent.contentOffset.x / Dimensions.get("window").width
      )
    );
  }

  let scrollValue = 0;
  function asd() {
    if (scrollValue === width * 3) {
      console.log("andar araha hai");

      // SetscrollValue(0)
      scrollValue = 0;
      _scrollView.current.scrollTo({ x: scrollValue });
    } else {
      console.log(width);
      // SetscrollValue(prev => prev + width )
      scrollValue = scrollValue + width; // width = screen width
      _scrollView.current.scrollTo({ x: scrollValue, animated: true });
    }
  }

  const FirstTime = async () => {
    await AsyncStorage.setItem("first_time", "1");
  };

  useEffect(() => {
    // FirstTime();
  }, []);

  //   useEffect(()=>{
  //     let scrollValue = 0;
  //     // console.log(scrollValue)
  //     const interval = setInterval(function(){
  //      console.log(scrollValue)
  //         if(scrollValue === width * 3){
  //             console.log('andar araha hai')

  //             scrollValue = 0;
  //             _scrollView.current.scrollTo({x: scrollValue})
  //         } else {
  //       scrollValue = scrollValue + width;   // width = screen width
  //       _scrollView.current.scrollTo({x: scrollValue, animated:true})
  //     }
  //     }, 2000);
  //     return () => clearInterval(interval);
  // }, []);

  const landingText = [
    {
      image: require("../../assets/images/books.png"),
      heading: "Your Heading!",
      text1:
        "Library is here to make your life easier. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      image: require("../../assets/images/books.png"),
      heading: "Your Heading!",
      text1:
        "Library gives you central a location to store all of your important documents. Think:",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      image: require("../../assets/images/books.png"),
      heading: "Your Heading!",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
  ];

  return (
    <View style={[styles().flex, styles().justifyEnd, styles().pv20]}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={(e) => handleOnScroll(e)}
        scrollEventThrottle={5}
        showsHorizontalScrollIndicator={false}
        ref={_scrollView}
        bounces={false}
        contentContainerStyle={{ alignItems: "flex-end" }}
      >
        <View
          style={[
            styles().flex,
            styles().ph20,
            styles().pt20,
            { width: width },
          ]}
        >
          <View style={[styles().flex, styles().justifyEnd]}>
            <Image
              source={landingText[page].image}
              resizeMode="contain"
              style={{ height: 200, width: "70%", alignSelf: "center" }}
            />
          </View>
          <View style={[styles().flex, styles().mt25]}>
            <Text
              style={[
                styles().fs20,
                styles().mt15,
                styles().fontSemibold,
                styles().lh30,
                { color: currentTheme.black },
              ]}
            >
              {landingText[page].heading}
            </Text>
            <View
              style={[
                { width: width - 40 },
                styles().mt5,
                styles().flexRow,
                styles().flexWrap,
              ]}
            >
              <Text
                style={[
                  styles().fs14,
                  styles().mb10,
                  styles().fontRegular,
                  styles().lh18,
                  { color: currentTheme.c50545D },
                ]}
              >
                {landingText[page].text1}
              </Text>
              {page == 1 ? (
                <View style={[styles().mb10, styles().w100]}>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - receipts
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - warranties
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - insurance information
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - titles
                  </Text>
                </View>
              ) : null}
              <Text
                style={[
                  styles().fs14,
                  styles().fontRegular,
                  styles().lh18,
                  { color: currentTheme.c50545D },
                ]}
              >
                {landingText[page].text2}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles().w100,
              styles().mt15,
              styles().flexRow,
              styles().justifyCenter,
              styles().alignCenter,
            ]}
          >
            {landingText.map((a, i) => {
              return (
                <View
                  key={i}
                  style={
                    page === i
                      ? styles(currentTheme).ActiveCricleBullent
                      : styles().CircleBullent
                  }
                />
              );
            })}
          </View>

          <View style={[styles().mt15]}>
            <ThemeButton
              Title={page == 2 ? "Start" : "Next"}
              onPress={() =>
                page == 2
                  ? props.navigation.navigate("Auth")
                  : Setpage(page + 1)
              }
            ></ThemeButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
