import { useState } from 'preact/hooks';
import { API } from '../../../api.js';

import SidebarItem from './SidebarItem.jsx';
import ExpandableSidebarItem from './ExpandableSidebarItem.jsx';
import SidebarLogo from './SidebarLogo.jsx';
import SidebarFooter from './Sidebarfooter.jsx';

import '../../../styles/global.css';
import './Sidebar.css';


export default function Sidebar() {
    const activeIcon = <i className="fa-solid fa-circle-check"></i>;
    const archivedIcon = <i className="fa-solid fa-box-archive"></i>;
    const generateKeysIcon = <i className="fa-solid fa-key"></i>;
    const supportPanelIcon = <i class="fa-solid fa-upload"></i>;
    const newMessageIcon = <i className="fa-solid fa-plus"></i>;
    const inboxIcon = <i class="fa-solid fa-inbox"></i>;

    return (
        <aside className="sidebar screen">
            <SidebarLogo />

            <ExpandableSidebarItem label={'Informator'} icon={inboxIcon} >
                <SidebarItem label={'Aktywne'} icon={activeIcon} path={'/informator/aktywne'} badge={'0'}/>
                <SidebarItem label={'Archiwum'} icon={archivedIcon} path={'/informator/archiwum'} />
                <SidebarItem label={'Nowy komunikat'} icon={newMessageIcon} path={'/informator/nowy-komunikat'} />
            </ExpandableSidebarItem>
            
            <SidebarItem label={'Generator kodów'} icon={generateKeysIcon} path={'/generator-kodow'} />
            <SidebarItem label={'Panel supportu'} icon={supportPanelIcon} path={'/support'} />

            <SidebarFooter />
        </aside>
    )
}