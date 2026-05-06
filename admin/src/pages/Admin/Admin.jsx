import { Router } from 'preact-router';
import Sidebar from './Sidebar/Sidebar.jsx';

import ActiveView from './views/ActiveView/ActiveView.jsx';
import ArchivedView from './views/ArchivedView/ArchivedView.jsx';
import GenerateKeysView from './views/GenerateKeysView/GenerateKeysView.jsx';
import NewMessageView from './views/NewMessageView/NewMessageView.jsx';
import SupportPanelView from './views/SupportPanelView/SupportPanelView.jsx';

export default function Admin() {
  return (
    <>
        <Sidebar />

        <Router>
            <ActiveView path="/active" default />
            <ArchivedView path="/archived" />
            <GenerateKeysView path="/generate-keys" />
            <SupportPanelView path="/support" />
            <NewMessageView path="/new-message" />
        </Router>
    </>
  );
}