import '../../../../styles/global.css';
import './SupportPanelView.css';

import UploadInfoCard from './UploadInfoCard.jsx';
import ReportListCard from './ReportListCard.jsx';

export default function SupportPanelView() {
    return (
        <main className="view">
            <div className="view-header">
                <div>
                    <h2 className="view-title">Panel supportu</h2>
                    <p className="view-sub">Wiadomości i pliki od klientów</p>
                </div>
            </div>

            <div className='info-cards'>
                <UploadInfoCard label={'Łącznie uploadów'} number={'—'} description={'wszystkie zgłoszenia'} />
                <UploadInfoCard label={'Ukończone'} number={'—'} description={'status: completed'} />
                <UploadInfoCard label={'Oczekujące'} number={'—'} description={'status: pending / partial'} />
            </div>

            <ReportListCard />
        </main>
    )
}