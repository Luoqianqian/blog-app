import { Link } from "react-router-dom";
import '../styles/navbar.scss'
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                       <span>Qianqian's blog</span>
                    </Link>
                </div>
                <div className="links">
                  <Link className="link" to="/?cat=all">
                    <h6>全部</h6>
                  </Link>
                  <Link className="link" to="/?cat=art">
                    <h6>艺术</h6>
                  </Link>
                  <Link className="link" to="/?cat=technology">
                    <h6>科技</h6>
                  </Link>
                  <Link className="link" to="/?cat=cinema">
                    <h6>摄影</h6>
                  </Link>
                  <Link className="link" to="/?cat=pet">
                    <h6>宠物</h6>
                  </Link>
                  <Link className="link" to="/?cat=food">
                    <h6>食物</h6>
                  </Link>
                  {currentUser? <span>{currentUser.username}</span>
                    : <Link to='/login'>请登录！</Link>
                  }
                  <span onClick={() => { logout() }}>{currentUser? '退出' : ''}</span>
                  <span>
                    <Link className="write" to='/write'>+</Link>
                  </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
