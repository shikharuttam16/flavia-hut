import logo from './logo.svg';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ScrollTop from './helpers/scrollTop';
import ROLE from './common/role';

function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [cartProductCount,setCartProductCount] = useState(0)
 const [cartProduct,setCartProduct] = useState([])
 const [selectedProduct, setSelectedProduct] = useState("");
 const faqRef = useRef(null); // Define faqRef here
const [wishlist, setWishlist] = useState([]);
  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }


  const fetchCartData = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductView.url,{
      method : SummaryApi.addToCartProductView.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProduct(dataApi?.data)
  }
  const fetchWishListData = async()=>{
        const dataResponse = await fetch(SummaryApi.getWishlist.url,{
          method : SummaryApi.getWishlist.method,
          credentials : 'include'
        })
        const dataApi = await dataResponse.json()
        setWishlist(dataApi?.data)
  }


 
  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()
    fetchCartData()
    fetchWishListData()


  },[ ])
 
  const scrollToFAQ = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      
    }
  };
  const isOnAdminPanel = location.pathname.startsWith("/admin-panel");
  return (
    <>
    <Context.Provider
      value={{
        fetchUserDetails, // user detail fetch 
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart,
        cartProduct,
        fetchCartData,
        selectedProduct, // Pass selectedProduct to the context
        setSelectedProduct, // Provide a way to update selectedProduct
        faqRef,
        wishlist,
        setWishlist,
        fetchWishListData,
       
      }}
    >
      <ToastContainer position='top-center' />
      
      <div className='flex flex-col min-h-screen'>
      {/* {
        user?.role !== ROLE.ADMIN   && <>
        <Header  onProductSelect={setSelectedProduct}  onFAQClick={scrollToFAQ} />
        </>
       } */}
       {
        !isOnAdminPanel && <>
          <Header  onProductSelect={setSelectedProduct}  onFAQClick={scrollToFAQ} />
</>
       }
      
    
        <main className='flex-grow '> 
        <ScrollTop />
          <Outlet context={{ faqRef, id: 'faqAccordion' }}/>
        </main>
  
      {
        !isOnAdminPanel && <>
        <Footer />
        </>
      }
       
      </div>
    </Context.Provider>
  </>
  
  );
}

export default App;
