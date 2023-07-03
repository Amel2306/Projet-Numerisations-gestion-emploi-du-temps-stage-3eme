import {Link} from "react-router-dom"

function ActiviteCreation () {
    return (
        <div>
            <h1>Vous avez créé une Activité, félicitation ! </h1>

            <button className="btn">
                <Link to="/activiteForm">En créer une autre</Link>
            </button>
        </div>
    )
}

export default ActiviteCreation