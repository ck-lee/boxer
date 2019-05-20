const {element} = wp;
import Boxes from './components/Boxes';

const DynamicBlock = (props) => {
    return (
        <div>
            <Boxes 
                alignment={props.alignment}
                displayNumber={props.displayNumber}
            ></Boxes>
        </div>
    );
}

window.onload = function () {
    let container = document.getElementById('dynamic-block');
    if (container) {
        let alignment = container.getAttribute('data-alignment');
        let displayNumber = container.getAttribute('data-display-number');
        element.render(
            <DynamicBlock alignment={alignment} displayNumber={displayNumber}/>,
            container
        )
    }
};
