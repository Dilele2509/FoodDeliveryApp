import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Categories, Header, Recommend, SliderShow, TopRatedRes } from "../components";
import { primaryColor } from "../../assets/styles/GlobalStyles";
import MenuBar from "../components/menuBar";

function HomeScreen({ navigation }) {
    //example for data that get from database
    const recentList = [
        {
            id: 1,
            name: 'Hồng Trà Ngô Gia',
            itemURI: 'https://firebasestorage.googleapis.com/v0/b/food-delivery-app-5613d.appspot.com/o/food_img%2FHeader_Cheeseburger_832x472_1-3-product-tile-desktop.jpg?alt=media&token=af486c35-82b6-423e-8cdd-9ea51704a6c7',
            discount: "Freeship 25K"
        },
        {
            id: 2,
            name: 'Hồng Trà Ngô Gia',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1x28rfCpR3o-LvQRxgORmYILZu16htrz5=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 25K"
        },
        {
            id: 3,
            name: 'Hồng Trà Ngô Gia',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1x28rfCpR3o-LvQRxgORmYILZu16htrz5=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 25K"
        },
        {
            id: 4,
            name: 'Hồng Trà Ngô Gia',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1x28rfCpR3o-LvQRxgORmYILZu16htrz5=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 25K"
        },
    ]

    const recommendList = [
        {
            id: 1,
            name: 'Trà sữa Bobapop',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1I3OSLIeiYUaxcK7rWs39pIhMEsVTAYMT=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 15K"
        },
        {
            id: 2,
            name: 'Trà sữa Bobapop',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1I3OSLIeiYUaxcK7rWs39pIhMEsVTAYMT=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 15K"
        },
        {
            id: 3,
            name: 'Trà sữa Bobapop',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1I3OSLIeiYUaxcK7rWs39pIhMEsVTAYMT=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 15K"
        },
        {
            id: 4,
            name: 'Trà sữa Bobapop',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/1I3OSLIeiYUaxcK7rWs39pIhMEsVTAYMT=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Freeship 15K"
        },
    ]

    const viewAllList = [
        {
            id: 1,
            name: 'Pizza Hut',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/18yaqqdQW8KPBekyfoTRRfVZZDFJSY_Cv=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 15%"
        },
        {
            id: 2,
            name: 'Pizza Hut',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/18yaqqdQW8KPBekyfoTRRfVZZDFJSY_Cv=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 15%"
        },
        {
            id: 3,
            name: 'Pizza Hut',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/18yaqqdQW8KPBekyfoTRRfVZZDFJSY_Cv=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 15%"
        },
        {
            id: 4,
            name: 'Pizza Hut',
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/18yaqqdQW8KPBekyfoTRRfVZZDFJSY_Cv=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 15%"
        },
    ]

    const topRateList = [
        {
            id: 1,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 2,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 3,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 4,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
    ]

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <SliderShow />
                <Categories />
                <Recommend
                    listTitle="Recently Viewed"
                    itemList={recentList}
                    onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recently Viewed', prevPage: 'Home', allList: viewAllList })} 
                    navigation={()=>navigation.navigate("Product")}    
                    />
                <Recommend
                    listTitle="Recommend"
                    itemList={recommendList}
                    onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recommended', prevPage: 'Home', allList: recommendList })} 
                    navigation={()=>navigation.navigate("Product")}    
                    />
                <TopRatedRes
                    listTitle="Top Rating"
                    itemList={topRateList}
                    onPress={() => navigation.navigate("ViewAll", { titlePage: 'Top Rating Restaurant', prevPage: 'Home', allList: viewAllList })} 
                    navigation={()=>navigation.navigate("Product")}
                    />
                <MenuBar
                    listTitle="Menu"
                    itemList={topRateList}
                    onPress={()=>navigation.navigate("Product")}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: primaryColor.creamPrimary,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default HomeScreen;
