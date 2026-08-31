import { useState } from "react";
import axios from "axios";

const AddPhone = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    condition: "",
    storage: "",
    ram: "",
    screen: "",
    battery: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    data.append("img", image);

    await axios.post("http://localhost:5000/api/phones", data);

    alert("Phone added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="brand" placeholder="Brand" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="condition" placeholder="Condition" onChange={handleChange} />
      <input name="storage" placeholder="Storage" onChange={handleChange} />
      <input name="ram" placeholder="RAM" onChange={handleChange} />
      <input name="screen" placeholder="Screen" onChange={handleChange} />
      <input name="battery" placeholder="Battery" onChange={handleChange} />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Add Phone</button>
    </form>
  );
};

export default AddPhone;
