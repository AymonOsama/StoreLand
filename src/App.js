import AppRouters from "./routers/AppRouters";
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";


function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <AppRouters />
          </div>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </div>
      </ProductProvider>
    </UserProvider>
  );
}



export default App;
