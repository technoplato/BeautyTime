import React from 'react'
import { StyleSheet, View } from 'react-native'
import ServiceListItem from './ServiceListItem'
import { BeautyCatalogItem, ServiceCatalog } from '../../Types/Types'

type Props = {
  services: BeautyCatalogItem[]
  catalog: ServiceCatalog
  toggleService: (string) => void
}

const ServiceList = ({ catalog, services, toggleService }: Props) => {
  return (
    <View style={styles.container}>
      {Object.values(catalog).map((service: BeautyCatalogItem) => {
        return (
          <ServiceListItem
            key={service.name}
            onToggle={() => {
              const keys = Object.keys(services)
              console.log({
                keys,
                service: { id: service.id, name: service.name },
              })
              toggleService(service.id)
            }}
            service={service}
            selected={Object.keys(services).includes(service.id)}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ServiceList
