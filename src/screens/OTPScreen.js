// OTPScreen component
import React from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { FillButton, OTPInput } from "../components";

function OTPScreen({navigation}) {
  const otpLength = 6
  return (
    <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.creamPrimary }]}>
      <View style={[GlobalStyles.padScreen20]}>
        <Text style={[GlobalStyles.h1, {color: primaryColor.organPrimary}, GlobalStyles.mb20]}>Verification</Text>
        <View style={[GlobalStyles.mt10]}>
          <Text style={[GlobalStyles.basicText, GlobalStyles.alightSelfCenter, GlobalStyles.mb20]}>
            Enter 6 digits code that you received on your email.
          </Text>
          <OTPInput length={otpLength} />
          <View style={[GlobalStyles.flex, {flexDirection:"row"}, GlobalStyles.alightSelfCenter, GlobalStyles.mt20]}>
            <Text style={[GlobalStyles.basicText]}>Didn't received OTP code? </Text>
            <TouchableOpacity onPress={()=>{
              Alert.alert("resend")
            }}>
              <Text style={[GlobalStyles.basicText, {color:primaryColor.organPrimary}]}>Resend OTP code</Text>
            </TouchableOpacity>
          </View>
          <View style ={[GlobalStyles.alightItemCenter, GlobalStyles.mt20]}>
            <FillButton backgroundColor={primaryColor.organPrimary} color={primaryColor.whitePrimary} text="Continue"></FillButton>
          </View>
          <TouchableOpacity style={[{alignItems:"center"}, GlobalStyles.mt20]} onPress={()=>navigation.navigate("Login")}>
              <Text style={[GlobalStyles.basicText, {color:primaryColor.blackPrimary}]}>Back To Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OTPScreen;
