import React, {useState} from "react";
import './App.css';

export default function ReactTest() {
    const [name, setNameText] = useState('');
    const [surname, setSurnameText] = useState('');
    const [topic, setTopicText] = useState('');
    const [customTopic, setCustomTopicText] = useState('');
    const [imageUrl, setImageUrlText] = useState('');
    const [cardStatus, setCardStatusBool] = useState(false);

    function generateImage() {
        let param = topic === 'other' ? customTopic : topic;

        fetch('https://source.unsplash.com/random/?' + param)
            .then(data => {
                setImageUrlText(data.url);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <InputView name={name} nameChange={setNameText} surname={surname}  surnameChange={setSurnameText} topic={topic} topicChange={setTopicText} customTopic={customTopic} customTopicChange={setCustomTopicText} />
            { topic !== '' ? <ImageView imageUrl={imageUrl} imageUrlChange={generateImage} setCardStatus={setCardStatusBool} /> : null }
            { cardStatus ? <OutputView name={name} surname={surname} imageUrl={imageUrl} setCardStatus={setCardStatusBool} /> : null }
        </div>
    );
}

function InputView({name, nameChange, surname, surnameChange, topic, topicChange, customTopic, customTopicChange}) {

    const options = [
        { value: "travel", label: "Travel" },
        { value: "cars", label: "Cars" },
        { value: "wildlife", label: "Wildlife" },
        { value: "technology", label: "Technology" },
        { value: "other", label: "Other" },
    ];

    return (
        <div>
            <h3 className="display-6 px-3 py-2 mb-3 banner">Card Creator</h3>

            <div className="input-group mb-3 px-3">
                <span className="input-group-text">Name</span>
                <input type="text" className="form-control" value={name} placeholder="Enter text here..." onChange={(e) => nameChange(e.target.value)} />
            </div>

            <div className="input-group mb-3 px-3">
                <span className="input-group-text">Surname</span>
                <input type="text" className="form-control" value={surname} placeholder="Enter text here..." onChange={(e) => surnameChange(e.target.value)} />
            </div>

            <div className="input-group mb-3 px-3">
                <span className="input-group-text">Topic</span>
                <select className="form-select" value={topic} onChange={(e) => topicChange(e.target.value)}>
                    <option></option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            { topic === 'other' ?
                <div className="input-group mb-3 px-3">
                    <span className="input-group-text">Custom Topic</span>
                    <input type="text" className="form-control" value={customTopic} placeholder="Enter text here..." onChange={(e) => customTopicChange(e.target.value)} />
                </div>
                : null
            }
        </div>
    );
}

function ImageView({imageUrl, imageUrlChange, setCardStatus}) {
    return (
        <div>
            { imageUrl.length ?
                <div>
                    <div className="px-3">
                        <img src={imageUrl} className="border rounded topic-image"/>
                    </div>
                    <div className="px-3">
                        <button className="btn btn-danger my-3 me-3" onClick={imageUrlChange}>Reject</button>
                        <button className="btn btn-success my-3" onClick={(e) => setCardStatus(true)}>Accept</button>
                    </div>
                </div>
                :
                <div>
                    <button className="btn btn-primary mx-3 mb-3" onClick={imageUrlChange}>Generate</button>
                </div>
            }
        </div>
    );
}

function OutputView({name, surname, imageUrl, setCardStatus}) {
    return (
        <div className="background" onClick={(e) => setCardStatus(false)}>
            <div className="m-3 card-container rounded overflow-hidden">
                <img className="card-image" src={imageUrl} />
                <h2 className="display-6 card-text p-3 text-end">{name} {surname}</h2>
            </div>
        </div>
    );
}

