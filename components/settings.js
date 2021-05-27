import React, { useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { Input, Button, Overlay } from 'react-native-elements'
import { db } from '../firebase'

const settings = () => {
    const [pin, setPin] = useState()
    const [stream, setStream] = useState([])
    const [visible, setVisible] = useState(false);

    const Check = async () => {
        await setVisible(!visible);
        await db.collection('orders').where('pin', '==', pin).get().then((snapshot) => {
            snapshot.forEach(doc => {
                setStream("Your unique code is: " + doc.data().code)
            })
            setPin('')
        })
        await setVisible(visible);
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <Text>Information control center</Text>
                <Text style={{
                    marginTop: 20
                }}>Enter your pin here in order to view your unique code</Text>
                <Input value={pin} onChangeText={(text) => setPin(text)} style={{
                    marginTop: 30
                }} placeholder="Enter your pin" />
                
            </ScrollView>
            <View>
                <Button onPress={Check} title="Submit" />
                <Text style={{
                    marginTop: 40,
                }}>{stream}</Text>
            </View>
            <View>
                <Overlay isVisible={visible}>
                    <Text>Checking...</Text>
                </Overlay>
            </View>
        </KeyboardAvoidingView>
        
    )
}

export default settings

const styles = StyleSheet.create({})
