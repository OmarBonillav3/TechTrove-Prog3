import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {View, Text, StyleSheet, TextInput,Alert, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function Login ({navigation}) {
        
    // DECLARACION DE VARIABLES PARA VERIFICACION DE LOGIN
    const [Nombre, setNombre] = useState ('');
    const [Contraseña, setContraseña] = useState ('') ;

    // FUNCION PARA VERIFICAR LOGIN
    const CheckLogin = () => {
        if (Nombre === 'OmarBonilla' && Contraseña === '12345'){
            navigation.replace ('HomeTabs');

        }else {
            Alert.alert('El nombre de usuario o la contraseña no son correctos');
        }
    }


    return(
                        // PANTALLA LOGIN          
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <StatusBar style='light' />
            <View style={styles.BloqueText}>
            <Text style={styles.LogoText}>TechTrove</Text>
                <Text style={styles.TextStyle}>Tu destino para las últimas innovaciones tecnológicas.</Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.select({ ios: 300, android: 0 })}
            >
              
            <View style={styles.BloqueInputs}>
            <TextInput
            placeholder='Nombre'
            value={Nombre}
            onChangeText={setNombre}
            style={styles.InputNombre} 
            borderBottomColor={"#E2DFDF"}
            borderLeftColor={"#E2DFDF"} 
            borderRightColor={"#E2DFDF"} 
            borderTopColor={"#E2DFDF"}
            />
            
            <TextInput
            placeholder='Contraseña'
            value={Contraseña}
            onChangeText={setContraseña}
            style={styles.InputContraseña} 
            borderBottomColor={"#E2DFDF"}
            borderLeftColor={"#E2DFDF"} 
            borderRightColor={"#E2DFDF"} 
            borderTopColor={"#E2DFDF"}
            secureTextEntry={true}/>
            
            {/* BOTON PARA INICIAR SESSION */}
           </View>
           </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
            <View style={styles.BloqueBotonIniciar}>
                <TouchableOpacity
                    style={styles.BotonIniciar}
                    onPress={CheckLogin}>
                <Text style={styles.TextoBoton}>
                    Iniciar
                </Text>
                </TouchableOpacity> 
           </View>
        </View>

    )
}

const styles = StyleSheet.create ({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#373A40",
    },
    LogoText: {
        alignSelf:'center',
        fontFamily:'BrunoAceSC',
        fontSize:50,
        color:'#DC5F00',
        top:50,
      },
    BloqueText: {
        top:62,
    },
    TextStyle: {
        top:80,
        padding:20,
        fontFamily:'OpenSans-SemiBold',
        fontSize:20,
        textAlign:'center',
        color:"#FFFFFF",        
    },
    BloqueInputs: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top:200,
    },
    InputNombre: {
        backgroundColor:"#F8F8F8",
        borderRadius:20,
        width: 282,
        height: 53,
        margin:14,
        paddingLeft: 35,
        borderTopWidth:0.5,
        borderBottomWidth:2,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        fontFamily:'OpenSans-Regular',
    },
    InputContraseña: {
        backgroundColor:"#F8F8F8",
        borderRadius:20,
        width: 282,
        height: 53,
        margin:14,
        paddingLeft: 35,
        borderTopWidth:0.5,
        borderBottomWidth:2,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        fontFamily:'OpenSans-Regular',
    },
    BloqueBotonIniciar: {
        flex:1,
        // Hola que tal? 10/jul/2024 - 11:56 AM
    },
    BotonIniciar: {
        backgroundColor:"#DC5F00",
        width:282,
        height:44,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 20,
        top:-240,
    },
    TextoBoton: {
        color: "#FFFFFF",
        fontFamily:'OpenSans-Bold',
        fontSize:17,
    },
})