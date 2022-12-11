import Base from '../Base';

function NotFound({text = "Page not found"}) {
    return (
        <Base title="Page not found">
            <div className="not-found">
                <h1>404</h1>
                <h2>{text}</h2>
            </div>
        </Base>
    );
}

export default NotFound;