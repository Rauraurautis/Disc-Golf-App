import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Toast, { ErrorToast } from 'react-native-toast-message';
import { View } from 'react-native';


 const ToastMessage = forwardRef(({ message }, ref) => {

    const toastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 15
                }}
            />
        )
    }

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: message,
            
        })
    }

    useImperativeHandle(ref, () => ({
        showToast
    }))

    return (
        <View style={{zIndex: 2}}>
        <Toast config={toastConfig} />
        </View>
    )
})

export default ToastMessage
