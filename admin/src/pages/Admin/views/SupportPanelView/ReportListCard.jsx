import '../../../../styles/global.css';
import ListLoading from '../../../../components/ListLoading';

export default function ReportListCard() {
    return (
        <div className="report-list-card">
            <div className="report-list-header">
                <h3>Lista zgłoszeń</h3>
                <input type="text" placeholder='Szukaj (imię, email...)' className='report-search'/>
            </div>
            <table className='report-table'>
                <tr>
                    <th>KLIENT</th>
                    <th>EMAIL</th>
                    <th>PLIKI</th>
                    <th>STATUS</th>
                    <th>DATA</th>
                </tr>
            </table>
            <div className='report-list-none'>
                <ListLoading />
            </div>
        </div>
    )
}