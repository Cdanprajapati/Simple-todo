import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Components/CustomButton';
import Input from './Components/Input';

const App = () => {
  const [formData, setFormData] = useState([]);
  const [todoIndex, setTodoIndex] = useState(null);
  const [update, setUpdate] = useState(false);
  const [fieldData, setFieldData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const heading = [
    { th: 'Sr.no.' },
    { th: 'Name' },
    { th: 'Email' },
    { th: 'Contact' },
    { th: 'Action' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = fieldData.name.trim();
    const trimmedEmail = fieldData.email.trim();
    const trimmedContact = fieldData.contact.trim();

    if (!trimmedName || !trimmedEmail || !trimmedContact) {
      toast.warn("Fields cannot be empty or just whitespace.");
      return;
    }

    if (update) {
      const findupdateitem = formData.map((item, index) =>
        index === todoIndex ? fieldData : item
      );
      setFormData(findupdateitem);
      setUpdate(false);
      toast.success("Todo updated successfully!");
    } else {
      setFormData([...formData, fieldData ]);
      toast.success("Todo added successfully!");
    }

    setFieldData({ name: '', email: '', contact: '' });
  };

  const handleComplete = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setFormData(updatedFormData);
  };

  const handleDelete = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
    toast.success("Todo Deleted Successfully..!")
  }

  const handleUpdate = (index) => {
    setFieldData(formData[index]);
    setTodoIndex(index);
    setUpdate(true)
  }

  const InputFields = [
    { type: 'text', name: 'name', value: fieldData.name, placeholder: 'Name' },
    { type: 'email', name: 'email', value: fieldData.email, placeholder: 'example@gmail.com' },
    { type: 'number', name: 'contact', value: fieldData.contact, placeholder: 'Contact number' }
  ];

  return (
    <div className='w-full h-full p-5'>
      <form onSubmit={handleSubmit} className='bg-white outline-none flex flex-col mx-auto shadow-lg rounded-lg w-[500px] p-4'>
        <h1 className='my-2 mx-auto text-blue-600 font-medium'>Add Todos...!</h1>
        <hr />
        {InputFields.map((field, index) => (
          <Input
            key={index}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={handleChange}
            placeholder={field.placeholder} />
        ))}

        <Button
          type="submit"
          className="bg-blue-300"
          text={update ? "Update" : "Submit"}
        />
      </form>

      <div className='mt-5 p-4 bg-slate-50 rounded-lg'>
        {formData.length === 0 ? (
          <div class="flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
            <p>Please add some todos..! :)</p>
          </div>
        ) : (
          <table className='table-auto w-full'>
            <thead className='border border-gray-100'>
              <tr>
                {heading.map((item, i) => (
                  <th
                    key={i}
                    colSpan={item.th === 'Action' ? 2 : 1}
                    className='px-4 py-2'
                  >
                    {item.th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.map((item, i) => (
                <tr key={i}
                  className={`text-slate-800 text-center items-center 
                ${item.completed ? 'line-through text-gray-400' : ''}`}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Button
                      onClick={() => handleUpdate(i)}
                      className='bg-sky-300 px-3 py-1 text-sm'
                      text="Update"
                      disabled={item.completed}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(i)}
                      className='bg-red-300 py-1 px-3 text-sm'
                      text="Delete"
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => handleComplete(i)}
                      className='bg-green-300 py-1 px-3 text-sm'
                      text={item.completed ? "Undo" : "Complete"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
