import Loading from "../../src/assets/loading.svg"
import LoadingWhite from "../../src/assets/loading_white.svg"
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

export const LoaderWhite = () => {
    return (
        <>
        <div className="divLoadingAuthPage">
            <img className="loadingAuthPage" src={LoadingWhite} alt="loading"></img>
        </div>
        </>
    )
}