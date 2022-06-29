
  const [test, setTest] = useState(false);

  import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const notifyEdit = () => toast("Edited successfully");


      {/* //!=================== */}
      {test ? (
        <div className="popup">
          <div className="popup-inner">
            <h1>Update Product</h1>
            <p>Are you sure to Update Product</p>

            <button
              className="close-btn"
              onClick={() => {
                updateProduct();
                setTest(false);
                notifyEdit();
              }}
            >
              yes
            </button>
            <button
              className="close-btn2"
              onClick={() => {
                setTest(false);
              }}
            >
              no
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* //!=================== */}