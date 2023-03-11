import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import "./App.css";
import UserList from "./components/UserList";
import formValidationUtil from "./utils/validation"
function App() {
    const [users, setUsers] = useState([])
    const [formValues, setFormValues] = useState({
      firstName: '',
      lastName: '',
      country:'',
      city:'',
      street:'',
      streetNumber:'',
      email:'',
      phoneNumber: '',
      imageUrl: '',
     
  
    })
    const [formErrors, setFormErrors] = useState({
      firstName: '',
      lastName: '',
      country:'',
      city:'',
      street:'',
      streetNumber:'',
      email:'',
      phoneNumber: '',
      imageUrl: '',
      
    })

    useEffect( () => {
    //    async function getUsers(){
    //     const users = await userService.getAll();
    //     console.log(users);
    //    }
    //    getUsers();
    userService.getAll()
    .then(users => {
        setUsers(users)
    })
    .catch(err => {
        console.log('Error', err);
    })
    }, []);

    const onUserCreateSubmit = async (e) =>{
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const createdUser = await userService.create(data);
     
      setUsers(state =>[...state, createdUser]);

    };
    const onUserUpdateSubmit = async (e, userId) =>{
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      
      const updatedUser = await userService.update(userId, data);

      setUsers(state => state.map(x => x._id === userId ? updatedUser : x))


    }
    const onUserDelete = async (userId) =>{
      await userService.remove(userId);
      setUsers(state => state.filter(x => x._id !== userId));
    };

    const formChangeHandler = (e) =>{
     
      setFormValues(state =>({...state, [e.target.name]: e.target.value}))

    };
    const formValidate =(e) =>{
      const {name, value} = e.target;
      const errors = {};
      if (formValidationUtil[name]) {
        const { validate, minLength, maxLength, min, errorMessage } = formValidationUtil[name];
    
        if (minLength && value.length < minLength) {
          errors[name] = errorMessage;
        } else if (maxLength && value.length > maxLength) {
          errors[name] = errorMessage;
        } else if (min !== undefined && parseInt(value, 10) < min) {
          errors[name] = errorMessage;
        } else if (validate && !validate(value)) {
          errors[name] = errorMessage;
        }
      }
    
      setFormErrors(errors)
    }
  return (
    <>
      <Header />
      

      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList 
              users ={users} 
              onUserCreateSubmit={onUserCreateSubmit}
              onUserUpdateSubmit={onUserUpdateSubmit}
              onUserDelete={onUserDelete}
              formValues={formValues}
              formChangeHandler={formChangeHandler}
              formErrors={formErrors}
              formValidate={formValidate}
          />

          
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
