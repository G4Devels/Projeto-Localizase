import '../component_styles/menu_section.css';

export const MenuSection = (props) => {

    return (

        <div className="menu_section">
            {props.children}
        </div>

    )
}