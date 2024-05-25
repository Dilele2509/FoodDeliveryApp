import React from "react";
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles'
import { StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import SearchFilter from "./SearchFilter";

function Header(props) {
    const {userName} = props
    return (  
        <View style={[GlobalStyles.mb10]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.padScreen20, styles.headerContainer]}>
                <Text style={GlobalStyles.h3}>Hi, {userName}</Text>
                <Feather name="bell" size={24} color={primaryColor.organPrimary} />
            </View>
            <SearchFilter iconColor={primaryColor.organPrimary} placeholder={"Enter your favorite food"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        position: "sticky",
        justifyContent: "space-between",
    }
})

export default Header;