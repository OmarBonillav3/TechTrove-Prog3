import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Modal, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import CarritoScreen from './screens/Carrito';
import { CartProvider } from './context/CartContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// DECLARANDO PANTALLAS - PANTALLA HOME
function HomeTabs({ setModalVisible }) {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#DC5F00',
          tabBarInactiveTintColor: 'gray',

          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'carrito') {
              iconName = 'shoppingcart';
            }
            return <Icon name={iconName} size={size} color={color} style={styles.CarIcon} />;
          },
          headerRight: () => <Icon
            style={styles.UserICon}
            name='user'
            onPress={() => setModalVisible(true)}
          />,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerLeft: () => <Text style={styles.LogoGeneral}>TechTrove </Text>,
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon name="home" size={size} color={color} style={styles.CarIcon} />
              )
            },
            headerStyle: {
              backgroundColor: '#EEEEEE',
            }
          }}

        />
        <Tab.Screen
          name="carrito"
          component={CarritoScreen}
          options={{
            headerTitle: '',
            headerLeft: () => <Text style={styles.LogoGeneral}>TechTrove </Text>,
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon name="shoppingcart" size={size} color={color} />
              )
            },
            headerStyle: {
              backgroundColor: '#EEEEEE',
            }
          }}
        />
      </Tab.Navigator>
    </>
  )
}
// PANTALLA LOGIN
function LoginStack({ setModalVisible }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // AGREGANDO TITULO
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
        {props => <HomeTabs {...props} setModalVisible={setModalVisible} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "OpenSans-Light": require('./assets/fonts/OpenSans-Light.ttf'),
        "OpenSans-Regular": require('./assets/fonts/OpenSans-Regular.ttf'),
        "OpenSans-SemiBold": require('./assets/fonts/OpenSans-SemiBold.ttf'),
        "OpenSans-Bold": require('./assets/fonts/OpenSans-Bold.ttf'),
        "OpenSans-Medium": require('./assets/fonts/OpenSans-Medium.ttf'),
        "BrunoAceSC": require('./assets/fonts/BrunoAceSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC5F00" />
        <Text>Cargando fuentes...</Text>
      </View>
    );
  }

  return (
    //FLUJO DE VENTANAS, AGREGAR AQUI PARA PODER NAVEGAR//
    <CartProvider>
      <GestureHandlerRootView>
        <NavigationContainer style={styles.container}>
          <LoginStack setModalVisible={setModalVisible} />
        </NavigationContainer>
      </GestureHandlerRootView>

      {/* ARREGLAR MODAL */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.ContinerModal}>
          <Text style={styles.TextModal}>
            No hay presupuesto para estas funciones. Aún no estoy contratado. XD
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.ContainerCloseButton}>
            <Text style={styles.CloseButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </CartProvider>

  );
}

const styles = StyleSheet.create({
  UserICon: {
    color: '#DC5F00',
    fontSize: 27,
    marginRight: 20,
    marginBottom: 8,
  },
  LogoGeneral: {
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: 'BrunoAceSC',
    fontSize: 19,
    color: '#DC5F00',
  },
  ContinerModal: {
    paddingLeft: 70,
    paddingRight: 70,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  TextModal: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
  },
  ContainerCloseButton: {
    alignSelf: 'center',
    backgroundColor: '#DC5F00',
    borderRadius: 10,
    bottom: -250,
  },
  CloseButton: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    color: '#FFFFFF',
  },
});
//OmarBonilla 10/jul/2024 - 8:21PM </>