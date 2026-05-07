import { useState } from 'preact/hooks';
import clsx from 'clsx';

export default function ExpandableSidebarItem({ label, icon, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={clsx('expandable-group', isOpen && 'is-open')}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="nav-item expandable-trigger">
                {icon}
                <span>{label}</span>
                <i className={clsx('fa-solid fa-chevron-down arrow', isOpen && 'rotated')}></i>
            </button>

            {isOpen && (
                <div className="expandable-content">
                    {children}
                </div>
            )}
        </div>
    );
}