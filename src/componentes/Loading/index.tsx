import { ActivityIndicator, View} from 'react-native';

import { styles } from './style';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={{transform:[{scale:2}]}}animating={true}color="#2E9D4C" />
    </View>
  );
}