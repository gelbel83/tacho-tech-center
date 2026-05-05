import '../../../../styles/global.css';
import './GenerateKeysView.css';
import ListLoading from '../../../../components/ListLoading';

export default function GenerateKeysView() {
    return (
        <main className="view">
            <div className="view-header">
                <div>
                    <h2 className="view-title">Generator kodów</h2>
                    <p className="view-sub">Generuj unikalne kody</p>
                </div>
            </div>   

            <form className="key-form" novalidate>
                <div className="form-card">
                    <h3 className="form-card-title">Liczba generowanych haseł</h3>

                    <div className="key-count-radio-group">
                        <input type="radio" name="key-count" value="1" id="1" checked />
                        <label for="1">1</label>

                        <input type="radio" name="key-count" value="10" id="10" />
                        <label for="10">10</label>

                        <input type="radio" name="key-count" value="50" id="50" />
                        <label for="50">50</label>

                        <input type="radio" name="key-count" value="100" id="100" />
                        <label for="100">100</label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="generate-key-btn btn btn-primary btn-full">
                        <span className="generate-key-label">Generuj</span>
                    </button>
                </div>
            </form>

            <div className="view-header">
                <h2 className="view-title">Wygenerowane kody</h2>
            </div>

            <div className="key-view-limit">
                <button><i className="fa-solid fa-angle-left"></i></button>

                <p><input type="number" value="1" min="1" step="1" className="current-tab"/> / <span>1</span></p>

                <button><i className="fa-solid fa-angle-right"></i></button>

                <p><span>0</span> - <span>0</span> / <span>0</span></p>
                <select>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div>
                <ListLoading label='Ładowanie kodów...'/>
            </div>
        </main>
    );
}