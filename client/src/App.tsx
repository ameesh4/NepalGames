import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin/Admin';
import AdminSignin from './pages/Admin/AdminSignin';
import Layout from './layout';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminProducts from './pages/Admin/AdminProducts';
import NotFound from './pages/NotFound';
import AuthSection from './pages/AuthSection';
import Profile from './pages/Profile';
import AdminCategory from './pages/Admin/AdminCategory';

export default function App(){
    return (
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthSection />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/98456523/" element={<Layout />} >
                        <Route path="/98456523/admin" element={<Admin />} />
                        <Route path="/98456523/admin/users" element={<AdminUsers />} />
                        <Route path="/98456523/admin/products" element={<AdminProducts />} />
                        <Route path="/98456523/admin/categories" element={<AdminCategory />} />
                    </Route>
                    <Route path="/98456523/admin/signin" element={<AdminSignin />} />
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </Router>    
        )
}