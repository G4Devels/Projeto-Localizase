import Loading from "../../src/assets/loading.svg"
import "../component_styles/auth_page.css"

export const Loader = () => {
    return (
        <>
        <div className="divLoadingAuthPage">
            <img className="loadingAuthPage" src={Loading} alt="loading"></img>
        </div>
        </>
    )
}