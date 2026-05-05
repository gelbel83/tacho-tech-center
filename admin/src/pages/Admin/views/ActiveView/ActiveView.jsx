import '../../../../styles/global.css';
import ListLoading from '../../../../components/ListLoading';

export default function ActiveView() {
    return (
        <main className="view">
            <div className="view-header">
                <div>
                    <h2 className="view-title">Aktywne komunikaty</h2>
                    <p className="view-sub">Lista komunikatów aktualnie prezentowanych klientom</p>
                </div>

                <button className="new-msg-shortcut btn btn-primary">
                    <i className="fa-solid fa-plus"></i>
                    <span>Nowy komunikat</span>
                </button>
            </div>

            <div class="message-list">
                <ListLoading label='Ładowanie komunikatów...'/>
            </div>
        </main>
    );
}