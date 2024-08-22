import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutMain from "./components/(clients)/layout";
import HomePage from "./pages/(clients)/HomePage";
import Login from "./pages/(clients)/Login";
import ProfilePage from "./pages/(clients)/Profile";
import AddPost from "./pages/(clients)/AddPost";
import LayoutProfile from "./components/(clients)/layout-profile";
import UpdatePost from "./pages/(clients)/UpdatePost";
import PrivateRouter from "./components/PrivateRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Route>
        <Route path="/login" element={<Login />} />
        
        <Route path="/profile" element={<PrivateRouter><LayoutProfile /></PrivateRouter>}>
          <Route index element={<ProfilePage />} />
          <Route path="add" element={<AddPost />} />
          <Route path=":id/edit" element={<UpdatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
