import clsx from 'clsx';
import { route, useRouter } from 'preact-router';


export default function SidebarItem({ label, icon, path, badge }) {
    const [ router ] = useRouter();
    const isActive = router.url === path;

    return (
        <button onClick={() => { route(path); }} className={clsx('nav-item', isActive && 'active')}>
            {icon}
            <span>{label}</span>
            {badge}
        </button>
    );
}