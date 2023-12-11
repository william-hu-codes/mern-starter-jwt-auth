import { signUp } from '../../utilities/users-service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUpForm({setUser}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  })
  const [error, setError] = useState("")
  const disable = formData.password !== formData.confirm;

  function handleChange(evt) {
    const newData = {...formData, [evt.target.name]: evt.target.value}
    setFormData(newData)
  };

  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      const {name, email, password} = formData
      const finalData = {name, email, password}

      const user = await signUp(finalData);
      setUser(user)
      navigate("/")
    } catch {
      setError('Sign Up Failed - Try Again')
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p>&nbsp;{error}</p>
    </div>
  );
}

