import React from "react";
import { StyleSheet, View, ImageBackground, Animated, Alert, Text, TouchableOpacity, SafeAreaView } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import {FillButton, AppLogo} from '../components/index';
import { useState, useEffect } from "react";

function WelcomeScreen({navigation}) {
    const [isVisible, setIsVisible] = useState(false);
    const [logoAnimation] = useState(new Animated.Value(0));
    const [buttonAnimation] = useState(new Animated.Value(0));

    const showButton = () => {
        setIsVisible(true);
        Animated.timing(logoAnimation, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
        }).start();
        Animated.timing(buttonAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        showButton()
    }, []);
    return (
        <ImageBackground
            source={require("../../assets/images/welcome.jpeg")}
            style={styles.container}
        >
            <SafeAreaView style={[styles.content]}>
                <Animated.View style={[styles.logoLayout, {
                    opacity: logoAnimation, transform: [{
                        translateY: logoAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0]
                        })
                    }]
                }]}>
                    <AppLogo/>
                    <Text style={[GlobalStyles.h4, { color: primaryColor.darkPrimary }]}>Delivery Food App</Text>
                </Animated.View>
                
                {isVisible && (
                    <Animated.View style={[styles.buttonLayout, { opacity: buttonAnimation }]}>
                        <FillButton onPress={() =>navigation.navigate("Login")} text={'Sign In To Start'}
                        color={primaryColor.whitePrimary}
                        backgroundColor={primaryColor.organPrimary} />

                        <TouchableOpacity onPress={()=>navigation.navigate("SignUpInfo")}>
                            <Text style={[styles.commonText]}>Do not have account?</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    logoLayout: {
        flex: 7,
        top: "9%",
        alignItems: "center",
      },
      buttonLayout: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
      },
      commonText: {
        color: primaryColor.blackPrimary,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 50,
      }
});

export default WelcomeScreen;
