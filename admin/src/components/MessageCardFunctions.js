import { API } from "../api";
import { route } from "preact-router";

export async function toggleMessage(id, getAuthHeader, setMessages) {
    try {
        const res = await fetch(`${API}/messages/${id}/toggle`, {
            method: 'PATCH',
            headers: getAuthHeader()
        });

        if (!res.ok) {
            throw new Error();
        }
        
        setMessages(prev =>
            prev.map(msg =>
                msg.id === id
                    ? { ...msg, is_active: !msg.is_active }
                    : msg
            )
        );

        location.reload();

    } catch {
        alert('Nie udało się zmienić statusu.');
    }
}

export let editingMessage;

export async function openEditForm(id, getAuthHeader) {
  try {
    const res = await fetch(`${API}/messages/${id}`, { headers: getAuthHeader() });
    const msg = await res.json();
    if (!res.ok) throw new Error(msg.error);

    editingMessage = msg;

    route('/informator/nowy-komunikat');

    // document.getElementById('form-view-title').textContent = 'Edytuj komunikat';
    // document.getElementById('submit-label').textContent    = 'Zapisz zmiany';
    // document.getElementById('edit-msg-id').value = id;

    // document.getElementById('msg-headline').value    = msg.headline;
    // document.getElementById('msg-description').value = msg.description;
    // document.getElementById('msg-duration').value    = msg.display_duration_days;
    // document.getElementById('msg-frequency').value   = msg.display_frequency;
    // document.getElementById('msg-time').value        = msg.display_time;
    // document.getElementById('msg-push').checked      = !!msg.show_push;
    // document.getElementById('msg-active').checked    = !!msg.is_active;

    // if (msg.image_url) {
    //   showUploadPreview(`http://localhost:3000${msg.image_url}`);
    // }
  } catch (err) {
    alert('Nie udało się załadować komunikatu: ' + err.message);
  }
}

export async function deleteMessage(id, getAuthHeader, setMessages) {
  if (!confirm('Na pewno usunąć komunikat?')) return;

  try {
    const res = await fetch(`${API}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });

    if (!res.ok) throw new Error();

    setMessages(prev => prev.filter(m => m.id !== id));
  } catch {
    alert('Nie udało się usunąć komunikatu.');
  }
}