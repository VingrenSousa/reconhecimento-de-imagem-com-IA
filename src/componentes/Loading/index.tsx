import { ActivityIndicator, View } from 'react-native';

import { styles } from './style';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#2E9D4C" />
    </View>
  );
}