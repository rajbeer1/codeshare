
import Avatar from 'react-avatar'

const Client = ({ name }) => {
  console.log(name)
  return (
    <div className='flex items-center flex-col font-bold'>
      <Avatar name={name} round='14px' size='50'></Avatar>
      <span className='mt-2'>{name}</span>
    </div>
  )
}

export default Client