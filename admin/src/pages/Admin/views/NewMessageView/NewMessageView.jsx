import '../../../../styles/global.css';
import { useRef } from 'preact/hooks';
import { useContext } from 'preact/hooks';
import { SelectedFileContext } from '../../../../context/SelectedFileContext.jsx';

export default function NewMessageView() {
    console.log(useContext(SelectedFileContext));

    const { selectedFile, setSelectedFile } = useContext(SelectedFileContext);

    const wrapperRef = useRef(null);
    const toggle = () => {
        wrapperRef.current.classList.contains('hidden') ? 
        wrapperRef.current.classList.remove('hidden') : 
        wrapperRef.current.classList.add('hidden');
    }

    const zoneRef = useRef(null);
    const inputRef = useRef(null);
    const removeBtnRef = useRef(null);

    const zoneClick = (e) => {
        const zone = zoneRef.current;
        const removeBtn = removeBtnRef.current;
        const input = inputRef.current;

        if (removeBtn && removeBtn.contains(e.target)) return;
        input.click();
    }

    const inputChange = () => {
        if (inputRef.current.files[0]) {
            handleFile(inputRef.current.files[0]);
        }
    }

    const zoneDragOver = (e) => {
        e.preventDefault();
        zoneRef.current.classList.add('drag-over');
    }

    const zoneDragLeave = () => {
        zoneRef.current.classList.remove('drag-over');
    }

    const zoneDrop = (e) => {
        e.preventDefault();
        zoneRef.current.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    const removeClick = (e) => {
        e.stopPropagation();
        clearUploadPreview();
    }

    function handleFile(file) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowed.includes(file.type)) {
            alert('Niedozwolony format. Użyj JPG, PNG, WebP lub GIF.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Plik jest zbyt duży. Maksymalny rozmiar to 5 MB.');
            return;
        }
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        showUploadPreview(url);
    }

    const placehodlerRef = useRef(null);
    const previewRef = useRef(null);

    function showUploadPreview(src) {
        if (placehodlerRef.current) {
            placehodlerRef.current.classList.add('hidden');
        }

        if (previewRef.current) {
            previewRef.current.src = src;
            previewRef.current.classList.remove('hidden');
        }

        if (removeBtnRef.current) {
            removeBtnRef.current.classList.remove('hidden');
        }
    }

    function clearUploadPreview() {
        setSelectedFile(null);
        document.getElementById('upload-placeholder').classList.remove('hidden');
        const preview = document.getElementById('upload-preview');
        preview.src = '';
        preview.classList.add('hidden');
        document.getElementById('upload-remove').classList.add('hidden');
        document.getElementById('msg-image').value = '';
    }
    
    return (
<main class="view">
    <div class="view-header">
        <div>
            <h2 class="view-title" id="form-view-title">Nowy komunikat</h2>
            <p class="view-sub">Wypełnij poniższy formularz i opublikuj komunikat</p>
        </div>
        <button class="btn btn-ghost" id="cancel-form-btn">Anuluj</button>
    </div>

    <form id="message-form" class="message-form" novalidate>
        <input type="hidden" id="edit-msg-id"/>

        <div class="main-form">
            <div class="form-grid">
                <div class="form-col">
                    <div class="form-card">
                        <h3 class="form-card-title">Treść komunikatu</h3>

                        <div class="field-group">
                            <label for="msg-headline" class="field-label">
                                Hasło główne <span class="required">*</span>
                            </label>
                            <input type="text" id="msg-headline" class="field-input" placeholder="np. Wielka Konferencja Branżowa 2026" maxlength="120" />
                            <span class="field-hint">Wyświetlane w powiadomieniu push i na liście komunikatów</span>
                        </div>

                        <div class="field-group">
                            <label for="msg-description" class="field-label">
                                Opis <span class="required">*</span>
                            </label>
                            <textarea id="msg-description" class="field-textarea" rows="6" placeholder="Pełna treść komunikatu, którą klient zobaczy po kliknięciu 'Czytaj dalej'…"></textarea>
                        </div>

                        <div class="field-group">
                            <label class="field-label">Grafika (miniaturka)</label>
                            <div style="margin-bottom:10px;">
                                <label><input type="checkbox" id="msg-has-image" class="check-Image" onClick={toggle} onChange={inputChange} /> Dodaj zdjęcie</label>
                            </div>

                            <div id="image-upload-wrapper" class="hidden" ref={wrapperRef}>
                                <div class="upload-zone" id="upload-zone" ref={zoneRef} onClick={zoneClick} onDragOver={zoneDragOver} onDragLeave={zoneDragLeave} onDrop={zoneDrop}>
                                    <input type="file" id="msg-image" accept="image/jpeg,image/png,image/webp,image/gif" ref={inputRef} hidden/>
                                    <div class="upload-placeholder" id="upload-placeholder" ref={placehodlerRef}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="upload-icon">
                                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <span class="upload-label">Kliknij lub przeciągnij plik</span>
                                        <span class="upload-hint">JPG, PNG, WebP · Max 5 MB</span>
                                    </div>
                                    <img id="upload-preview" class="upload-preview hidden" alt="Podgląd grafiki" ref={previewRef}/>
                                    <button type="button" id="upload-remove" class="upload-remove hidden" ref={removeBtnRef} onClick={removeClick}>✕</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-grid-right">
                <div class="form-col">
                    <div class="form-card">
                        <h3 class="form-card-title">Ustawienia wyświetlania</h3>

                        <div class="field-group">
                            <label for="msg-duration" class="field-label">Czas wyświetlania komunikatu</label>
                            <select id="msg-duration" class="field-select">
                                <option value="1">1 dzień</option>
                                <option value="3">3 dni</option>
                                <option value="7" selected>1 tydzień</option>
                                <option value="14">2 tygodnie</option>
                                <option value="30">1 miesiąc</option>
                                <option value="90">3 miesiące</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label for="msg-frequency" class="field-label">Częstotliwość powiadomień</label>
                            <select id="msg-frequency" class="field-select">
                                <option value="1x_daily" selected>1 raz dziennie</option>
                                <option value="2x_daily">2 razy dziennie</option>
                                <option value="3x_daily">3 razy dziennie</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label for="msg-time" class="field-label">Godzina wyświetlania</label>
                            <input type="time" id="msg-time" class="field-input" value="10:00"/>
                            <span class="field-hint">Zgodnie z zegarem systemowym klienta</span>
                        </div>

                        <div class="field-group" id="frequency-option">
                            <label for="msg-time" class="field-label">Częstotliwość wyświetlania</label>
                            <input type="number" class="field-input" min="0" placeholder="Godziny" />
                            <input type="number" class="field-input" min="0" max="59" placeholder="Minuty" />
                            <span class="field-hint">Zgodnie z zegarem systemowym klienta</span>
                        </div>

                        <div class="toggles-section">
                            <div class="toggle-row">
                                <div class="toggle-info">
                                    <span class="toggle-label">Push notification</span>
                                    <span class="toggle-desc">Wyświetlaj jako powiadomienie systemowe</span>
                                </div>

                                <label class="toggle-switch">
                                    <input type="checkbox" id="msg-push" checked/>
                                    <span class="toggle-track"></span>
                                </label>
                            </div>

                            <div class="toggle-row">
                                <div class="toggle-info">
                                    <span class="toggle-label">Aktywny od razu</span>
                                    <span class="toggle-desc">Komunikat widoczny dla klientów po publikacji</span>
                                </div>
                                
                                <label class="toggle-switch">
                                    <input type="checkbox" id="msg-active" checked/>
                                    <span class="toggle-track"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        {/* <div id="form-error" class="error-msg"></div> */}
                        {/* <div id="form-success" class="success-msg hidden"></div> */}
                        <button type="submit" class="btn btn-primary btn-full" id="submit-btn">
                            <span id="submit-label">Opublikuj komunikat</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</main>
    );
}