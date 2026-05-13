import { useEffect, useState } from 'preact/hooks';
import '../../../../styles/global.css';
import ListLoading from '../../../../components/ListLoading';
import { API, useAuth } from '../../../../api.js';

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

    const groupedFiles = Object.values(grouped);

    function toggle(reportId) {
        setOpenReports(prev => ({
            ...prev,
            [reportId]: !prev[reportId]
        }));
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
                        <th>PLIKI</th>
                        <th>STATUS</th>
                        <th>DATA</th>
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
                        groupedFiles.map((r) => (
                            <>
                                <tr key={r.report_id}>
                                    <td>{r.created_by}</td>
                                    <td>{r.created_by_email}</td>

                                    <td>
                                        <button onClick={() => toggle(r.report_id)}>
                                            {openReports[r.report_id]
                                                ? "Ukryj pliki"
                                                : `Pokaż pliki (${r.files.length})`}
                                        </button>
                                    </td>

                                    <td>{r.status}</td>
                                    <td>{new Date(r.created_at).toLocaleString()}</td>
                                </tr>

                                {openReports[r.report_id] && (
                                    <tr>
                                        <td colSpan="2">
                                            <ul>
                                                {r.files.map((f, i) => (
                                                    <li key={i}>
                                                        <a href={`http://localhost:3000/download/${encodeURIComponent(f.split('/').pop())}`}>
                                                            {f.split('/').pop()}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td colSpan="3">
                                            {r.description || "Brak opisu"}
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}