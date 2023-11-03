import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeBtn } from '../Data';
import './Modal.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "#0E1931",
        color: "#fff"
    },
};

function ModalPage(props: any) {

    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.appReducer);

    const closeModalHandler = () => {
        setTagList([]);
        setTags("");
        setCaption("");
        dispatch({ type: "MODALCLOSE" });
    }
    const taglistHandler = (event: { [key: string]: any }) => {
        setTags(event.target.value)
    }

    const addTagsHandler = () => {
        let prevTagList: string[] = [...tagList, `#${tags}`];
        setTagList(prevTagList);
        setTags("");
    }
    const createChirpzHandler = async () => {
        try {
            const data = {
                "userName": "John Deo",
                "caption": caption,
                "tags": tagList,
                "createdAt": new Date().toISOString(),
            }
            const resp = await fetch('http://localhost:4000/api/v1/posts', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            const result = await resp.json();
            if (result.status) {
                dispatch({type:"CREATECHIRPZ",payload:result.body})
                closeModalHandler();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Modal
            isOpen={state.modalOpen}
            onRequestClose={closeModalHandler}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='modalContainer'>
                <div className='headSection'>
                    <p>Create <span>Chirpz</span></p>
                    <button onClick={closeModalHandler}><img src={closeBtn} /></button>
                </div>

                <div className='formSection'>
                    <p>Create</p>
                    <input placeholder='What’s on your mind?' onChange={(e) => { setCaption(e.target.value) }} value={caption} />
                    <p className='tagsHeading'>Tags</p>
                    <div><input placeholder='Write tags' onChange={(e) => { taglistHandler(e) }} value={tags} /><button className='AddBtn' onClick={() => { addTagsHandler() }}>Add</button><div className='hrLine'></div></div>
                    <div>
                        {tagList.length > 0 ? (
                            tagList?.map((item: string) => {
                                return (
                                    <span className='addedTags'>{item}</span>
                                )
                            })
                        )
                            : null}
                    </div>
                    <div className='modalFooter'>
                        <button onClick={() => { createChirpzHandler() }}>Create</button>
                        <button onClick={closeModalHandler}>Cancel</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}
export default ModalPage;