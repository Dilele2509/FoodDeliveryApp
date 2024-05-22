import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Animated } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { Ionicons, MaterialCommunityIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';


function Categories() {
    const scrollViewRef = useRef(null);
    const [scrollX] = useState(new Animated.Value(0));
    const [contentWidth, setContentWidth] = useState(1);
    const [containerWidth, setContainerWidth] = useState(1);

    const handleContentSizeChange = (contentWidth) => {
        setContentWidth(contentWidth);
    };

    const handleLayout = ({ nativeEvent }) => {
        setContainerWidth(nativeEvent.layout.width);
    };

    const scrollIndicatorSize = containerWidth / contentWidth * 100; // Width of scroll indicator relative to its container
    const difference = containerWidth - scrollIndicatorSize;
    const scrollIndicatorPosition = Animated.multiply(scrollX, 100 / contentWidth).interpolate({
        inputRange: [0, Math.max(contentWidth - containerWidth, 1)],
        outputRange: [0, Math.max(difference, 1)],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={[GlobalStyles.flexRow, styles.container]}>
                    <TouchableOpacity style={[GlobalStyles.ml20, styles.catItem]}>
                        <Ionicons style={{ marginBottom: 7 }} name="fast-food" size={32} color="#FB6D48" />
                        <Text style={[{ color: "#DD5746" }]}>Fast food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[GlobalStyles.ml20, styles.catItem]}>
                        <MaterialCommunityIcons style={{ marginBottom: 7 }} name="noodles" size={32} color="#FFAF45" />
                        <Text style={[{ color: "#FFAF45" }]}>Noodles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[GlobalStyles.ml20, styles.catItem]}>
                        <Entypo style={{ marginBottom: 7 }} name="drink" size={32} color="#40679E" />
                        <Text style={[{ color: "#40679E" }]}>Drink</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[GlobalStyles.ml20, styles.catItem]}>
                        <FontAwesome6 style={{ marginBottom: 7 }} name="bowl-rice" size={32} color="#ED9455" />
                        <Text style={[{ color: "#ED9455" }]}>Rice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[GlobalStyles.ml20, styles.catItem]}>
                        <FontAwesome6 style={{ marginBottom: 7 }} name="glass-water" size={32} color="#AF8260" />
                        <Text style={[{ color: "#AF8260" }]}>Milk Tea</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.scrollIndicatorContainer}>
                <Animated.View style={[styles.scrollIndicator, { width: scrollIndicatorSize, transform: [{ translateX: scrollIndicatorPosition }] }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 15,
        position: 'relative',
        height: 80,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    catItem: {
        alignItems: "center",
        minWidth: 60,
        marginRight: 20,
    },
    scrollIndicatorContainer: {
        height: 3,
        width: 140,
        backgroundColor: '#E0E0E0',
        borderRadius: 1.5,
        position: 'absolute',
        bottom: 0,
        alignSelf: "center",
    },
    scrollIndicator: {
        height: 3,
        backgroundColor: primaryColor.organPrimary,
        borderRadius: 1.5,
    },
});

export default Categories;
