
import("./style.css") 


const Contact = () => {



    return <div className="wrapper">
        <div className="title">
            <h1>contact us </h1>
            <div className="contact-form"></div>

            <div className="input-fields">

                <input type="text" className="input" placeholder="Name" />
                <input type="text" className="input" placeholder="Email Address" />
                <input type="text" className="input" placeholder="Phone" />
                <input type="text" className="input" placeholder="Subject" />

            </div>
            
            <div className="msg">
                <textarea placeholder="Message"></textarea>
                <div className="btn">send</div>
            </div>

        </div>
    </div>
}

export default Contact