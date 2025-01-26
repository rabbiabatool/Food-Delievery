import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Product from './pages/Product'
import RestaurantsList from './pages/RestaurantsList/RestaurantsList'
// import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchedItem from './pages/SearchedItems/SearchedItem';
import Checkout from './components/Checkout/Checkout';
import LoginSignUp from './pages/LoginSignUP/LoginSignUp';
import { Chat } from './components/Chat/Chat';
import Success from './components/Success/Success';
import Failed from './components/Failed/Failed';

function App() {
  return(
    <>   
      <BrowserRouter>
        <Routes>
           <Route path="/" index element={<RestaurantsList />} />
           <Route path="/product/:id" element={<Product />}>
           </Route>
           <Route path="/searched" element={<SearchedItem />}></Route>
           <Route path="/checkout" element={<Checkout />}></Route>
           <Route path='/login' element={<LoginSignUp />} />
           <Route path='/signup' element={<LoginSignUp />} />
           <Route path='/chat' element={<Chat />} />
           <Route path='/Success' element={<Success />} />
           <Route path='/Failed' element={<Failed />} />


        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
