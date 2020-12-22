import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div className='home'>
      <Link to='/modal/a' className='btn-a'>Button A</Link>
      <Link to='/modal/b' className='btn-b'>Button B</Link>
    </div>
  )
}