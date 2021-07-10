import React, {useContext} from 'react';

import {ThemeContext,ThemeProvider} from "../context/ThemeContext";
/** By Default children comes as prop*/
function Layout({children, startingTheme}) {
    return (
        <ThemeProvider startingTheme={startingTheme}>
            <LayoutNoThemeProvider>
                {children}
            </LayoutNoThemeProvider>
        </ThemeProvider>
    )
}

/** Segregating it into a separate function as ThemeContext won't be created until
 * ThemeProvider is called, hence moving theme provider in separate function above
 * and then calling this function.
 * Gets a bit tricky with all the children moving around.*/
function LayoutNoThemeProvider({children}) {
    const {theme} = useContext(ThemeContext);
    return (
        <div
            className={
                theme == "light" ?
                    "container-fluid light" :
                    "container-fluid dark"

            }>
            {children}
        </div>
    )

}

export default Layout;