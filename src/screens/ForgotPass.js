import React from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputBox, FillButton } from "../components";

function ForgotPass({navigation}) {
    return(
        <SafeAreaView style={[GlobalStyles.heighFullScreen,{backgroundColor: primaryColor.creamPrimary}]}>
            <View style={[GlobalStyles.padScreen20]}>
                <Text style={[GlobalStyles.h1, {color:primaryColor.organPrimary}]}>FORGOT PASSWORD</Text>
                <View style = {[styles.mTop25]}>
                    <Text style={[GlobalStyles.basicText]}>
                        Enter the email associated with your account and we'll send an email instruction to reset your password.
                    </Text>
                    <InputBox text="Email" textColor={primaryColor.darkPrimary} placeholder="Enter your Email"/> 
                    
                    <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                        <FillButton onPress={()=>navigation.navigate("OTPScreen")} color={primaryColor.whitePrimary} backgroundColor={primaryColor.organPrimary} text={"Continue"}/>
                        <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={[styles.mTop25]}>
                            <Text style={[GlobalStyles.basicText, {color:primaryColor.blackPrimary}]}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mTop25:{
        marginTop:25
    },
    mt15:{
        marginTop:15,
    },
})

export default ForgotPass;