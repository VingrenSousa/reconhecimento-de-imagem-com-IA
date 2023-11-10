import { View, Text, Image, ScrollView, ImageProps, Alert } from 'react-native'
import styla from './style'
import Button from '../../componentes/button'
import { useState } from 'react'
import { testResCost } from '../test/test'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { api } from '../../services/api' // serviços de api, ussando biblioteca axion
import Loading  from '../../componentes/Loading/index'





const Home = () => {
    interface propsItem{
        name:string,
        porcentage:string
    }

    const [Foto, setFoto] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [hendlsItem, setHendlsItem] = useState<propsItem[]|null>([])

    const pickImage = async () => {
        try {
            const{status}= await ImagePicker.requestMediaLibraryPermissionsAsync()
            if(status !== ImagePicker.PermissionStatus.GRANTED){
                 Alert.alert('Sem permisão para acessar galeria')
                 return
            }
            setLoading(true);

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
              });
              if (result.canceled) {
                console.log('ação cancelada')
                setLoading(false)
               return;
              }
              if(!result.canceled){
                const imgManipulada = await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [{resize:{width:900}}],
                    {
                        compress:1,
                        format:ImageManipulator.SaveFormat.JPEG,
                        base64:true
                    }
                );
               

                foodDetect(imgManipulada.base64)
                setFoto(imgManipulada.uri)
               
                
              }
          
              
            
        } catch (error) {
            console.log(error)

            
        }

    }
    async function foodDetect(Ibase64:string|undefined){
        //fazendo referencias do arquivos de variavel de ambiente
        // console.log(Ibase64)
        try {
            
      
        const response = await api.post(`/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`,{
            "user_app_id":{
                "user_id":process.env.EXPO_PUBLIC_API_USER_ID,
                "app_id":process.env.EXPO_PUBLIC_API_APP_ID
            },
            "inputs":[
                {
                    "data":{
                        "image": {
                            "base64":Ibase64
                        }
                    }
                }
            ]
        }
        );
        const concepts = await response.data.outputs[0].data.concepts.map((n:any)=>{
            return{
                name:n.name,
                porcentage:(Math.round(n.value *100))+ "%"
            }
        })
        console.log(concepts)


        setHendlsItem(concepts)


        setLoading(false)
        } catch (error) {
            console.log('erro na api/axion:' +error)
            setLoading(false)
        }

    
    }

    return (
        <View style={styla.containe}>

            <View style={styla.conaineImage}>
                {
                    Foto
                        ? <Image source={{uri:Foto}} style={{height:400,width:400 }} />
                        : <Text style={styla.Text}>
                            Selecione uma foto do seu prato para analisar
                        </Text>
                }
            </View>
            <View style={styla.ViewButtonCamera}>
                <Button
                    size={[60, 60]}
                    activeOpacity={0.7}
                    disabled={isLoading}
                    onPress={() => { pickImage() }}

                />
            </View>

            <View style={styla.containeRes}>
                <View style={styla.containeResButton}>
                    <Button
                        icone='eye'
                        title='limpar '
                        onPress={() => { console.log(setHendlsItem(null)) }}
                        activeOpacity={0.7}
                        size={[330, 65]}

                    />
                </View>
                {isLoading
                ?<View style={styla.containeResCont}>
                     <Loading/>
                </View>
                :<ScrollView style={styla.containeResCont}>
                    {
                        hendlsItem
                            ? hendlsItem.map((n) => {

                                return (
                                    <View style={styla.ResCont}>
                                        <View style={styla.ResContPor}>
                                            <Text  style={[styla.TextPor,{color:"#ececec"}]}>{n.porcentage}</Text>
                                        </View>
                                        <Text style={styla.TextPor}>{n.name}</Text>
                                    </View>
                                )

                            })
                            : testResCost.map((n)=>{
                                return (
                                    <View style={styla.ResCont}>
                                        <View style={styla.ResContPor}>
                                            <Text style={[styla.TextPor,{color:"#fff"}]}>0%</Text>
                                        </View>
                                        <Text style={styla.TextPor}>{n.item}</Text>
                                    </View>
                                )

                            })
                    }
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                        }} >
                    </View>
                </ScrollView>
                }

            </View>
        </View>
    )
}
export default Home