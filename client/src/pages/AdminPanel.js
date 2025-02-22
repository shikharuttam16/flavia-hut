import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import { toast } from 'react-toastify';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include",
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
            window.location.reload();
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            {/* Mobile Navbar */}
            <div className="flex items-center justify-between p-4 md:hidden bg-white shadow">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button onClick={toggleSidebar} className="text-2xl">
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`bg-white w-full md:w-60 customShadow  flex flex-col items-center p-4 md:block ${isSidebarOpen ? 'block' : 'hidden'} md:min-h-full `}>
                <nav className='w-full grid gap-2 p-4 text-center  ' onClick={toggleSidebar}>
                    <Link to="all-users" className='px-2 py-1 hover:bg-slate-100 rounded'>All Users</Link>
                    <Link to="all-products" className='px-2 py-1 hover:bg-slate-100 rounded'>All Products</Link>
                    <Link to="all-categories" className='px-2 py-1 hover:bg-slate-100 rounded'>All Categories</Link>
                    <Link to="all-orders" className='px-2 py-1 hover:bg-slate-100 rounded'>All Orders</Link>
                    <Link to="all-orders" className='px-2 py-1 hover:bg-slate-100 rounded'>All Categories</Link>

                    <div className='flex flex-col items-center'>
                    <button
                    className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-2 rounded-full mt-auto mb-4 md:mb-0 w-[100px]'
                    onClick={handleLogout}
                >
                    Logout
                </button>
                    </div>
                   
                </nav>

               
            </aside>

            {/* Main Content */}
            <main className='w-full p-4 md:p-6'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
