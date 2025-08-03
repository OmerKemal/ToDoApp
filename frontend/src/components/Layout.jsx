export default function Layout({ title, children }) {
    return (
        <div className="page">
            <div className="content">
                <div className="card">
                    {title && <h2 className="heading">{title}</h2>}
                    {children}
                </div>
            </div>
        </div>
    );
}
