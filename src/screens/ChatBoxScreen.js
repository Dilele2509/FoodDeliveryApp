import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { Footer } from '../components';
import { FooterContext } from '../provider/FooterProvider'; // Import FooterContext

const ChatBoxScreen = ({ navigation }) => {
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

  const { handlePress } = useContext(FooterContext); // Get handlePress from FooterContext

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
          {/*  main content goes here */}
        </View>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxScreen;

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
  },
});
