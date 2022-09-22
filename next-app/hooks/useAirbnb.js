import { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'

import { createContract } from '../utils/constants'

export const useAirbnb = () => {
  const [contract, setContract] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [properties, setProperties] = useState([])

  const { address } = useAccount()

  useEffect(() => {
    address && setUserAddress(address)
    setContract(createContract())
  }, [address])

  useEffect(() => {
    getProperties()
  }, [contract])

  const getProperties = async () => {
    if (contract) {
      try {
        const noOfProps = await contract.methods.counter().call()

        setProperties([])

        for (let index = 0; index < noOfProps; index++) {
          const property = await contract.methods.properties(index).call()

          const formattedProperty = {
            id: property['id'],
            name: property['name'],
            lat: property['lat'],
            long: property['long'],
            description: property['description'],
            imgUrl: property['imgUrl'],
            pricePerDay: property['pricePerDay'],
            isBooked: property['isBooked'],
            address: property['propertyAddress'],
          }

          setProperties(prevState => [...prevState, formattedProperty])
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const addListing = async (
    name,
    propertyAddress,
    description,
    imgUrl,
    pricePerDay,
  ) => {
    if (contract) {
      try {
        console.log(address)
        await contract.methods
          .listProperty(name, propertyAddress, description, imgUrl, pricePerDay)
          .send({ from: address, gas: 3000000, gasLimit: null })

        getProperties()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const bookProperty = async (id, startAt, endAt) => {
    if (contract) {
      try {
        const duePrice = await contract.methods
          .getDuePrice(id, startAt, endAt)
          .call()

        await contract.methods.bookProperty(id, startAt, endAt).send({
          from: userAddress,
          value: duePrice,
          gas: 3000000,
          gasLimit: null,
        })

        getProperties()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return {
    addListing,
    userAddress,
    getProperties,
    properties,
    bookProperty,
  }
}
