import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Settings, CheckCircle2 } from 'lucide-react';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Projects', path: '/projects', icon: FolderKanban },
    ];

    return (
        <div className="sidebar glass">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <CheckCircle2 size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">ProManage</h1>
            </div>

            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`
                        }
                    >
                        <link.icon size={20} />
                        <span className="font-medium">{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="absolute bottom-10 left-6 right-6 p-4 glass rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20">
                <p className="text-xs text-slate-400 mb-2">Workspace</p>
                <p className="text-sm font-semibold truncate">Personal Workspace</p>
            </div>
        </div>
    );
};

export default Sidebar;
