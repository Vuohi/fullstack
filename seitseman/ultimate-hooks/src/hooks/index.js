import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl)
      .then(result => {
        console.log(result)
        setResources(result.data)
      })
  },[baseUrl])
  
    const create = async (resource) => {
      const config = {}
      const request = await axios.post(baseUrl, resource, config)
      setResources(resources.concat(resource))
      return request.data
    }
  
    const service = {
      create
    }
    return [
      resources, service
    ]
}
  export default useResource