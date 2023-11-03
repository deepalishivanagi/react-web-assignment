import { useEffect, useState } from "react";
import './HomePage.css';
import { useDispatch, useSelector } from "react-redux";
import appReducer from "../Reducer/AppReducer";
import { type } from "os";
import ModalPage from "./Modal";
import { verified } from "../Data";

function HomePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.appReducer);
    const list = state.chirpzList;

    const getChirpzList = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/posts?_sort=createdAt&_order=desc', {
                method: 'GET',
            });
            const result = await response.json();
            dispatch({ type: 'INITIAL', payload: result.body });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChirpzList()
    }, [])
    return (
        <div className="homePageContainer">
            <div className="homeHeader"><span>Home</span><button onClick={() => { dispatch({ type: "MODALOPEN" }) }} className="createModal">Create</button></div>
            <div className="cardListContainer">
                {list?.map((item: { [key: string]: any }) => {
                    return (
                        <div>
                            <div className="hrLine"></div>
                            <div className="singleCard">

                                <div className="nameSection">
                                    <span className="userName">{item.userName}</span>
                                    {item.isVerified ? <img src={verified} /> : null}
                                </div>
                                <p className="caption">{item.caption}</p>

                                <p>{item.tags?.map((tags: string) => {
                                    return (
                                        <div className="tags">
                                            {tags}
                                        </div>
                                    )
                                })}</p>
                            </div>
                        </div>

                    )
                })}

            </div>
            <ModalPage/>
        </div>
    )

}

export default HomePage;