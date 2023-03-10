import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Login from './Login';
import Widgets from './Widgets';
import { useSelector,useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        //user logged in
        dispatch(login({
          email:userAuth.email,
          uid:userAuth.uid,
          displayName:userAuth.displayName,
          photoUrl:userAuth.photoURL
        }))
      }
      else{
        //user logged out
        dispatch(logout());
      }
    })
  }, []);

  return (
    <div className="app">
      <Header/>
      {!user ? <Login/>:(
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets/>
        </div>
      )}
    </div>
  );
}

export default App;
