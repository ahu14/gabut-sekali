import {useEffect, useState} from "react";
import About from "./components/about.component";
import Difficulty from "./components/difficulty.component";
import IndexHome from './components/home.component';
import Form from "./components/input.component";


export default function Home(){
    let [page, setPage] = useState<any>('home');
    let [template, setTemplate] = useState<any>('');


    useEffect(() => {
        if (page == 'difficulty'){
            setTemplate(<Difficulty />)
            setPage('difficulty');
        }
    }, [page]);


    if (page == 'choose-difficulty'){
        return <Difficulty />
    }

    else if (page == 'input-username'){
        return <Form />
    }

    else if (page == 'about'){
        return <About page={page} setPage={setPage} />
    }

    else{
        return <IndexHome page={page} setPage={setPage} />
    }
}