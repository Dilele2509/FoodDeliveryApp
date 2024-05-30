import React, { useEffect, useState } from "react";
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import SearchFilter from "./SearchFilter";
import axios from "../API/axios";

function Header(props) {
    const { userName, setHasResult, searchData, setSearchData, setSearchResult } = props;

    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    };

    useEffect(() => {
        if (searchData !== '') {
            console.log(searchData);
            setHasResult(true);
            axios.post('/product/search/', { title: searchData }, config)
                .then((response) => {
                    setSearchResult(response.data);
                });
        } else {
            setSearchResult([]);
            setHasResult(false);
        }
    }, [searchData]);

    return (
        <View style={[GlobalStyles.mb10, styles.relativeContainer]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.padScreen20, styles.headerContainer]}>
                <Text style={GlobalStyles.h3}>Hi, {userName}</Text>
                <Feather name="bell" size={24} color={primaryColor.organPrimary} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <SearchFilter 
                        value={searchData}
                        onChangeText={setSearchData}
                        iconColor={primaryColor.organPrimary} 
                        placeholder={"Enter your favorite food"} />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    relativeContainer: {
        position: 'relative',
    },
    headerContainer: {
        width: "100%",
        justifyContent: "space-between",
    },
});

export default Header;
