import { StatusBar} from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading  from './componentes/Loading';
import Home from './screens/home/home'

export default function Apps() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaView>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent />
        <Home/>
    </SafeAreaView>
  );
}

