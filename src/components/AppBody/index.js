import React, { useState, useEffect } from 'react'
import Form from 'components/Form';
import Resume from 'components/Resume';
import Search from 'components/Search';
import Table from 'components/Table';

import { getFighters } from 'API/fighters';

import './styles.css'

const AppBody = () => {
  const [selectedFighter, setSelectedFighter] = useState();
  const [fighterList, setFighterList] = useState([]);
  const [filter, setFilter] = useState();

  const loadList = async () => {
    const fighters =  await getFighters();
    setFighterList(fighters);
  }

  useEffect(() => {
    loadList();    
  }, []);

  return (
    <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-start">
          <h1 className="page-title">Cadastro de <span>lutadores</span></h1>
        </div>
      

        <div className="col-md-12 d-flex justify-content-center align-items-start">
          <Form 
            fighterList={fighterList}
            setFighterList={setFighterList} 
            selectedFighter={selectedFighter} 
            setSelectedFighter={setSelectedFighter}
            loadList={loadList}
          />
        </div>

        <div className="col-md-12  mt-2 d-flex justify-content-start align-items-start flex-column">
          <div className="container">
            <Resume fighterList={fighterList} />

            <Search setFilter={setFilter} />

            <Table 
              fighterList={fighterList}
              setSelectedFighter={setSelectedFighter}
              filter={filter}
              loadList={loadList}
            />
          </div>
        </div>
    </div>
  )
}

export default AppBody;