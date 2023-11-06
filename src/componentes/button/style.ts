import { Theme } from "../../style/theme";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const stylesButton=StyleSheet.create({
    containe:{
        backgroundColor:Theme.CORES.button,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"

    },
    Title:{
        fontSize:RFValue(20),
        fontFamily:Theme.FONTES.fontePrincipal,
    }

})
export default stylesButton