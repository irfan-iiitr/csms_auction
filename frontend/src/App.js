import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Page from './components/page';
import AuctionPage from './components/auctionPage';


const router=createBrowserRouter([
  {
    path:"/",
    element:<Page></Page>
  },
  {
    path:"/auction-page",
    element:<AuctionPage></AuctionPage>
  }
]);

function App() {
  return (
   <main>
    <RouterProvider router={router}></RouterProvider>
   </main>
  );
}

export default App;



