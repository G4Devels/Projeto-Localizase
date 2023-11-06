import { useState } from 'react';
import '../component_styles/passwordVisible.css';



export const PasswordVisible = ({element}) => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [typeInput, setTypeInput] = useState(false)

    function togglePasswordVisibility(){
        setPasswordVisible(!passwordVisible)
        setTypeInput(!typeInput)

        const tagInput = document.getElementById(element)

        if(!typeInput){
            tagInput.type = "text"
        }
        else {
            tagInput.type = "password"
        }
    }

    return (<i id="eye" class={passwordVisible ? "fi fi-rr-eye" : "fi fi-rr-eye-crossed"} onClick={ togglePasswordVisibility }> </i>)
}