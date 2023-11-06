import { View,TouchableOpacity,TouchableOpacityProps,Text} from "react-native"
import style from './style'
import { AntDesign} from '@expo/vector-icons'; 
import React from "react";
import { Theme } from "../../style/theme";
interface props extends TouchableOpacityProps{
    size:number[]
    title?:string
    icone?:React.ComponentProps<typeof AntDesign>['name']
}
const Button = ({size,title,icone='camera',...rest}:props)=>{
    return(
        <TouchableOpacity 
        style={[style.containe,{width:size[0],height:size[1]}]}
        {...rest}>
            {title
            ?<Text
            style={style.Title}
            >
                {title}
            </Text>
            :[]}
           {icone?<AntDesign name={icone} size={24} color={Theme.CORES.TextColor} />:[]}
        </TouchableOpacity>
    )
}


export default Button