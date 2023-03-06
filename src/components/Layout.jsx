import Navbar from "./Navbar";
import Footer from "./Footer";
import Wrapper from "./Wrapper";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Wrapper>
            <Navbar />
            <Outlet />
            <Footer />
        </Wrapper>
    )
};

export default Layout;
