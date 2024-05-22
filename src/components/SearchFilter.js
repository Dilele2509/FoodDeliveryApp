import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { StyleSheet, TextInput, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';

function SearchFilter(props) {
    const [isFocus, setIsFocus] = useState(false);
    const { placeholder, iconColor } = props;

    return ( 
        <View style={[{alignItems: "center"}]}>
            <View style={[styles.inputContainer, isFocus && styles.inputFocus]}>
                <Fontisto name="search" size={24} color={iconColor} style={styles.icon} />
                <TextInput
                    keyboardType={"default"}
                    placeholder={placeholder}
                    placeholderTextColor={"#999"}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={styles.input}
                />
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 50,
        backgroundColor: primaryColor.whitePrimary,
        borderRadius: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: .1,
        shadowRadius: .7
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: primaryColor.blackPrimary,
    },
    icon: {
        marginRight: 10,
    },
    inputFocus: {
        borderColor: primaryColor.blackPrimary,
        borderWidth: 1.5,
        borderStyle: "solid",
        backgroundColor: primaryColor.whitePrimary,
        color: primaryColor.organPrimary,
    }
});

export default SearchFilter;
