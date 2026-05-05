import { useState } from 'preact/hooks';
import { API } from '../../../api.js';

import SidebarItem from './SidebarItem.jsx';
import SidebarLogo from './SidebarLogo.jsx';
import SidebarFooter from './Sidebarfooter.jsx';

import '../../../styles/global.css';
import './Sidebar.css';

export default function Sidebar() {
    const activeIcon = <i className="fa-solid fa-circle-check"></i>;
    const archivedIcon = <i className="fa-solid fa-box-archive"></i>;
    const generateKeysIcon = <i className="fa-solid fa-key"></i>;
    const newMessageIcon = <i className="fa-solid fa-plus"></i>;

    return (
        <aside className="sidebar screen">
            <SidebarLogo />

            <SidebarItem label={'Aktywne'} icon={activeIcon} path={'/active'} />
            <SidebarItem label={'Archiwum'} icon={archivedIcon} path={'/archived'} />
            <SidebarItem label={'Generator kodów'} icon={generateKeysIcon} path={'/generate-keys'} />
            <SidebarItem label={'Nowy komunikat'} icon={newMessageIcon} path={'/new-message'} />

            <SidebarFooter />
        </aside>
    )
}