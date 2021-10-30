import React, { useState, useEffect, useCallback } from "react";

import Line from './Line';

import { deleteFighter } from "API/fighters";

import './styles.css'

const Table = ({ fighterList, setSelectedFighter, filter, loadList }) => {
    const [list, setList] = useState(fighterList)
    const [notFound, setNotFound] = useState(false);

    const selectFighterToChange = (car) => () => {
        setSelectedFighter(car)
    }

    const handleDeleteFighter = (fighter) => async () => {
        if (window.confirm(`Confirma a exclusão de "${fighter.name}"?`)) {
            await deleteFighter(fighter)
            await loadList()
        }
    }

    const filterFighters = useCallback(() => {
        const filterLowerCase = filter.toLowerCase();

        const filtereds = fighterList.filter(fighter => 
            fighter.name.toLowerCase().includes(filterLowerCase) || 
            fighter.category.toLowerCase().includes(filterLowerCase) || 
            fighter.weight.includes(filter) ||
            fighter.height.includes(filter)
        );

        if (filtereds.length) {
            setNotFound(false);
        } else {
            setNotFound(true);
        }

        return filtereds; 
    }, [fighterList, filter])

    useEffect(() => {
        if (filter) {
            setList(filterFighters());
        } else {
            setList(fighterList)
            setNotFound(false);
        }
    }, [filter, fighterList, filterFighters]);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Peso</th>
                        <th>Altura</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(car => (
                        <Line 
                            key={car.id}
                            car={car}
                            selectFighterToChange={selectFighterToChange}
                            deleteFighter={handleDeleteFighter}
                        />
                    ))}

                    {notFound &&
                        <tr>
                            <td colSpan="6">Nenhum resultado foi encontrado</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;