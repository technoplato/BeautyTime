import * as React from 'react'
import {IconButton} from 'react-native-paper'
import {colors} from '../styles/color'

interface Props {
  onToggle: (selected: boolean) => void
  selected: boolean
}

const HeartButton: React.FunctionComponent<Props> = ({
  selected,
  onToggle,
}: Props) => {
  return (
    <IconButton
      icon={selected ? 'heart' : 'heart-outline'}
      iconColor={colors.darkPink}
      size={35}
      onPress={() => onToggle(selected)}
    />
  )
}

export default HeartButton
