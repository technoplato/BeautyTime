import React from 'react'
import { connect } from 'react-redux'

import { View } from 'react-native'
import { Headline } from 'react-native-paper'
import ServiceSelectionFooter from '../components/Services/ServiceSelectionFooter'
import ApplicationStyles from '../Themes/ApplicationStyles'
import ServicesList from '../components/Services/ServiceList'

import {
  toggleService,
  chooseOption,
  selectSession,
  selectCatalog,
} from '../redux/serviceSlice'

import { BeautyCatalogItem, ServiceCatalog } from '../Types/Types'

const mapStateToProps = state => {
  console.log({ state })
  return {
    catalog: selectCatalog(state),
    services: selectSession(state),
  }
}

const mapDispatchToProps = dispatch => ({
  toggleService(id) {
    dispatch(toggleService({ id }))
  },
})

type Props = {
  navigation: any
  services: BeautyCatalogItem[]
  catalog: ServiceCatalog
  toggleService: (string) => void
}

const ServiceSelectionScreen = ({
  navigation,
  services,
  catalog,
  toggleService,
}: Props) => {
  console.log({ catalog, services })
  return (
    <View style={ApplicationStyles.screen.serviceSelection}>
      <Headline style={{ alignSelf: 'center', paddingBottom: 24 }}>
        Select services being performed
      </Headline>
      <ServicesList {...{ catalog, services, toggleService }} />

      <ServiceSelectionFooter navigation={navigation} />
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceSelectionScreen)
