import React from "react";
import { Text } from "react-native";
import GlobalStyles, {primaryColor} from "../../assets/styles/GlobalStyles"

function AppLogo() {
    return ( 
        <Text style={[GlobalStyles.logoSize, { color: primaryColor.organPrimary }]}>HungryCat</Text>
    );
}

export default AppLogo;