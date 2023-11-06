 import { View } from 'react-native'
import styla from './style'
import Button from '../../componentes/button'
 
 
 
 
 
 const Home=()=>{
    return(
        <View style={styla.containe}>
            <View>
                <Button 
                size={[50,50]}
                onPress={()=>{console.log('ola')}}
               
                />
                    
              
            </View>
        </View>
    )
}
export default Home