import Header from "./Header";

const Layout = ({children}) => {
    
    return <div className="site">
        <Header/>
        <div className="app">{children}</div>
    </div>
}

export default Layout;