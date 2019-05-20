const save = props => {
    const { 
        className,
        attributes: { alignment, displayNumber}
    } = props;

    return (
        <div>
            <div 
                className={className}
                data-alignment={alignment}
                data-display-number={displayNumber}
                id={'dynamic-block'}
                >
            </div>
        </div>
    );
}

export default save
