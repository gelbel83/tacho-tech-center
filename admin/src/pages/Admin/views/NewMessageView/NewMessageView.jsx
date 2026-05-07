import '../../../../styles/global.css';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { SelectedFileContext } from '../../../../context/SelectedFileContext.jsx';
import { API, useAuth } from '../../../../api.js';

export default function NewMessageView() {
    const { selectedFile, setSelectedFile, clearUploadPreview } = useContext(SelectedFileContext);
    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: null, msg: '' });

    const [hasImage, setHasImage] = useState(false);
    const [showInterval, setShowInterval] = useState(false);

    const { getAuthHeader } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: null, msg: '' });

        const formData = new FormData(e.currentTarget);
        const headline = formData.get('headline').trim();
        const description = formData.get('description').trim();

        if (!headline) return setStatus({ type: 'error', msg: 'Hasło główne jest wymagane.' });
        if (!description) return setStatus({ type: 'error', msg: 'Opis jest wymagany.' });

        setLoading(true);

        try {
            const editingId = null; 
            const url = editingId ? `${API}/messages/${editingId}` : `${API}/messages`;
            const method = editingId ? 'PUT' : 'POST';

            if (hasImage && selectedFile) {
                formData.append('image', selectedFile);
            }

            const res = await fetch(url, { 
                method, 
                headers: getAuthHeader(), 
                body: formData 
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Błąd serwera');

            setStatus({ 
                type: 'success', 
                msg: editingId ? 'Komunikat zaktualizowany.' : 'Komunikat opublikowany.' 
            });

            setTimeout(() => route('/informator/aktywne'), 1200);
        } catch (err) {
            setStatus({ type: 'error', msg: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleFrequencyChange = (e) => {
        setShowInterval(e.target.selectedIndex > 0);
    };

    return (
        <main className="view">
            <div className="view-header">
                <div>
                    <h2 className="view-title">Nowy komunikat</h2>
                    <p className="view-sub">Wypełnij poniższy formularz i opublikuj komunikat</p>
                </div>
                <button className="btn btn-ghost" onClick={() => route('/informator/aktywne')}>Anuluj</button>
            </div>

            <form className="message-form" onSubmit={handleSubmit} novalidate>
                <div className="main-form">
                    <div className="form-grid">
                        <div className="form-col">
                            <div className="form-card">
                                <h3 className="form-card-title">Treść komunikatu</h3>

                                <div className="field-group">
                                    <label className="field-label">Hasło główne <span className="required">*</span></label>
                                    <input type="text" name="headline" className="field-input" placeholder="np. Wielka Konferencja..." maxlength="120" />
                                </div>

                                <div className="field-group">
                                    <label className="field-label">Opis <span className="required">*</span></label>
                                    <textarea name="description" className="field-textarea" rows="6" placeholder="Pełna treść..."></textarea>
                                </div>

                                <div className="field-group">
                                    <label className="field-label">Grafika (miniaturka)</label>
                                    <div style="margin-bottom:10px;">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                checked={hasImage} 
                                                onChange={(e) => {
                                                    setHasImage(e.target.checked);
                                                    if(!e.target.checked) setSelectedFile(null);
                                                }} 
                                            /> Dodaj zdjęcie
                                        </label>
                                    </div>

                                    {hasImage && (
                                        <div className="field-group">
                                            <label className="upload-zone" style={{ cursor: 'pointer', display: 'block' }}>
                                                <input 
                                                    type="file" 
                                                    style={{ display: 'none' }} 
                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    accept="image/*" 
                                                />
                                                
                                                <div className="upload-placeholder">
                                                    <i class="fa-regular fa-image fa-2x"></i>
                                                    <span className="upload-label">
                                                        {selectedFile ? <strong>{selectedFile.name}</strong> : "Kliknij, aby wybrać plik"}
                                                    </span>
                                                    <span className="upload-hint">JPG, PNG, WebP · Max 5 MB</span>
                                                </div>
                                            </label>

                                            {selectedFile && (
                                                <button 
                                                    type="button" 
                                                    className="upload-remove"
                                                    title="Usuń zdjęcie"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-grid-right">
                        <div className="form-col">
                            <div className="form-card">
                                <h3 className="form-card-title">Ustawienia wyświetlania</h3>

                                <div className="field-group">
                                    <label className="field-label">Czas wyświetlania</label>
                                    <select name="display_duration_days" className="field-select">
                                        <option value="1">1 dzień</option>
                                        <option value="7" selected>1 tydzień</option>
                                        <option value="30">1 miesiąc</option>
                                    </select>
                                </div>

                                <div className="field-group">
                                    <label className="field-label">Częstotliwość powiadomień</label>
                                    <select name="display_frequency" className="field-select" onChange={handleFrequencyChange}>
                                        <option value="1x_daily">1 raz dziennie</option>
                                        <option value="2x_daily">2 razy dziennie</option>
                                        <option value="3x_daily">3 razy dziennie</option>
                                    </select>
                                </div>

                                {showInterval && (
                                    <div className="field-group">
                                        <label className="field-label">Częstotliwość (HH:mm)</label>
                                        <input type="time" name="display_interval" className="field-input" defaultValue="01:00" />
                                    </div>
                                )}

                                <div className="field-group">
                                    <label className="field-label">Godzina startu</label>
                                    <input type="time" name="display_time" className="field-input" defaultValue="10:00"/>
                                </div>

                                <div className="toggles-section">
                                    <div className="toggle-row">
                                        <span className="toggle-label">Push notification</span>
                                        <label className="toggle-switch">
                                            <input type="checkbox" name="show_push" defaultChecked />
                                            <span className="toggle-track"></span>
                                        </label>
                                    </div>
                                    <div className="toggle-row">
                                        <span className="toggle-label">Aktywny od razu</span>
                                        <label className="toggle-switch">
                                            <input type="checkbox" name="is_active" defaultChecked />
                                            <span className="toggle-track"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                {status.msg && (
                                    <div className={`message ${status.type}-msg`}>
                                        {status.msg}
                                    </div>
                                )}
                                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                    <span>{loading ? 'Przetwarzanie...' : 'Opublikuj komunikat'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}