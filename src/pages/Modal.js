import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const API = 'https://api.dev.pastorsline.com/api/contacts.json?companyId=171'
const API_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3MSwiZXhwIjoxNjM5NDY2NjE1fQ.9vE-glLQtV2NT3gNMkqeRkrWWZAhYCqX-_ibs7lC8GY'

export const Modal = ({ match }) => {
  const { params: { id } } = match
  const [ page, setPage ] = useState(1)
  const [ contacts, setContacts ] = useState([])
  const [ evenContacts, setEvenContacts ] = useState()
  const [ selectedContact, setSelectedContact ] = useState()
  const [ query, setQuery ] = useState('')

  const paginate = (e) => {
    if (e.target.clientHeight !== 0 && e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    setPage(1)
    let url = `${API}&page=1&query=${query}`
    if (id === 'b') {
      url += `&countryId=226`
    }

    setContacts([])
    axios.get(url, {
      headers: {
        authorization: API_TOKEN
      }
    }).then(res => {
      if (res.data && res.data.contacts && Object.values(res.data.contacts)) {
        setContacts(Object.values(res.data.contacts))
      }
    }).catch(err => {
      alert(err && err.message)
    })
  }, [id, query])

  useEffect(() => {
    if (page > 1) {
      let url = `${API}&page=${page}`
      if (id === 'b') {
        url += `&countryId=226`
      }
  
      axios.get(url, {
        headers: {
          authorization: API_TOKEN
        }
      }).then(res => {
        if (res.data && res.data.contacts && Object.values(res.data.contacts)) {
          setContacts([...contacts, ...Object.values(res.data.contacts)])
        }
      }).catch(err => {
        alert(err && err.message)
      })
    }
  }, [page])

  const getBadgeName = (contact) => {
    return `${(contact.first_name && contact.first_name.charAt(0)) || ''}${(contact.last_name && contact.last_name.charAt(0)) || ''}`
  }

  const checkEven = (e) => {
    if (e.target.checked) {
      setEvenContacts(contacts.filter(c => c.id % 2 === 0))
    } else {
      setEvenContacts()
    }
  }

  return (
    <div className='modal'>
      <div className='modal-container'>
        {
          !selectedContact &&
          <>
            <div className='modal-header'>{id === 'a' ? 'All Contacts' : id === 'b' ? 'US Contacts' : ''}</div>
            <div className='modal-content'>
              <div className='search-field'>
                <input placeholder='Search contacts' className='search-box' onKeyUp={(e) => setQuery(e.target.value)} />
              </div>
              <p className='contact-title'>Contact List</p>
              <div className='contact-list' onScroll={e => paginate(e)}>
                {
                  (evenContacts || contacts).map((contact, index) => (
                    <div className='contact' key={index} onClick={() => setSelectedContact(contact)}>
                      <span className='badge' style={{backgroundColor: contact.color}}>
                        {getBadgeName(contact)}
                      </span>
                      <div className='contact-info'>
                        <p>{contact.first_name} {contact.last_name}</p>
                        <p>{contact.email}</p>
                        <p>+ {contact.country.phonecode} {contact.phone_number}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='modal-footer'>
              <label>
                <input type='checkbox' className='even-check' onChange={e => checkEven(e)} />
                Only even
              </label>
              <div className='modal-buttons'>
                <Link className='btn-a' to='/modal/a'>All Contacts</Link>
                <Link className='btn-b' to='/modal/b'>US Contacts</Link>
                <Link className='btn-c' to='/'>Close</Link>
              </div>
            </div>
          </>
        }
        {
          selectedContact &&
          <>
            <div className='modal-header'>Contact Detail</div>
            <button className='btn-close-detail' onClick={() => setSelectedContact()}>&times;</button>
            <div className='modal-content detail'>
              <span className='badge' style={{backgroundColor: selectedContact.color}}>
                {getBadgeName(selectedContact)}
              </span>
              <p>Full Name: {selectedContact.first_name} {selectedContact.last_name}</p>
              <p>Email: {selectedContact.email}</p>
              <p>Country: {selectedContact.country.iso}</p>
              <p>Phone Number: + {selectedContact.country.phonecode} {selectedContact.phone_number}</p>
              <p>Address: {selectedContact.address}</p>
            </div>
          </>
        }
      </div>
    </div>
  )
}