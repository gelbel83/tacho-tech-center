import { useState } from 'preact/hooks';
import "./MessageCard.css";

export default function MessageCard({ headline, display_frequency, display_time, expires, is_active, id }) {
    return (
        <div className="msg-card">
            <div class="msg-thumb">

            </div>
            <div class="msg-body">
                <div class="msg-headline">
                    {headline}
                </div>
                <div class="msg-meta">
                    <span class="msg-badge badge-active">Aktywny</span>
                    <span class="msg-info">{display_frequency} · {display_time}</span>
                    <span class="msg-info">Wygasa: {expires}</span>
                </div>
            </div>
            <div class="msg-actions">
                <label class="toggle-status" title="${msg.is_active ? 'Wyłącz' : 'Włącz'} komunikat">
                    <input type="checkbox" {...is_active ? 'checked' : ''} data-action="toggle" data-id={id}/>
                    <span class="toggle-status-track"></span>
                </label>

                <button class="action-btn action-edit" title="Edytuj" data-action="edit" data-id={id}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                </button>

                <button class="action-btn action-delete" title="Usuń" data-action="delete" data-id={id}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}