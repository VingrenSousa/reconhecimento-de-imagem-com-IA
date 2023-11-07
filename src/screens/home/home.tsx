import { View, Text, Image, ScrollView,ImageProps } from 'react-native'
import styla from './style'
import Button from '../../componentes/button'
import { useState } from 'react'
import { testResCost } from '../test/test'
import Camera from '../../config/camera/camera'





const Home = () => {
    const [aFoto, setaFoto] = useState(true)
    const [Screm, setScrem] = useState('')
    const [Foto, setFoto] = useState('')
    const pickImage =async()=>{
        const screm= await Camera()
        setScrem(Screm)
       
           
      
        console.log(Screm)

    }
    return (
        <View style={styla.containe}>

            <View style={styla.conaineImage}>
                {
                    aFoto
                        ? <Image source={Foto?{uri:Foto}:require('./../../assets/test2.jpg')} style={{ flex: 1, zIndex: 1 }} />
                        : <Text style={styla.Text}>
                            Selecione uma foto do seu prato para analisar
                        </Text>
                }
            </View>
            <View style={styla.ViewButtonCamera}>
                <Button
                    size={[60, 60]}
                    activeOpacity={0.7}
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