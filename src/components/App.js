import {Header} from "./Header";
import Speakers from "./Speakers";
import Layout from "./Layout";
import {AuthProvider} from "../context/AuthContext";


export const App = () => {
    /** Moved Theme state here so that other components re-renders on change*/
    return (
        <AuthProvider initialLoggedInUser="Gabru">
            <Layout startingTheme="light">
                {/*<Header theme={theme}/>*/}
                {/*<Speakers theme={theme}  setTheme={setTheme}/>*/}


                {/*Creating context and using that here, instead of doing prop-drilling*/}
                <Header/>
                <Speakers/>

            </Layout>
        </AuthProvider>
    )
}
