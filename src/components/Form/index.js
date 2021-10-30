import React, { useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications';
import Errors from './Errors'

import { createFighter, updateFighter } from 'API/fighters'

import './styles.css'

const PHOTO_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

const Form = memo(function({ fighterList, selectedFighter, setSelectedFighter, loadList }) {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    useEffect(() => {
        if (selectedFighter) {
            setValue('name', selectedFighter.name);
            setValue('photo', selectedFighter.photo);
            setValue('category', selectedFighter.category);
            setValue('weight', selectedFighter.weight);
            setValue('height', selectedFighter.height);
        }
    }, [selectedFighter, setValue])

    const create = async (newFighter) => {
        await createFighter(newFighter);
        await loadList();
        reset();
    }

    const update = async (updatedFighter) => {
        if (!fighterList.length) {
            reset();
            setSelectedFighter(null);
            NotificationManager.error('', 'Esse lutador não existe mais!');
            
            return null;
        }

        await updateFighter(updatedFighter, selectedFighter.id);
        await loadList();

        reset();
        setSelectedFighter(null);
    }

    const cancelUpdate = () => {
        reset();
        setSelectedFighter(null);
    }

    const onSubmit = (data) => {
        if (selectedFighter) {
            update(data);
            return null;
        }

        create(data);
    }

    const photo = watch('photo') || PHOTO_PLACEHOLDER

    return (
        <form className="container needs-validation" onSubmit={handleSubmit(onSubmit)}>
            {selectedFighter && 
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <div className="alert alert-info m-0" role="alert">
                            Alterando o lutador: {selectedFighter.name}
                        </div>
                    </div>
                </div>
            }

            <div className="form-row mt-5 d-flex">
                <div className="form-group col-md-3 col-sm-12">
                    <div className="form-row d-flex">
                        <div className="form-group col-md-12">
                            <div className="photo" style={{ 'backgroundImage': `url(${photo})` }} />
                        </div>
                    </div>
                </div>

                <div className="form-group col-md-9 col-sm-12">
                    <div className="form-row d-flex">
                        <div className="form-group col-md-12 col-sm-12">
                            <label htmlFor="photo">URL da foto</label>
                            <input
                                id="photo"
                                type="url"
                                className={`form-control ${errors.photo && 'is-invalid'}`}
                                {...register("photo", { required: true })}
                            />
                            <Errors error={errors.photo} field="photo" />
                        </div>

                        <div className="form-group col-md-5 col-sm-6">
                            <label htmlFor="name">Nome</label>
                            <input
                                autoFocus
                                id="name"
                                type="text"
                                className={`form-control ${errors.name && 'is-invalid'}`}
                                {...register("name", { required: true, minLength: 2, maxLength: 30 })}
                            />
                            <Errors error={errors.name} field="name" />
                        </div>            
                    
                        <div className="form-group col-md-3 col-sm-6">
                            <label htmlFor="category">Categoria</label>
                            <select
                                id="category"
                                className={`form-control ${errors.category && 'is-invalid'}`}
                                {...register("category", { required: true })}
                            >
                                <option value="">Selecione</option>
                                <option value="leve">Peso Leve</option>
                                <option value="medio">Peso Médio</option>
                                <option value="pesado">Peso Pesado</option>
                            </select>
                            <Errors error={errors.category} field="category" />
                        </div>
            
                        <div className="form-group col-md-2 col-sm-6">
                            <label htmlFor="weight">Peso</label>
                            <input
                                id="weight"
                                type="number"
                                className={`form-control ${errors.weight && 'is-invalid'}`}
                                {...register("weight", { required: true })}
                            />
                            <Errors error={errors.weight} field="weight" />
                        </div>

                        <div className="form-group col-md-2 col-sm-6">
                            <label htmlFor="height">Altura</label>
                            <input
                                id="height"
                                type="number"
                                className={`form-control ${errors.height && 'is-invalid'}`}
                                {...register("height", { required: true })}
                            />
                            <Errors error={errors.height} field="height" />
                        </div>

                        <div className="form-group col-md-12 d-flex justify-content-center align-items-center">
                            <input
                                type="submit"
                                value="Criar"
                                className={selectedFighter ? "d-none" : "btn btn-success"}
                            />
                            
                            <input
                                type="submit"
                                value="Alterar"
                                className={selectedFighter ? "btn btn-success" : "d-none"}
                            />

                            <input
                                type="button"
                                value="Cancelar"
                                onClick={cancelUpdate}
                                className={selectedFighter ? "btn btn-default" : "d-none"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export default Form;
