import { Router, useRouter } from 'preact-router';
import Sidebar from './Sidebar/Sidebar.jsx';
import Redirect from '../../components/Redirect.jsx';

import ActiveView from './views/ActiveView/ActiveView.jsx';
import ArchivedView from './views/ArchivedView/ArchivedView.jsx';
import GenerateKeysView from './views/GenerateKeysView/GenerateKeysView.jsx';
import NewMessageView from './views/NewMessageView/NewMessageView.jsx';
import SupportPanelView from './views/SupportPanelView/SupportPanelView.jsx';

export default function Admin() {
    const [ router ] = useRouter();
    
    return (
    <>
        <Sidebar />

        <Router key={router.url}>
            <Redirect path="/" to="/informator/aktywne" />
            <Redirect path="/informator" to="/informator/aktywne" />

            <ActiveView path="/informator/aktywne" />
            <ArchivedView path="/informator/archiwum" />
            <NewMessageView path="/informator/nowy-komunikat" />
            <GenerateKeysView path="/generator-kodow" />
            <SupportPanelView path="/support" />
        </Router>
    </>
    );
}