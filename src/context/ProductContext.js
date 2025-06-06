import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cartProduct"));
    if (savedCart) {
      setCartProduct(savedCart);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ cartProduct, setCartProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
