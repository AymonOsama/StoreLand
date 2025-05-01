import AppRouters from "./routers/AppRouters";
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserProvider>
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
      </UserProvider>
    </div>
  );
}


export default App;
