import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputBox, CheckBox, FillButton } from "../components";

function Login({navigation}) {
    const [secureText, setSecureText] = useState(true)
    const handleToggle = ()=>setSecureText(!secureText)
    return(
        <SafeAreaView style={[GlobalStyles.heighFullScreen,{backgroundColor: primaryColor.creamPrimary}]}>
            <View style={[GlobalStyles.padScreen20, styles.flex1]}>
                <View style={[{flex:9}]}>
                    <Text style={[GlobalStyles.h1, {color:primaryColor.organPrimary}]}>SIGN IN</Text>
                    <View style = {[styles.mTop25]}>
                        <InputBox text="Email" textColor={primaryColor.darkPrimary} placeholder="Enter your email"/>
                        <InputBox text="Password" textColor={primaryColor.darkPrimary} placeholder="Enter your password" secureTextEntry={secureText}/>
                        <View style={[styles.mt15, GlobalStyles.flex, GlobalStyles.inLine, {justifyContent:"space-between"}]}>
                            <CheckBox 
                                onToggle={handleToggle}
                                size={20} 
                                color={primaryColor.organPrimary} 
                                iconColor={primaryColor.whitePrimary}
                                widthSize={130}
                                text={"Show Password"}
                            />
                            <TouchableOpacity onPress={()=>navigation.navigate("forgotPass")}>
                                <Text style={[GlobalStyles.basicText, {color:primaryColor.blackPrimary}]}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                            <FillButton onPress={()=>navigation.navigate("Home")} color={primaryColor.whitePrimary} backgroundColor={primaryColor.organPrimary} text={"Sign In"}/>
                            <TouchableOpacity onPress={()=>navigation.navigate("Signup")} style={[styles.mTop25]}>
                                <Text style={[GlobalStyles.basicText, {color:primaryColor.blackPrimary}]}>Don't have account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[{flex:1}, {alignItems:'center'}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Welcome")}>
                        <Text style={[GlobalStyles.basicText]}>Back To Welcome</Text>
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
    flex1:{
        flex: 1,
    }
})

export default Login;