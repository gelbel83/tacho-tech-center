import '../../../../styles/global.css';
import ListLoading from '../../../../components/ListLoading.jsx';

export default function ArchivedView() {
    return (
        <main class="view">
            <div class="view-header">
                <div>
                    <h2 class="view-title">Archiwum</h2>
                    <p class="view-sub">Wyłączone i wygasłe komunikaty</p>
                </div>
            </div>

            <div class="message-list">
                <ListLoading label='Ładowanie archiwum...'/>
            </div>
        </main>
    );
}