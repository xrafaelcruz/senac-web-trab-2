import { collection, getDocs, addDoc, deleteDoc, getDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from './db';
import { NotificationManager } from 'react-notifications';

const COLLECTION = 'fighters'

export const getFighters = async () => {
    let result = []

    try  {
        const col = collection(db, COLLECTION);
        const snapshot = await getDocs(col);

        result = snapshot.docs.map((doc) => ({ 
            ...doc.data(), 
            id: doc.id 
        }));

        console.log(result);
    } catch(e) {
        console.log(e)
        console.log('Erro ao buscar os lutadores')
    }

    return result
};

export const createFighter = async (fighter) => {
    try  {
        await addDoc(collection(db, COLLECTION), fighter);

        NotificationManager.success('', 'Lutador criado com Sucesso!');
    } catch(e) {
        console.log(e)
        console.log('Erro ao criar o lutador')
    }
};

export const updateFighter = async (fighter, id) => {
    try  {
        const snap = await getDoc(doc(db, COLLECTION, id));

        await updateDoc(snap.ref, fighter);

        NotificationManager.success('', 'Lutador atualizado com Sucesso!');
    } catch(e) {
        console.log(e)
        console.log('Erro ao atualizar o lutador')
    }
};

export const deleteFighter = async (fighter) => {
    try  {
        const snap = await getDoc(doc(db, COLLECTION, fighter.id))

        await deleteDoc(snap.ref);

        NotificationManager.success('', 'Lutador excluído com Sucesso!');
    } catch(e) {
        console.log(e)
        console.log('Erro ao excluir o lutador')
    }
};