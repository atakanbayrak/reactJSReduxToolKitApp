import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/Header";
//Burada Header taginin routerdan sonra kullanılmasının nedeni eklenebilecek tüm routelar için headeri tekrar tekrar 
//yazmamak.
function App() {
  return (
    <div className="App">
      <Router>
        <Header/> 
        <Routes>
          <Route index path="/" element={<Product/>}/>  
        </Routes>  
      </Router>      
    </div>
  );
}

export default App;
