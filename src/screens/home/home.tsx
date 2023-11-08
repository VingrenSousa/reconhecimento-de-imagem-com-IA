import { View, Text, Image, ScrollView, ImageProps, Alert } from 'react-native'
import styla from './style'
import Button from '../../componentes/button'
import { useState } from 'react'
import { testResCost } from '../test/test'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { api } from '../../services/api' // serviços de api, ussando biblioteca axion





const Home = () => {

    const [Foto, setFoto] = useState('')
    const [isLoading, setLoading] = useState(false)

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
               

                console.log(imgManipulada.uri);
                setFoto(imgManipulada.uri)
                foodDetect(imgManipulada.base64)
                
              }
          
              
            
        } catch (error) {
            console.log(error)

            
        }

    }
    async function foodDetect(base64:string|undefined){
        //fazendo referencias do arquivos de variavel de ambiente
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
                            "base64":base64
                        }
                    }
                }
            ]
        }
        );
        console.log(response.data)
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
                        title='aqui vai uma dica'
                        onPress={() => { console.log('ola') }}
                        activeOpacity={0.7}
                        size={[330, 65]}

                    />
                </View>
                <ScrollView style={styla.containeResCont}>
                    {
                        testResCost
                            ? testResCost.map((n) => {

                                return (
                                    <View style={styla.ResCont}>

                                        <Text>{n.item}</Text>
                                    </View>
                                )

                            })
                            : []
                    }
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                        }} >
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
export default Home