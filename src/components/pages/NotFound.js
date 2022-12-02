import Base from '../Base';

function NotFound() {
    return (
        <Base title="Page not found">
            <div className="not-found">
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
        </Base>
    );
}

export default NotFound;