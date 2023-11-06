import { StyleSheet } from "react-native";
import { Theme } from "../../style/theme";
import { RFValue } from "react-native-responsive-fontsize";
const stylesHome=StyleSheet.create({
    containe:{
        flex:1,
        paddingTop:10,
        flexDirection:"column",
        
    },
    ViewButtonCamera:{
        position:"absolute",
        left:RFValue(270),
        top:RFValue(35),
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 11,
        zIndex:11
    },
    conaineImage:{
        width:"100%",
        height:RFValue(380),
        position:"relative",
        bottom:60,
        justifyContent:"center",
        alignItems:"center",
        
       

    },
    containeRes:{
        backgroundColor:Theme.CORES.TextColor,
        width:"100%",
        height:RFValue(800),
        borderTopRightRadius:RFValue(25),
        borderTopLeftRadius:RFValue(25),
        position:"absolute",
        top:RFValue(310),
        zIndex:11
      
        
    },
    containeResButton:{
        flex:1,
        alignItems:"center",
        paddingTop:10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation:10,
    },
    Text:{
        alignSelf:"center",
        color:Theme.CORES.button,
        fontSize:RFValue(15),
        fontFamily:Theme.FONTES.fontePrincipal,
        textAlign:"center",
        width:250,
        marginTop:10
       
    }
})
export default stylesHome