import {Image, View} from 'react-native'

export const Header = () => (
  <View
    style={{
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 30,
      padding: 12,
    }}>
    <Image
      style={{
        flex: 1,
        height: 120,
        margin: 24,
      }}
      source={require('../../assets/bb_logo.png')}
      resizeMode="contain"
    />
  </View>
)
