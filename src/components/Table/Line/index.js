import React from "react";

const Line = ({ car, selectFighterToChange, deleteFighter }) => {
    return (
        <tr>
            <td className="column-photo"><img src={car.photo} alt="" className="fighter-photo" /></td>
            <td>{car.name}</td>
            <td>{car.category}</td>
            <td>{car.weight}</td>
            <td>{car.height}</td>
            <td className="column-actions">
                <button type="button" className="btn btn-default" onClick={selectFighterToChange(car)}>
                    <i className="far fa-edit text-success mr-2" title="Alterar"></i>
                </button>

                <button type="button" className="btn btn-default" onClick={deleteFighter(car)}>
                    <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
                </button>
            </td>
        </tr>
    );
};

export default Line;