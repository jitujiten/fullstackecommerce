import Carosul from "../features/common/Carosul";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function Products() {
  return (
    <div>
      <Navbar>
        <Carosul/>
        <ProductList></ProductList>
      </Navbar>
      <Footer/>
    </div>
  );
}

export default Products;
