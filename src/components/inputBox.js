import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

function InputBox(props) {
    const [isFocus, setIsFocus] = useState(false)
    const {text, textColor, placeholder, secureTextEntry, type} = props
    return ( 
        <View style={[{marginTop: 15}]}>
            {text?(<Text style={[GlobalStyles.h4, {color: textColor}]}>{text}</Text>):null}
            <TextInput
                keyboardType={type? type : "default"}
                secureTextEntry= {secureTextEntry}
                style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                placeholder={placeholder}
                placeholderTextColor={"#999"}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </View>
     );
}

const styles = StyleSheet.create({
    mt15:{
        marginTop:15,
    },
    inputStyle: {
        width: 350,
        height: 50,
        borderColor: primaryColor.organPrimary,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRadius: 20,
        borderWidth:1,
        paddingHorizontal: 15,
        color: primaryColor.whitePrimary,
    },
    inputFocus:{
        borderColor: primaryColor.darkPrimary,
        backgroundColor: primaryColor.whitePrimary,
        color: primaryColor.organPrimary,
    }
})

export default InputBox;