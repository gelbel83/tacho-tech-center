// DO ZROBIENIA

import { useState } from 'preact/hooks';

export default function MessageCard({ data, filter }) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <div className="msg-card">
            <div class="msg-thumb">
                ${msg.image_url ? `<img src="http://localhost:3000${msg.image_url}" alt="${escHtml(msg.headline)}" loading="lazy"/>`
                : `<div class="msg-thumb-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"/>
                        </svg>
                    </div>`
                }
            </div>
            <div class="msg-body">
                <div class="msg-headline" title="${escHtml(msg.headline)}">${escHtml(msg.headline)}</div>
                <div class="msg-meta">
                    {/* ${badge}
                    <span class="msg-info">${freq[msg.display_frequency] || msg.display_frequency} · ${msg.display_time}</span>
                    ${expires ? `<span class="msg-info">${expires}</span>` : ''} */}
                </div>
            </div>
            <div class="msg-actions">
                {filter !== 'archived' ? `
                    <label class="toggle-status" title="${msg.is_active ? 'Wyłącz' : 'Włącz'} komunikat">
                    <input type="checkbox" ${msg.is_active ? 'checked' : ''} data-action="toggle" data-id="${msg.id}"/>
                    <span class="toggle-status-track"></span>
                    </label>` : ''}
                <button class="action-btn action-edit" title="Edytuj" data-action="edit" data-id="${msg.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                </button>

                <button class="action-btn action-delete" title="Usuń" data-action="delete" data-id="${msg.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}