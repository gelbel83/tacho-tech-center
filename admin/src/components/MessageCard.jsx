import { useState } from 'preact/hooks';
import "./MessageCard.css";

const freqMap = {
  '1x_daily': '1× dziennie',
  '2x_daily': '2× dziennie',
  '3x_daily': '3× dziennie'
};

export default function MessageCard({ image_url, headline, display_frequency, display_time, expires, is_active, id, onToggle, onEdit, onDelete }) {
    const expired = expires ? Date.parse(expires) < Date.now() : false;
    return (
        <div className="msg-card" data-id={id}>
            <div className="msg-thumb">
                {!image_url ? <div className="msg-thumb-placeholder">
                    <i className="fa-solid fa-file-circle-xmark"></i>
                </div> : <img src={`http://localhost:3000${image_url}`} alt="messageImage" />}
            </div>
            <div className="msg-body">
                <div className="msg-headline">
                    {headline}
                </div>
                <div className="msg-meta">
                    <span className={`msg-badge ${!expired ? is_active ? 'badge-active' : 'badge-inactive' : "badge-expired"}`}>{!expired ? is_active ? 'Aktywny' : 'Wyłączony' : "Wygasły"}</span>
                    <span className="msg-info">
                        {freqMap[display_frequency] || display_frequency} · {display_time}
                    </span>
                    <span className="msg-info">{!expired ? `Wygasa: ${expires}` : `Wygasł: ${expires}`}</span>
                </div>
            </div>
            <div className="msg-actions">
                <label className={`toggle-status ${expired ? "expired-toggle" : ""}`} title={`${is_active ? 'Wyłącz' : 'Włącz'} komunikat`}>
                    <input disabled={expired} type="checkbox" checked={is_active && !expired} onChange={() => onToggle(id)} data-action="toggle" data-id={id} />
                    <span className="toggle-status-track"></span>
                </label>

                <button className="action-btn action-edit" title="Edytuj" onClick={() => onEdit(id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                </button>

                <button className="action-btn action-delete" title="Usuń" onClick={() => onDelete(id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
