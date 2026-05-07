import clsx from 'clsx';
import { route, useRouter } from 'preact-router';

export default function SidebarItem({ label, icon, path, badge }) {
    const [router] = useRouter();

    const currentPathBase = router.url.split('?')[0];
    const isActive = currentPathBase === path;

    const handleClick = (e) => {
        e.preventDefault();
        if (isActive) return;

        route(path);
    };

    return (
        <button onClick={handleClick} className={clsx('nav-item', isActive && 'active')} type="button">
            {icon}
            <span className="nav-label">{label}</span>
            {badge && <span className="nav-badge">{badge}</span>}
        </button>
    );
}