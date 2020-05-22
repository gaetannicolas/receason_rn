import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import HeaderDetail from '../components/HeaderDetail'

const ProductDetail = ({ navigation }) => {
  const product = navigation.getParam('product')

  return (
    <ScrollView style={styles.container}>
      {product && (
        <View>
          <HeaderDetail name={product.name} navigation={navigation} />
          <View style={styles.contentHeader}>
            <AppImage width={50} source={{ uri: product.icons.image }} />
            <AppText style={styles.title}>{product.name}</AppText>
          </View>
          <View style={styles.content}>
            <View style={styles.calendar}>
              <AppImage width={30} source={require('../../../commons/assets/images/calendar.png')} />
              {product.months_availables && product.months_availables.length > 0 && <AppText style={styles.available}>De {product.months_availables[0]} à {product.months_availables[product.months_availables.length - 1]}</AppText>}
            </View>
            <View>
              <AppText style={styles.sectionTitle}>Choisir</AppText>
              {product.info.choisir && <AppText style={styles.info}>{product.info.choisir}</AppText>}
            </View>
            <View>
              <AppText style={styles.sectionTitle}>Conserver</AppText>
              {product.info.conserver && <AppText style={styles.info}>{product.info.conserver}</AppText>}
            </View>
            <View>
              <AppText style={styles.sectionTitle}>Santé</AppText>
              {product.info.sante && <AppText style={styles.info}>{product.info.sante}</AppText>}
            </View>
            <View>
              {product.info.cuisine && (
                <>
                  <AppText style={styles.sectionTitle}>Astuce en cuisine</AppText>
                  <AppText style={styles.info}>{product.info.cuisine}</AppText>
                </>
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

ProductDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  available: {
    marginLeft: 10,
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
  },
})
