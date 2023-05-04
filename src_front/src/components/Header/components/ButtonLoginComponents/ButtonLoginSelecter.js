import { useEffect, useState } from "react";
import ButtonInput from './ButtonIn';
import ButtonLive from "./ButtonLive";

const ButtonLoginSelecter = (enter) => {
    if (String(enter.enter)==="Войти") {
        return (
            <ButtonInput/>
        )
    } else {
        return (
            <ButtonLive/>
        )
    }
}
export default ButtonLoginSelecter;
