import { Router } from 'preact-router';
import Sidebar from './Sidebar/Sidebar.jsx';

import ActiveView from './views/ActiveView/ActiveView.jsx';
import ArchivedView from './views/ArchivedView/ArchivedView.jsx';
import GenerateKeysView from './views/GenerateKeysView/GenerateKeysView.jsx';
import NewMessageView from './views/NewMessageView/NewMessageView.jsx';

export default function Admin() {
  return (
    <>
        <Sidebar />

        <Router>
            <ActiveView path="/active" />
            <ArchivedView path="/archived" />
            <GenerateKeysView path="/generate-keys" />
            <NewMessageView path="/new-message" />
        </Router>
    </>
  );
}