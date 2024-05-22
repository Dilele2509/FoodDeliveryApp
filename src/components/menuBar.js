import { StyleSheet, TouchableOpacity, FlatList, Image, View, Text} from "react-native";
import React from "react";
import GlobalStyles, {primaryColor} from "../../assets/styles/GlobalStyles";
import { AntDesign } from '@expo/vector-icons';

function MenuBar(props) {
    const { onPress, listTitle, itemList } = props;

    return (
        <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[GlobalStyles.h4, { color: primaryColor.blackPrimary }]}>
                    {listTitle}
                </Text>
            </View>
            <FlatList data={itemList}
            showsVerticalScrollIndicator={false}
                style={[GlobalStyles.mt15]}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        key={item.id} 
                        onPress={onPress}
                        style={[styles.RecommendItem]}>
                        <Image style={[styles.RecommendImg]} source={{ uri: item.itemURI }} />
                        <View style={[GlobalStyles.pad10, styles.RecommendContent]}>
                            <Text style={[GlobalStyles.h5]}>{item.name}</Text>
                            <Text style={[styles.discountText]}>{item.discount}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    RecommendItem: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
    },
    RecommendImg: {
        width: 100,
        height: 100,
        resizeMode: "center",
        objectFit: "cover"
    },
    RecommendContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5F7F8",
        marginRight: 10,
        width: "100%"
    },
    discountText: {
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#C40C0C",
        borderStyle: "solid",
        color: "#C40C0C",
        fontSize: 12
    }
})

export default MenuBar;