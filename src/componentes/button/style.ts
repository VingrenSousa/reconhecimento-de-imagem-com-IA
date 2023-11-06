import { Theme } from "../../style/theme";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const stylesButton=StyleSheet.create({
    containe:{
        backgroundColor:Theme.CORES.button,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row", 
        gap:RFValue(10),
        overflow:"hidden",
        zIndex:11,
        elevation: 11,
  

       



    },
    Title:{
        fontSize:RFValue(15),
        fontFamily:Theme.FONTES.fontePrincipal,
        color:Theme.CORES.TextColor,
        fontVariant:["small-caps"]
    }

})
export default stylesButton