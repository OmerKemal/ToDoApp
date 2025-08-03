import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    // useLocation ensures this component re-renders on route changes,
    // so it "picks up" new auth state after login/logout.
    useLocation();

    const isAuthed = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link to="/todos" className="brand">TodoApp</Link>
                <nav className="nav">
                    {isAuthed ? (
                        <>
                            <Link to="/todos" className="nav-link">Todos</Link>
                            <Link to="/create" className="nav-link">Create</Link>
                            <button className="nav-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
