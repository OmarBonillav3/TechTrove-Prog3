import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import CartContext from '../context/CartContext';

export default function Carrito() {
    const [modalVisible, setModalVisible] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    useEffect(() => {
        if (confirmationModalVisible) {
            const timer = setTimeout(() => {
                setConfirmationModalVisible(false);
                setCart([]); 
            }, 3000); 

            
            return () => clearTimeout(timer);
        }
    }, [confirmationModalVisible]);

    useEffect(() => {
        const total = cart.reduce ((sum, item) => sum + parseFloat(item.totalPrice), 0);
        setTotalCartPrice(total);
    }, [cart]);

    // Función para eliminar un producto del carrito
    const handleDeleteProduct = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const ProcederConPago = () => {
        if (totalCartPrice === 0) {
            Alert.alert('Carrito vacio',' Llena tu carrtio para proceder con la compra')
        } else {
            setModalVisible(true)
        }
    }

    return (
        <View> 
        <ScrollView contentContainerStyle={styles.scrollContainer} >
        <View style={styles.container}>
            <Text style={styles.cartTitle}>Carrito</Text>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
        <View style={styles.ModalContainer}>
            <Icon3
                name='cart-check'
                style={styles.CartCheck}
            />
            <View style={styles.ModalContent}>
            <Text style={styles.ModalTitle}>Total de Compra</Text>
            <Text style={styles.ModalPrice}>US${totalCartPrice}</Text>
            <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.CancelarCompra}
                >
                    <Icon 
                        style={styles.TxtCancelarCompra}
                        name='close'
                    />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.ContenedorBotonFin} 
                onPress={() => {
                    setConfirmationModalVisible(true) 
                    setModalVisible(false)
                }}>
                <Text style={styles.FinalizarCompraModal}>
                    Finalizar la compra
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      </Modal>
        {/* MODAL PARA FINALIZAR COMPRA - CONFIRMACION DE COMPRA */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={confirmationModalVisible}
            onRequestClose={() => setConfirmationModalVisible(false)}
            >
                <View style={styles.ConfirmacionModalCompra}>
                    <Icon 
                        style={styles.IconConfirmacion}
                        name='checkcircleo'
                    />
                </View>
        </Modal>

            {cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                    
                    <TouchableOpacity onPress={() => handleDeleteProduct(index)}>
                        <Icon2 name='trash-2' style={styles.IconTrash} />
                    </TouchableOpacity>
                        
                    <Text style={styles.cartItemTitle}>{item.titulo}</Text>
                    <Image style={styles.Img} source={item.imagen} />
                    <Text style={styles.cartItemPrice}>{item.moneda}{item.totalPrice}</Text>
                    <Text style={styles.cartItemQuantity}>Cantidad: {item.cantidad}</Text>
                </View>
            ))}
            </View>
        </ScrollView>

        {/* BOTON DE COMPRAR ESTATICO */}
        <View style={styles.FeedBoton}>
            <TouchableOpacity 
            style={styles.ContenedorTxtPago}
            onPress={() => ProcederConPago()}
            >
                <Text style={styles.PagoTxt}>
                Proceder al pago
                </Text>
            </TouchableOpacity>
        </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: { 
        alignItems: 'center',
    },
    cartTitle: {
        alignSelf:'center',
        fontSize: 24,
        fontFamily: 'OpenSans-Bold',
        marginTop:17,
        marginBottom:20,
    },

    //   BOTON PARA PROCEDER CON LA COMPRA
    FeedBoton:{
        marginTop:570,
        marginBottom:10,
        flex:1,
        alignSelf:'center',
        position:'absolute',
    },
    ContenedorTxtPago:{
        alignSelf:'center',
        backgroundColor:'#DC5F00',
        padding:10,
        borderRadius:40,
        marginBottom:30,
    },
    PagoTxt: {
        marginLeft:60,
        marginRight:60,
        fontSize:20,
        color:'#FFFFFF',
        fontFamily:'OpenSans-SemiBold',
    },

    //     MODAL DE PAGO
    ModalContainer: {
        flex:1,
        alignContent:'center',
        justifyContent:'center', 
        backgroundColor: '#EEEEEE',   
    },
    CartCheck: {
        fontSize:100,
        color:'#DC5F00',
        alignSelf:'center',
        paddingBottom:90,
    },
    ModalContent:{

    },
    ModalTitle:{
        alignSelf:'center',
        fontSize:30,
        fontFamily:'OpenSans-Bold',

    },
    ModalPrice: {
        paddingTop:30,
        paddingBottom:50,
        color:'#DC5F00',
        alignSelf:'center',
        fontSize:30,
        fontFamily:'OpenSans-Regular',
    },
    CancelarCompra: {
        alignSelf:'center',
        borderRadius:80,
        top:-460,
        left:140,

    },
    TxtCancelarCompra: {
        margin:10,
        fontSize:30,
        color:'#373A40'
    },

      ContenedorBotonFin:{
        alignSelf:'center',
        backgroundColor:'#DC5F00',
        borderRadius:40,
        marginBottom:30,
        bottom:-100,
      },
      FinalizarCompraModal: {
        margin:10,
        marginLeft:60,
        marginRight:60,
        alignSelf:'center',
        fontSize:20,
        color:'#FFFFFF',
        fontFamily:'OpenSans-SemiBold',
      },
      

    //   MODAL DE CONFIRMACION DE COMPRA CON TIMER
      ConfirmacionModalCompra:{
        flex:1,
        paddingLeft:70,
        paddingRight:70,
        justifyContent:'center',
        backgroundColor:'#379777'
      },
      IconConfirmacion: {
        fontSize:100,
        alignSelf:'center',
        color:'#FFFFFF',
      },

    //   CARTAS DE PRODUCTOS SELECCIONADOS
    cartItem: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 10,
        height:150,
        width:340,
        borderRadius: 10,
        marginBottom: 10,
    },
    IconTrash: {
        margin:20,
        color: '#DC5F00',
        fontSize: 25,
        top: -20, 
        left: 276, 
    },
    Img: {
        top:-60,
        left:10,
        resizeMode:'contain',
        height:100,
        aspectRatio: 1,
        borderRadius: 5,
        marginLeft:20,
    },
    cartItemTitle: {
        top:-60,
        marginLeft:20,
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
    },
    cartItemPrice: {
        fontSize: 16,
        fontFamily:'OpenSans-Medium',
        marginTop: 5,
        position:'absolute',
        left:240,
        bottom:50,
    },
    cartItemQuantity: {
        fontSize: 14,
        fontFamily:'OpenSans-Light',
        color: '#666666',
        position:'absolute',
        left:240,
        bottom:30,
    },
});