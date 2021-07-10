import React, {useState} from 'react';


/** Creating Theme as separate hook and validating if light or dark*/
function useTheme(startingTheme="light") {
    const [theme,setTheme]=useState(startingTheme);

    const validateTheme=(themeValue)=>{
        themeValue=="dark" ? setTheme("dark") : setTheme("light")
    }
/** Here setTheme is refered to validateTheme, destructuring*/
    return   {theme,setTheme:validateTheme}
}

export default useTheme;