import React, { useState, useContext} from 'react';
import { StatusBar } from "expo-status-bar";
import {View, Text, StyleSheet, Pressable, Image, Modal, TouchableOpacity,} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'; 
import { BlurView } from 'expo-blur';
import CartContext from '../context/CartContext';

export default function Home () {

    const [modalVisible, setModalVisible] = useState(false);    
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart, setCart } = useContext(CartContext);
    const [selectedProduct, setSelectedProduct] = useState(null)

        // ARRAY DE PRODUCTOS       
        const productos = [
            {titulo:  'Control de Xbox        ', moneda: 'US$', precio: '44', imagen: require ('../assets/img/ControlXbox.png')},
            {titulo: 'Hub USB ANKER     ', moneda: 'US$', precio: '49', imagen: require ('../assets/img/HubUSB.jpg')},
            {titulo: 'InEar SoundCore ', moneda: 'US$', precio: '116', imagen: require ('../assets/img/InEar.jpg')},
            {titulo: 'MSI KATANA ', moneda: 'US$', precio: '1135', imagen: require ('../assets/img/LaptopMSI.jpg')},
            {titulo: 'Acer Nitro ', moneda: 'US$', precio: '121', imagen: require ('../assets/img/MonitorAcer.jpg')},
            {titulo: 'Razer Viper HyperSpeed ', moneda: 'US$', precio: '54', imagen: require ('../assets/img/MouseRazer.jpg')},
            {titulo: 'Razer Kaira for XBOX      ', moneda: 'US$', precio: '123', imagen: require ('../assets/img/RazerKaira.jpg')},
            {titulo: 'Gaming Tp-Link          ', moneda: 'US$', precio: '74', imagen: require ('../assets/img/Router.jpg')},
            {titulo: 'RTX 3060 ', moneda: 'US$', precio: '285', imagen: require ('../assets/img/TarjetaGrafica1.jpg')},
            {titulo: 'AMD SWFT 309        ', moneda: 'US$', precio: '299', imagen: require ('../assets/img/TarjetaGrafica2.jpg')},
        ];

        const handleIncrement = () => {
            const precio = parseFloat (selectedProduct.precio);
            setQuantity(quantity + 1);
            setTotalPrice((quantity + 1) * precio);
        };
        
        const handleDecrement = () => {
            if (quantity > 1) {
                const precio = parseFloat (selectedProduct.precio)
                setQuantity(quantity - 1);
                setTotalPrice((quantity - 1) * precio);
            }
        };
    
        const handleProductSelect = (product) => {
            setSelectedProduct({
                ...product,
                precio: parseFloat(product.precio)
            });
            setQuantity(1);
            setTotalPrice(product.precio);
            setModalVisible(true);
        };
         
        const handleAddToCart = () => {
            if (!selectedProduct) return;
        
            const newCartItem = {
                imagen: selectedProduct.imagen,
                titulo: selectedProduct.titulo,
                moneda:selectedProduct.moneda,
                precio: selectedProduct.precio,
                cantidad: quantity,
                totalPrice: totalPrice
            };
        
            setCart([...cart, newCartItem]);
            setModalVisible(false);
        };

    return(
        // construction
        <ScrollView contentContainerStyle={styles.scrollContainer} >
            <StatusBar style='dark' />

            <View style={styles.BloqueInputs} >
                <Icon 
                    name='search1'
                    style={styles.IconSearch}
                />
            <TextInput
                placeholder='Buscar'
                value={0}
                onChangeText={0}
                style={styles.InputSearch} 
                borderBottomColor={"#DDDDDD"}
                borderLeftColor={"#DDDDDD"} 
                borderRightColor={"#DDDDDD"} 
                borderTopColor={"#DDDDDD"}
            />
            </View>

            {/* TITULO DE SLIDE */}
            <Text style={styles.TituloSlide}>Productos más vendidos</Text>

                {/* SLIDE DE PRODCTOS MAS VENDIDOS */}
                <ScrollView horizontal={true} style={styles.SlideView}>
                    {productos.map((productos, index) => (
                    <Image key={index}  style={styles.ImgSlide} source={productos.imagen}/>
                ))}
                </ScrollView> 
                
                <View style={styles.OfertasContenedor}>
                    <Text style={styles.OfertasTxt}> Ofertas para ti </Text>
                </View>

            <View style={styles.container}>
            <>
                {/* USANDO ARRAY DE LOS PRODUCTOS */}
            {productos.map((productos, index) => (  

                <View key={index} style={styles.Box}>
                    <Text style={styles.TituloProducto}>{productos.titulo}         
                        <Text style={styles.Moneda}>{productos.moneda}</Text>
                        <Text style={styles.Price}>{productos.precio}</Text>
                       </Text>
                    <Image style={styles.Img} source={productos.imagen}/>

                    <TouchableOpacity
                        style={styles.ContenedorIconPlus} 
                        onPress={() => {
                        handleProductSelect(productos)}}>

                        <Icon 
                            name="plus" 
                            style={styles.PlusIcon}                             
                        />
                    </TouchableOpacity>                   
                </View>
                ))}
            </>
            </View>
        
                {/* CREANDO MODAL */}
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.ModalContainer}>
                <BlurView intensity={50} style={styles.blurContainer} /> 
                <View style={styles.ModalContent}>
                    <Icon name='close' style={styles.CerrarModal} onPress={() => setModalVisible(false)}/>
                    <Text style={styles.TituloModal}>AGREGAR AL CARRO</Text>
                    {selectedProduct && (
                        <>
                            <Text style={styles.ModalTitle}> {selectedProduct.titulo}</Text>
                            <Text style={styles.ModalPrice}> {selectedProduct.moneda}{totalPrice}</Text>
                        </>
                    )}
                    
                <View style={styles.ContenedorBotones}>
                    <Pressable style={styles.ContenedorIconosOpciones} onPress={handleIncrement}>
                        <Icon name='plus' style={styles.IconosOpciones}/>
                    </Pressable>

                    <Text style={styles.Cantidad}>{quantity}</Text>

                    <Pressable style={styles.ContenedorIconosOpciones} onPress={handleDecrement}>
                    <Icon name='minus' style={styles.IconosOpciones}/>
                    </Pressable>

                </View>  
                    <Pressable style={styles.BotonAgregar} onPress={handleAddToCart}>
                        <Text style={styles.TextoAgregar}> Agregar </Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor:'#EEEEEE'
    },
    container: {
        width: '100%',
    },

    //    BUSCADOR 
    BloqueInputs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputSearch: {
        backgroundColor:"#F8F8F8",
        borderRadius:6,
        width: 330,
        height: 43,
        marginTop:14,
        marginBottom:15,
        paddingLeft: 15,
        borderTopWidth:0.5,
        borderBottomWidth:2,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        fontFamily:'OpenSans-Regular',
    },
    IconSearch: { 
        color:'#686D76',
        fontSize:20,
        marginRight:5,
    },

    //   BLOQUE DE SLIDE
    TituloSlide:{
        marginTop:10,
        marginBottom:7,
        marginLeft:16,
        alignSelf:'flex-start',
        fontSize:20,
        fontFamily:'OpenSans-Bold',
    },
    SlideView:{
        marginBottom:25,
        backgroundColor:'#FFFFFF',
        height:190,
        width:'100%',
    },
    ImgSlide:{
        alignSelf:'center',
        resizeMode:'contain',
        height: 170,
        backgroundColor:'#FFFFFF',
    },

    //    VISTA DE PRODUCTOS GENERALES
    OfertasContenedor: {
        alignSelf:'flex-start',
        marginLeft:16,
        marginBottom:10,
    },
    OfertasTxt: {
        fontSize:20,
        fontFamily:'OpenSans-Bold',
    },
    Box: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 1.000,
        padding: 10,
        borderRadius: 10,
        height: 200,
        marginBottom: 10,
        marginLeft:16,
        marginRight:16,
    },
    Img: {
        // Para mantener la imagen completa dentro del cuadro " resizeMode:'contain' "
        resizeMode:'contain',
        height:130,
        aspectRatio: 1,
        borderRadius: 5,
        bottom:50,
        marginLeft:10,
    },
    TituloProducto: {
        bottom:-40,
        right:10,
        fontFamily:'OpenSans-Bold',
        fontSize:17,
        paddingTop:10,
        paddingLeft:200,
    },
    Moneda: {
        fontFamily:'OpenSans-Bold',
        fontSize:14,
        paddingTop:50,
        paddingLeft:200,
        color:'#DC5F00',
    },
    Price: {
        fontFamily:'OpenSans-Bold',
        fontSize:20,
        paddingTop:38,
        paddingLeft:200,
        color:'#DC5F00',
    },
    ContenedorIconPlus: {
        position: 'absolute',
        backgroundColor:'#DC5F00',
        borderRadius:30,
        left: 299,
        top: 157,
    },
    PlusIcon: {
        color: '#FFFFFF',
        fontSize: 25,
        margin:4, 
    },

    //  AGREGAR PRODCUTO AL CARRO
    ModalContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',   
    },
    ModalContent: {
        borderWidth: 0.5, 
        borderColor: '#686D76', 
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems: 'center',
        width:300,
        height:300,
    },
    CerrarModal: {
        fontSize:25,
        position:'absolute',
        left:15,
        top:15,
    },

    TituloModal: {
        fontSize:20,
        fontFamily:'OpenSans-Bold',
        top:-40,
        alignSelf:'center',
    },
    ModalTitle: {
        fontSize:15,
        fontFamily:'OpenSans-Medium',
        bottom:30,        
    },
    ModalPrice:{
        color:'#DC5F00',
        bottom:30,
        fontSize:20,
        fontFamily:'OpenSans-SemiBold',
    },
    ContenedorBotones:{
        marginTop:10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 0.10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        
    },
    ContenedorIconosOpciones:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#EEEEEE',
        borderRadius:30,
        width:34,
        height:34,
    },
    IconosOpciones: {
        fontSize:23,
    },
    Cantidad: {
        fontFamily:'OpenSans-SemiBold',
        marginLeft:20,
        marginRight:20,
        fontSize:23,
    },
    BotonAgregar:{
        top:40,
        backgroundColor:'#DC5F00',
        borderRadius:40,
    },  
    TextoAgregar: {
        margin:10,
        marginLeft:25,
        marginRight:25,
        fontSize:15,
        color:'#FFFFFF',
        fontFamily:'OpenSans-SemiBold',
        
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject
    },
});
