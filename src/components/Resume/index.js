import { useState, useEffect, memo } from "react";

const Resume = memo(function({ fighterList }) {
    const [show, setShow] = useState(false)
    const [infos, setInfos] = useState({})

    useEffect(() => {
        if (fighterList.length) {
            const data = {
                maxHeight: {
                    name: fighterList[0].name,
                    value: fighterList[0].height
                },
                minHeight: {
                    name: fighterList[0].name,
                    value: fighterList[0].height
                },
                maxWeight: {
                    name: fighterList[0].name,
                    value: fighterList[0].weight
                },
                minWeight: {
                    name: fighterList[0].name,
                    value: fighterList[0].weight
                },
            }
    
            fighterList.forEach(fighter => {
                if (Number(fighter.height) > Number(data.maxHeight.value)) {
                    data.maxHeight.value = fighter.height;
                    data.maxHeight.name = fighter.name;
                }
    
                if (Number(fighter.height) < Number(data.minHeight.value)) {
                    data.minHeight.value = fighter.height;
                    data.minHeight.name = fighter.name;
                }
    
                if (Number(fighter.weight) > Number(data.maxWeight.value)) {
                    data.maxWeight.value = fighter.weight;
                    data.maxWeight.name = fighter.name;
                }

                if (Number(fighter.weight) < Number(data.minWeight.value)) {
                    data.minWeight.value = fighter.weight;
                    data.minWeight.name = fighter.name;
                }
            });
    
            setInfos(data);
        }
    }, [fighterList])

    const toggleResume = () => {
        setShow(!show);
    }

    const buttonLabel = show ? 'Fechar resumo' : 'Resumo';

    return (
        <div className="mb-2">
            <button type="button" className="btn btn-warning mb-2" onClick={toggleResume}>
                {buttonLabel}
            </button>

            {show && (
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Total de lutadores cadastrados</strong><br/>
                        {fighterList.length}
                    </li>

                    <li className="list-group-item">
                        <strong>Lutador mais alto</strong><br/>
                        {infos?.maxHeight.name} | {infos?.maxHeight.value}cm
                    </li>

                    <li className="list-group-item">
                        <strong>Lutador mais baixo</strong><br />
                        {infos?.minHeight.name} | {infos?.minHeight.value}cm
                    </li>

                    <li className="list-group-item">
                        <strong>Lutador mais pesado</strong><br/> 
                        {infos?.maxWeight.name} | {infos?.maxWeight.value}kg
                    </li>

                    <li className="list-group-item">
                        <strong>Lutador mais leve</strong><br/>
                        {infos?.minWeight.name} | {infos?.minWeight.value}kg
                    </li>
                </ul>
            )}
        </div>
    )
});

export default Resume;