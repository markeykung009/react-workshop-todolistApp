import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";
import Alert from "./components/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editId, setEditId] = useState(null);

  const submitData = e => {
    e.preventDefault();
    if (!name) {
      //alert
      setAlert({
        show: true,
        msg: "กรุณาป้อนข้อมูลด้วยครับ ^^",
        type: "error",
      });
    } else if (checkEditItem && name) {
      // กระบวนการแก้ไขข้อมูล
      const result = list.map(el => {
        if (el.id === editId) {
          return { ...el, title: name };
        }
        return el;
      });
      setList(result);
      setName("");
      setCheckEditItem(false);
      setEditId(null);
      setAlert({
        show: true,
        msg: "แก้ไขข้อมูลเรียบร้อย",
        type: "success",
      });
    } else {
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
      setAlert({
        show: true,
        msg: "บันทึกข้อมูลเรียบร้อย",
        type: "success",
      });
    }
  };

  const removeItem = id => {
    const newList = list.filter(el => el.id !== id);
    setList(newList);
    setAlert({
      show: true,
      msg: "ลบข้อมูลเรียบร้อยแล้ว",
      type: "error",
    });
  };

  const editItem = id => {
    console.log("แก้ไขข้อมูล = ", id);
    setCheckEditItem(true);
    setEditId(id);
    const searchItem = list.find(el => el.id === id);
    setName(searchItem.title);
  };

  return (
    <section className="container">
      <h1>Todolist App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="form-group" onSubmit={submitData}>
        <div className="form-control">
          <input
            type="text"
            className="text-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((el, idx) => {
          return (
            <List
              key={idx}
              {...el}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </section>
    </section>
  );
}

export default App;
