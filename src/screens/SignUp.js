import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputBox, CheckBox, FillButton } from "../components";

function SignUp({navigation}) {
    const [secureText, setSecureText] = useState(true)
    const handleToggle = ()=>setSecureText(!secureText)
    return(
        <SafeAreaView style={[GlobalStyles.heighFullScreen,{backgroundColor: primaryColor.creamPrimary}]}>
            <View style={[GlobalStyles.padScreen20, {flex:1}]}>
                <View style={[{flex:9}]}>
                    <Text style={[GlobalStyles.h1, {color:primaryColor.organPrimary}]}>CREATE NEW ACCOUNT</Text>
                    <View style = {[styles.mTop25]}>
                        <InputBox text="Username" textColor={primaryColor.darkPrimary} placeholder="Enter your username"/> 
                        <InputBox text="Email" textColor={primaryColor.darkPrimary} placeholder="Enter your email" secureTextEntry={false}/>
                        <InputBox text="Password" textColor={primaryColor.darkPrimary} placeholder="Enter your password" secureTextEntry={secureText}/>
                        <InputBox text="Confirm Password" textColor={primaryColor.darkPrimary} placeholder="Confirm your password" secureTextEntry={secureText}/>
                        <View style={[styles.mt15, GlobalStyles.flex, GlobalStyles.inLine, {justifyContent:"space-between"}]}>
                            <CheckBox 
                                onToggle={handleToggle}
                                size={20} 
                                color={primaryColor.organPrimary} 
                                iconColor={primaryColor.lightPrimary}
                                widthSize={130}
                                text={"Show Password"}
                            />
                        </View>
                        <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                            <FillButton onPress={()=>{
                                Alert.alert("If register success -> move to login")
                            }} color={primaryColor.whitePrimary} backgroundColor={primaryColor.organPrimary} text={"Sign Up"}/>
                            <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={[styles.mTop25]}>
                                <Text style={[GlobalStyles.basicText, {color:primaryColor.blackPrimary}]}>Already have an account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[{flex:1}, {alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Welcome")}>
                        <Text style={[GlobalStyles.basicText, styles.mTop25]}>Back To Welcome</Text>
                    </TouchableOpacity>
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

export default SignUp;