import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function ProductScreen(props) {
    const {allList, navigation} = props
    return (
        <View style={[{ flex: 10, height: "auto" }]}>
            <View style={[{ flex: 3 }]}>
                <Image style={[styles.prodImg]} source={require("../../assets/images/bunbo.jpeg")} />
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={styles.backBtn}>
                    <AntDesign name="arrowleft" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={[GlobalStyles.padScreen20, { flex: 1.5 }]}>
                <Text style={[GlobalStyles.h2]}>Title</Text>
                <Text style={[GlobalStyles.basicText, styles.description]}>Quantity Sold: </Text>
                <Text style={[GlobalStyles.basicText]}>Rating: </Text>
                <View style={[styles.desContainer]}>
                    <View>
                        <Text style={[styles.price]}>20.000 vnd</Text>
                    </View>
                    <View style={[styles.addBtn]}>
                        <TouchableOpacity>
                            <AntDesign name="plussquare" size={28} color={primaryColor.organPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[{ flex: 3 }, GlobalStyles.padScreen20]}>
                <View style={[styles.fbArea, {paddingBottom: 20}]}>
                    <Text style={GlobalStyles.h3}>Feedbacks</Text>
                </View>
                <FlatList data={allList}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.recentItem}>
                        <Image style={styles.recentImg} source={{ uri: item.itemURI }} />
                        <View style={[GlobalStyles.pad10, styles.recentContent]}>
                            <Text style={[GlobalStyles.h5]}>{item.name}</Text>
                            <Text style={styles.discountText}>{item.discount}</Text>
                        </View>
                    </View>
                )}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    prodImg: {
        width: width,
        height: 320,
        resizeMode: "cover"
    },
    description: {
        marginTop: 10,
    },
    desContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15
    },
    backBtn: {
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        textAlign: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: "15%",
        left: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        color: primaryColor.organPrimary
    },
    fbArea: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: primaryColor.organPrimary
    }
})

export default ProductScreen;