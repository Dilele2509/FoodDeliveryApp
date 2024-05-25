import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { Footer } from '../components';
import { FooterContext } from '../provider/FooterProvider'; // Import FooterContext
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const OrderScreen = (props) => {
  const { navigation, orderList } = props
  const [tabHeader, setTabHeader] = useState([
    {
      title: "Now",
      isSelected: true,
    },
    {
      title: "History",
      isSelected: false,
    },
  ]);

  const { handlePress } = useContext(FooterContext);

  const handleTabPress = (index) => {
    setTabHeader(tabHeader.map((tab, i) => ({
      ...tab,
      isSelected: i === index
    })));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryColor.creamPrimary }]}>
      <View style={styles.container}>
        <View style={[GlobalStyles.flexRow, styles.headerContainer]}>
          {tabHeader.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => handleTabPress(index)} style={[styles.headerItem, tab.isSelected && styles.isChoose]}>
              <Text style={[GlobalStyles.h5, { color: tab.isSelected ? primaryColor.organPrimary : primaryColor.blackPrimary }]}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contentContainer}>
          {tabHeader[0].isSelected ? (
            // tab "Now" content
            <View style={[styles.orderNoti]}>
              <Entypo name="add-to-list" size={90} color={primaryColor.organPrimary} />
              <Text style={[styles.orderNotiText]}>Move to home to ordering</Text>
            </View>
          ) : (
            // tab "History" content
            <View style={[styles.orderNoti]}>
              <MaterialCommunityIcons style={[]} name="clipboard-list-outline" size={90} color={primaryColor.organPrimary} />
              <Text style={[styles.orderNotiText]}>No orders have been placed yet</Text>
            </View>
          )}
        </View>
      </View>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    justifyContent: 'space-around',
  },
  headerItem: {
    flex: 1,
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: 'center',
  },
  isChoose: {
    color: primaryColor.organPrimary,
    borderBottomColor: primaryColor.organPrimary,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 60, // Đảm bảo khoảng cách với Footer
  },
  orderNoti: {
    width: "100%",
    height: 400,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  orderNotiText: {
    fontSize: 21,
    marginTop: 15,
    color: primaryColor.blackPrimary,
    fontWeight: "600"
  }
});
