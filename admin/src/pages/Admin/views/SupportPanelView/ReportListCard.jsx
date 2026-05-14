import { useEffect, useState } from 'preact/hooks';
import '../../../../styles/global.css';
import ListLoading from '../../../../components/ListLoading';
import { API, useAuth } from '../../../../api.js';
import { useMemo } from 'preact/hooks';

export default function ReportListCard() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAuthHeader } = useAuth();
    const [openReports, setOpenReports] = useState({});

    useEffect(() => {
        async function loadFiles() {
            try {
                const res = await fetch(`${API}/support/uploads`, {
                    headers: getAuthHeader() 
                });

                const data = await res.json();
                setFiles(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadFiles();
    }, []);

    const groupedFiles = useMemo(() => {
    const grouped = files.reduce((acc, file) => {
        if (!acc[file.report_id]) {
            acc[file.report_id] = {
                report_id: file.report_id,
                created_by: file.created_by,
                created_by_email: file.created_by_email,
                status: file.status,
                created_at: file.created_at,
                description: file.description,
                files: []
            };
        }

            acc[file.report_id].files.push(file.file_path);
            return acc;
        }, {});

        return Object.values(grouped).sort((a, b) => {
            const aIsNew = a.status !== 'Odczytane';
            const bIsNew = b.status !== 'Odczytane';

            if (aIsNew !== bIsNew) {
                return bIsNew - aIsNew;
            }

            return new Date(b.created_at) - new Date(a.created_at);
        });
    }, [files]);

    async function toggle(reportId) {
        const isOpening = !openReports[reportId];

        setOpenReports(prev => ({
            ...prev,
            [reportId]: isOpening
        }));

        if (isOpening) {
            try {
                await fetch(`${API}/support/reports/${reportId}/read`, {
                    method: 'PATCH',
                    headers: {
                        ...getAuthHeader(),
                        'Content-Type': 'application/json'
                    }
                });

                setFiles(prev =>
                    prev.map(f =>
                        f.report_id === reportId
                            ? { ...f, status: 'Odczytane' }
                            : f
                    )
                );

            } catch (err) {
                console.error("Failed to mark as read:", err);
            }
        }
    }

    async function deleteReport(reportId) {
        try {
            const res = await fetch(`${API}/support/reports/${reportId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            setFiles(prev =>
                prev.filter(f => f.report_id !== reportId)
            );

        } catch (err) {
            console.error("Delete failed:", err);
            alert("Nie udało się usunąć zgłoszenia");
        }
    }

    return (
        <div className="report-list-card">
            <div className="report-list-header">
                <h3>Lista zgłoszeń</h3>
                <input
                    type="text"
                    placeholder="Szukaj (imię, email...)"
                    className="report-search"
                />
            </div>

            <table className="report-table">
                <thead>
                    <tr>
                        <th>KLIENT</th>
                        <th>EMAIL</th>
                        <th>STATUS</th>
                        <th>DATA</th>
                        <th>PLIKI</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5">
                                <ListLoading />
                            </td>
                        </tr>
                    ) : (
                        groupedFiles.length === 0 ? (
                            <div className="empty-state">
                                <p>Brak zgłoszeń.</p>
                            </div>
                        ) : (
                        groupedFiles.map((r) => (
                            <>
                            <tr key={r.report_id} className="report-row">
                                <td>{r.created_by}</td>
                                <td>{r.created_by_email}</td>
                                <td className={`${r.status === 'Nowe' ? 'new' : 'read'}`}>{r.status}</td>
                                <td>{new Date(r.created_at).toLocaleString()}</td>
                                <td className='showBtnBox'>
                                    <button className='showFilesBtn' onClick={() => toggle(r.report_id)}>
                                        {openReports[r.report_id]
                                            ? "Ukryj pliki"
                                            : `Pokaż pliki (${r.files.length})`}
                                    </button>
                                    <button
                                        className="deleteBtn"
                                        onClick={() => {
                                            if (confirm("Na pewno usunąć zgłoszenie?")) {
                                                deleteReport(r.report_id);
                                            }
                                        }}
                                        >
                                            <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>

                            {openReports[r.report_id] && (
                                <tr className="report-expanded-row">
                                    <td colSpan="5">
                                        <div className='expandedContent'>
                                            <div className='description'>
                                            {r.description || "Brak opisu"}
                                            </div>
                                            <div>
                                                <ul>
                                                    {r.files.map((f, i) => (
                                                        <li className='fileDownload' key={i}>
                                                            <a href={`http://localhost:3000/download/${encodeURIComponent(f.split('/').pop())}`}>
                                                                {f.split('/').pop()}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='downloadBtnBox'>
                                                <button className='downloadAllBtn'>
                                                    Pobierz wszyzstkie
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}