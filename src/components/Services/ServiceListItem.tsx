import { default as React } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Title } from 'react-native-paper'
import HeartButton from '../../HeartButton'
import { BeautyCatalogItem } from '../../Types/Types'

interface Props {
  onToggle: () => void
  service: BeautyCatalogItem
  selected: boolean
}

const BeautyServiceListItem = ({
  onToggle,
  service,
  selected,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View
        style={{
          width: 230,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <HeartButton onToggle={onToggle} selected={selected} />
        <Title>{service.name}</Title>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default BeautyServiceListItem
