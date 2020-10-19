import React from 'react'
import { BeautyCatalogItem } from '../../Types/Types'

import DynamicFontSizeBlackButtonFooter from '../DynamicFontBlackButtonFooter'

const ServiceSelectionFooter = ({ navigation }) => {
  return (
    <DynamicFontSizeBlackButtonFooter
      title={'Title'}
      onPress={() => {
        // if (firstServiceToConfigure) {
        //   navigation.navigate('Options', {
        //     name: firstServiceToConfigure.title,
        //   })
        // } else {
        //   navigation.navigate('ActiveServices')
        // }
      }}
      disabled={false}
    />
  )
}

export default ServiceSelectionFooter
