import {Link} from "react-router-dom"

function EleveCreation () {
    return (
        <div>
            <h1>Vous avez ajouté un nouvel élève, félicitation ! </h1>

            <button className="btn">
                <Link to="/eleveForm">En créer une autre</Link>
            </button>
        </div>
    )
}

export default EleveCreation