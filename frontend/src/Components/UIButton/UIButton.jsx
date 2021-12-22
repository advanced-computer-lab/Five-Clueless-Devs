import './UIButton.css'
const UIButton = ({ onClick, text, margin, color }) => {

    return (
        <>
            <button
                style={{ margin: margin }}
                className={`buttonClassUI ${color == 'red' ? 'btn-red' : null} ${color == 'green' ? 'btn-green' : null}`}
                type="button"
                onClick={onClick}>
                {text}
            </button>
        </>
    );
}

export default UIButton;